const API_BASE_URL = globalThis.BOOKING_API_BASE_URL || "/api";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
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
    totalRateForStay: room.totalRateForStay ?? room.totalRatePerNight ?? null,
    packageOption: Boolean(room.packageOption),
    availableDates: (room.availableDates || []).map(normalizeDate)
  };
}

export async function getAvailability(params = {}) {
  const { checkin, checkout, guests = 1 } = params;
  const guestCount = Math.max(1, Number(guests || 1));
  const search = new URLSearchParams({
    guests: String(guestCount),
    startDate: checkin,
    endDate: checkout
  });
  const availability = await request(`/availability?${search.toString()}`);

  const rooms = availability.map(toFrontendRoom);

  return {
    endpoint: `${API_BASE_URL}/availability?${search.toString()}`,
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
      email: payload.email,
      mobilePhoneNumber: payload.mobilePhoneNumber,
      city: payload.city,
      countryName: payload.countryName,
      state: payload.state,
      postalCode: payload.postalCode,
      addressDetails: payload.addressDetails
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
    roomNumber: payload.roomNumber?.trim() || "",
    capacity: Number(payload.capacity),
    ratePerNight: Number(payload.ratePerNight),
    discount: payload.discount === "" || payload.discount == null ? 0 : Number(payload.discount),
    ratePeriods: Array.isArray(payload.ratePeriods)
      ? payload.ratePeriods.map((period) => ({
        startDate: period.startDate,
        endDate: period.endDate,
        ratePerNight: Number(period.ratePerNight)
      }))
      : []
  };
}

function normalizeAdminBookingPayload(payload) {
  const roomIds = Array.isArray(payload.roomIds)
    ? payload.roomIds.map((roomId) => Number(roomId)).filter(Number.isFinite)
    : [];

  const parsedRoomId = Number(payload.roomId);
  const roomId = Number.isFinite(parsedRoomId) ? parsedRoomId : null;
  if (roomId != null && !roomIds.includes(roomId)) {
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
    clientPhoneNumber: payload.clientPhoneNumber?.trim() || null,
    mentions: payload.mentions?.trim() || null,
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

export async function getAdminAvailableRooms(token, params = {}) {
  const search = new URLSearchParams({
    startDate: params.startDate,
    endDate: params.endDate
  });
  if (params.excludeBookingId) {
    search.set("excludeBookingId", params.excludeBookingId);
  }

  const data = await adminRequest(`/admin/rooms/availability?${search.toString()}`, token);
  return {
    endpoint: `${API_BASE_URL}/admin/rooms/availability?${search.toString()}`,
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
