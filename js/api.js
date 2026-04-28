const API_BASE_URL = "http://localhost:8080/api";

const mockRooms = [
  {
    id: 1,
    name: "Terrace Suite",
    capacity: 2,
    pricePerNight: 420,
    image: "assets/room-terrace.svg",
    tagline: "Private terrace, king bed, marble bath",
    amenities: ["Private terrace", "King bed", "Rain shower", "Sunrise lounge"],
    availableDates: ["2026-06-06", "2026-06-07", "2026-06-08", "2026-06-09", "2026-06-10"]
  },
  {
    id: 2,
    name: "Garden Pavilion",
    capacity: 3,
    pricePerNight: 360,
    image: "assets/room-pavilion.svg",
    tagline: "Courtyard calm with warm wood details",
    amenities: ["Garden view", "Breakfast corner", "Reading nook", "Walk-in wardrobe"],
    availableDates: ["2026-06-06", "2026-06-08", "2026-06-09", "2026-06-10", "2026-06-11"]
  },
  {
    id: 3,
    name: "Signature Loft",
    capacity: 4,
    pricePerNight: 520,
    image: "assets/room-signature.svg",
    tagline: "Open-plan luxury for longer stays",
    amenities: ["Lounge area", "Soaking tub", "Dining set", "Priority concierge"],
    availableDates: ["2026-06-07", "2026-06-08", "2026-06-09", "2026-06-10", "2026-06-11"]
  }
];

const mockDelay = (payload, ms = 240) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(payload), ms);
  });

function createUuid() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export async function getAvailability(params = {}) {
  const { checkin, checkout, guests = 1 } = params;
  const filteredRooms = mockRooms.filter((room) => {
    const fitsGuests = room.capacity >= Number(guests || 1);
    const fitsDates =
      !checkin ||
      !checkout ||
      (room.availableDates.includes(checkin) && room.availableDates.includes(checkout));

    return fitsGuests && fitsDates;
  });

  return mockDelay({
    endpoint: `${API_BASE_URL}/availability`,
    request: params,
    data: filteredRooms
  });
}

export async function createBooking(payload) {
  const selectedRoom = mockRooms.find((room) => room.id === Number(payload.roomId));
  const bookingId = createUuid();
  const token = createUuid();

  return mockDelay({
    endpoint: `${API_BASE_URL}/bookings`,
    data: {
      id: bookingId,
      token,
      roomId: payload.roomId,
      roomName: selectedRoom?.name,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: "LOCKED",
      lockedUntil: new Date(Date.now() + 2 * 60 * 1000).toISOString()
    }
  });
}

export async function updateClientData(bookingId, token, payload) {
  return mockDelay({
    endpoint: `${API_BASE_URL}/bookings/${bookingId}/client?token=${token}`,
    data: {
      id: bookingId,
      token,
      status: "PENDING",
      client: payload
    }
  });
}

export async function initiatePayment(bookingId, token) {
  return mockDelay({
    endpoint: `${API_BASE_URL}/bookings/${bookingId}/payment?token=${token}`,
    data: {
      bookingId,
      transactionId: createUuid(),
      paymentUrl: `confirmation.html?bookingId=${bookingId}&token=${token}&status=success`
    }
  });
}

export async function getBookingStatus(bookingId, token, status = "CONFIRMED") {
  return mockDelay({
    endpoint: `${API_BASE_URL}/bookings/${bookingId}?token=${token}`,
    data: {
      id: bookingId,
      token,
      status,
      paymentStatus: status === "FAILED" ? "FAILED" : status === "PENDING" ? "PENDING" : "SUCCESS"
    }
  });
}

export function getMockRooms() {
  return [...mockRooms];
}
