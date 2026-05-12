import { createServer, request as httpRequest } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { request as httpsRequest } from "node:https";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3000;
const HOST = "127.0.0.1";
const API_TARGET = "http://localhost:8080";
const ROOT = fileURLToPath(new URL(".", import.meta.url));

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${HOST}:${PORT}`);

  if (url.pathname.startsWith("/api/")) {
    await proxyApi(request, response, url);
    return;
  }

  serveStatic(response, url.pathname);
}).listen(PORT, HOST, () => {
  console.log(`BookingEngineWeb running on http://${HOST}:${PORT}`);
  console.log(`Proxying /api to ${API_TARGET}`);
});

async function proxyApi(request, response, url) {
  try {
    const targetUrl = new URL(url.pathname + url.search, API_TARGET);
    await forwardRequest(targetUrl, request, response);
  } catch (error) {
    response.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({
      error: "Bad Gateway",
      message: `Could not reach backend at ${API_TARGET}. ${error.message}`
    }));
  }
}

function serveStatic(response, pathname) {
  const cleanPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = normalize(join(ROOT, cleanPath));

  if (!filePath.startsWith(ROOT) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}

function filterRequestHeaders(headers) {
  const result = {};

  for (const [key, value] of Object.entries(headers)) {
    if (value && key.toLowerCase() !== "host") {
      result[key] = value;
    }
  }

  return result;
}

function forwardRequest(targetUrl, incomingRequest, outgoingResponse) {
  const client = targetUrl.protocol === "https:" ? httpsRequest : httpRequest;

  return new Promise((resolve, reject) => {
    const proxyRequest = client(targetUrl, {
      method: incomingRequest.method,
      headers: filterRequestHeaders(incomingRequest.headers)
    }, (proxyResponse) => {
      outgoingResponse.writeHead(proxyResponse.statusCode || 502, proxyResponse.headers);
      proxyResponse.pipe(outgoingResponse);
      proxyResponse.on("end", resolve);
    });

    proxyRequest.on("error", reject);

    if (["GET", "HEAD"].includes(incomingRequest.method || "GET")) {
      proxyRequest.end();
      return;
    }

    incomingRequest.pipe(proxyRequest);
  });
}
