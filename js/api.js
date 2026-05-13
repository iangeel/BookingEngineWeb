const API_BASE_URL = globalThis.BOOKING_API_BASE_URL || "/api";
const ROOM_IMAGES = [
  "assets/room-terrace.svg",
  "assets/room-pavilion.svg",
  "assets/room-signature.svg"
];

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const raw = await response.text();
  const data = raw ? safeParseJson(raw) : null;

  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function safeParseJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeDate(value) {
  return typeof value === "string" ? value.slice(0, 10) : value;
}

function enumerateStayDates(checkin, checkout) {
  const dates = [];
  const cursor = new Date(`${checkin}T12:00:00`);
  const end = new Date(`${checkout}T12:00:00`);

  while (cursor < end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function coversRequestedStay(availableDates, checkin, checkout) {
  if (!checkin || !checkout) {
    return true;
  }

  const available = new Set((availableDates || []).map(normalizeDate));
  const requiredDates = enumerateStayDates(checkin, checkout);

  return requiredDates.every((date) => available.has(date));
}

function toFrontendRoom(room, index) {
  return {
    optionId: room.optionId || String(room.id || index),
    id: room.id,
    name: room.name,
    capacity: room.capacity,
    roomIds: Array.isArray(room.roomIds) ? room.roomIds : room.id ? [room.id] : [],
    roomNames: Array.isArray(room.roomNames) ? room.roomNames : room.name ? [room.name] : [],
    roomCount: room.roomCount ?? (room.roomIds?.length || (room.id ? 1 : 0)),
    totalCapacity: room.totalCapacity ?? room.capacity,
    totalRatePerNight: room.totalRatePerNight ?? null,
    packageOption: Boolean(room.packageOption),
    image: ROOM_IMAGES[index % ROOM_IMAGES.length],
    availableDates: (room.availableDates || []).map(normalizeDate)
  };
}

export async function getAvailability(params = {}) {
  const { checkin, checkout, guests = 1 } = params;
  const guestCount = Math.max(1, Number(guests || 1));
  const availability = await request(`/availability?guests=${encodeURIComponent(guestCount)}`);

  const rooms = availability
    .map(toFrontendRoom)
    .filter((room) => coversRequestedStay(room.availableDates, checkin, checkout));

  return {
    endpoint: `${API_BASE_URL}/availability?guests=${guestCount}`,
    request: {
      ...params,
      guests: guestCount
    },
    data: rooms
  };
}

export async function createBooking(payload) {
  const roomIds = Array.isArray(payload.roomIds)
    ? payload.roomIds.map((roomId) => Number(roomId)).filter(Number.isFinite)
    : [];
  const data = await request("/bookings", {
    method: "POST",
    body: JSON.stringify({
      roomIds,
      guestCount: Math.max(1, Number(payload.guestCount || payload.guests || 1)),
      startDate: payload.startDate,
      endDate: payload.endDate
    })
  });

  return {
    endpoint: `${API_BASE_URL}/bookings`,
    data
  };
}

export async function updateClientData(bookingId, token, payload) {
  const data = await request(`/bookings/${bookingId}/client?token=${encodeURIComponent(token)}`, {
    method: "PATCH",
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email
    })
  });

  return {
    endpoint: `${API_BASE_URL}/bookings/${bookingId}/client`,
    data
  };
}

export async function initiatePayment(bookingId, token) {
  const data = await request(`/bookings/${bookingId}/payment?token=${encodeURIComponent(token)}`, {
    method: "POST"
  });

  return {
    endpoint: `${API_BASE_URL}/bookings/${bookingId}/payment`,
    data
  };
}

export async function getBookingStatus(bookingId, token) {
  const data = await request(`/bookings/${bookingId}?token=${encodeURIComponent(token)}`);

  return {
    endpoint: `${API_BASE_URL}/bookings/${bookingId}`,
    data
  };
}

function createAdminHeaders(token, headers = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...headers
  };
}

async function adminRequest(path, token, options = {}) {
  try {
    return await request(path, {
      ...options,
      headers: createAdminHeaders(token, options.headers)
    });
  } catch (error) {
    if (error?.status === 401 || error?.status === 403) {
      error.isUnauthorized = true;
    }
    throw error;
  }
}

function normalizeAdminRoomPayload(payload) {
  return {
    name: payload.name?.trim() || "",
    capacity: Number(payload.capacity),
    ratePerNight: Number(payload.ratePerNight),
    discount: payload.discount === "" || payload.discount == null ? 0 : Number(payload.discount)
  };
}

function normalizeAdminBookingPayload(payload) {
  const roomIds = Array.isArray(payload.roomIds)
    ? payload.roomIds.map((roomId) => Number(roomId)).filter(Number.isFinite)
    : [];

  const roomId = Number(payload.roomId);
  if (Number.isFinite(roomId) && !roomIds.includes(roomId)) {
    roomIds.unshift(roomId);
  }

  return {
    roomId,
    roomIds,
    guestCount: payload.guestCount === "" || payload.guestCount == null ? null : Number(payload.guestCount),
    startDate: payload.startDate,
    endDate: payload.endDate,
    status: payload.status || null,
    clientFirstName: payload.clientFirstName?.trim() || null,
    clientLastName: payload.clientLastName?.trim() || null,
    clientEmail: payload.clientEmail?.trim() || null,
    lockedUntil: payload.lockedUntil || null,
    token: payload.token || null
  };
}

export function isAdminUnauthorizedError(error) {
  return Boolean(error?.isUnauthorized || error?.status === 401 || error?.status === 403);
}

export async function adminLogin(payload) {
  const data = await request("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: payload.username,
      password: payload.password
    })
  });

  return {
    endpoint: `${API_BASE_URL}/admin/auth/login`,
    data
  };
}

export async function getAdminRooms(token) {
  const data = await adminRequest("/admin/rooms", token);
  return {
    endpoint: `${API_BASE_URL}/admin/rooms`,
    data
  };
}

export async function createAdminRoom(token, payload) {
  const data = await adminRequest("/admin/rooms", token, {
    method: "POST",
    body: JSON.stringify(normalizeAdminRoomPayload(payload))
  });
  return {
    endpoint: `${API_BASE_URL}/admin/rooms`,
    data
  };
}

export async function updateAdminRoom(token, roomId, payload) {
  const data = await adminRequest(`/admin/rooms/${roomId}`, token, {
    method: "PUT",
    body: JSON.stringify(normalizeAdminRoomPayload(payload))
  });
  return {
    endpoint: `${API_BASE_URL}/admin/rooms/${roomId}`,
    data
  };
}

export async function deleteAdminRoom(token, roomId) {
  const data = await adminRequest(`/admin/rooms/${roomId}`, token, {
    method: "DELETE"
  });
  return {
    endpoint: `${API_BASE_URL}/admin/rooms/${roomId}`,
    data
  };
}

export async function getAdminBookings(token) {
  const data = await adminRequest("/admin/bookings", token);
  return {
    endpoint: `${API_BASE_URL}/admin/bookings`,
    data
  };
}

export async function getAdminBooking(token, bookingId) {
  const data = await adminRequest(`/admin/bookings/${bookingId}`, token);
  return {
    endpoint: `${API_BASE_URL}/admin/bookings/${bookingId}`,
    data
  };
}

export async function createAdminBooking(token, payload) {
  const data = await adminRequest("/admin/bookings", token, {
    method: "POST",
    body: JSON.stringify(normalizeAdminBookingPayload(payload))
  });
  return {
    endpoint: `${API_BASE_URL}/admin/bookings`,
    data
  };
}

export async function updateAdminBooking(token, bookingId, payload) {
  const data = await adminRequest(`/admin/bookings/${bookingId}`, token, {
    method: "PUT",
    body: JSON.stringify(normalizeAdminBookingPayload(payload))
  });
  return {
    endpoint: `${API_BASE_URL}/admin/bookings/${bookingId}`,
    data
  };
}

export async function deleteAdminBooking(token, bookingId) {
  const data = await adminRequest(`/admin/bookings/${bookingId}`, token, {
    method: "DELETE"
  });
  return {
    endpoint: `${API_BASE_URL}/admin/bookings/${bookingId}`,
    data
  };
}
