import {
  createBooking,
  getAvailability,
  getBookingStatus,
  getMockRooms,
  initiatePayment,
  updateClientData
} from "./api.js";

const STORAGE_KEY = "aurelia-booking-flow";

const defaultState = {
  stay: {
    checkin: "",
    checkout: "",
    guests: 2
  },
  room: null,
  booking: null,
  guest: null
};

const roomLookup = new Map(getMockRooms().map((room) => [room.id, room]));

const state = loadState();

document.addEventListener("DOMContentLoaded", async () => {
  applyDateDefaults();
  hydrateSearchForms();
  wireSearchForms();

  const page = document.body.dataset.page;

  if (page === "rooms") {
    await renderRoomsPage();
  }

  if (page === "booking") {
    renderBookingPage();
  }

  if (page === "confirmation") {
    await renderConfirmationPage();
  }
});

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Some mobile/private browsing contexts restrict storage writes.
  }
}

function applyDateDefaults() {
  const now = new Date();
  const checkin = state.stay.checkin || formatDate(addDays(now, 39));
  const checkout = state.stay.checkout || formatDate(addDays(now, 42));
  state.stay.checkin = checkin;
  state.stay.checkout = checkout;
  saveState();
}

function hydrateSearchForms() {
  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.elements.checkin.value = state.stay.checkin;
    form.elements.checkout.value = state.stay.checkout;
    form.elements.guests.value = String(state.stay.guests || 2);
  });

  document.querySelectorAll("[data-stay-summary]").forEach((node) => {
    node.innerHTML = `
      <strong>Selected stay</strong>
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)} · ${state.stay.guests} guest${Number(state.stay.guests) > 1 ? "s" : ""}</span>
    `;
  });
}

function wireSearchForms() {
  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      state.stay = {
        checkin: form.elements.checkin.value,
        checkout: form.elements.checkout.value,
        guests: Number(form.elements.guests.value)
      };
      saveState();
      window.location.href = "rooms.html";
    });
  });
}

async function renderRoomsPage() {
  const roomList = document.querySelector("[data-room-list]");

  if (!roomList) {
    return;
  }

  const response = await getAvailability(state.stay);
  const rooms = response.data;

  roomList.innerHTML = rooms.length
    ? rooms.map((room) => roomCardTemplate(room)).join("")
    : `
      <article class="surface-card empty-state">
        <p class="eyebrow">No current match</p>
        <h2>Try shifting your stay by a day or adjusting guest count.</h2>
        <p class="note">The live backend integration can later replace this placeholder filtering with true availability results.</p>
      </article>
    `;

  roomList.querySelectorAll("[data-select-room]").forEach((button) => {
    button.addEventListener("click", async () => {
      const originalLabel = button.textContent;

      try {
        button.disabled = true;
        button.textContent = "Preparing...";

        const roomId = Number(button.dataset.selectRoom);
        const room = roomLookup.get(roomId);

        state.room = room;
        const bookingResponse = await createBooking({
          roomId,
          startDate: state.stay.checkin,
          endDate: state.stay.checkout
        });

        state.booking = bookingResponse.data;
        saveState();
        window.location.href = "booking.html";
      } catch (error) {
        button.disabled = false;
        button.textContent = originalLabel;
        window.alert("We couldn't prepare this room right now. Please try again.");
        console.error("Room selection failed", error);
      }
    });
  });
}

function renderBookingPage() {
  const summaryNode = document.querySelector("[data-booking-summary]");
  const form = document.querySelector("[data-guest-form]");

  if (!summaryNode || !form) {
    return;
  }

  if (!state.room || !state.booking) {
    window.location.href = "rooms.html";
    return;
  }

  const nights = calculateNights(state.stay.checkin, state.stay.checkout);
  const total = nights * state.room.pricePerNight;

  summaryNode.innerHTML = `
    <img src="${state.room.image}" alt="${state.room.name}">
    <div class="summary-block">
      <p class="eyebrow">Selected room</p>
      <h2>${state.room.name}</h2>
      <p>${state.room.tagline}</p>
    </div>
    <div class="summary-list">
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
      <span>${nights} night${nights > 1 ? "s" : ""}</span>
      <span>${state.stay.guests} guest${Number(state.stay.guests) > 1 ? "s" : ""}</span>
      <span>Ref ${state.booking.id.slice(0, 8).toUpperCase()}</span>
    </div>
    <div class="summary-total">
      <span>Total stay estimate</span>
      <strong>${formatCurrency(total)}</strong>
    </div>
  `;

  if (state.guest) {
    form.elements.firstName.value = state.guest.firstName || "";
    form.elements.lastName.value = state.guest.lastName || "";
    form.elements.email.value = state.guest.email || "";
    form.elements.guests.value = String(state.stay.guests || 2);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const guest = {
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      guests: Number(form.elements.guests.value)
    };

    state.guest = guest;
    state.stay.guests = guest.guests;

    await updateClientData(state.booking.id, state.booking.token, guest);
    const payment = await initiatePayment(state.booking.id, state.booking.token);
    saveState();
    window.location.href = payment.data.paymentUrl;
  });
}

async function renderConfirmationPage() {
  const statusNode = document.querySelector("[data-confirmation-status]");
  const summaryNode = document.querySelector("[data-confirmation-summary]");

  if (!statusNode || !summaryNode || !state.room || !state.booking) {
    if (statusNode) {
      statusNode.innerHTML = `<div class="empty-state"><h2>No booking selected</h2><p class="note">Start from the rooms page to create a reservation flow.</p></div>`;
    }
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const variantParam = (params.get("status") || "success").toUpperCase();
  const statusMap = {
    SUCCESS: "CONFIRMED",
    PENDING: "PENDING",
    FAILED: "FAILED"
  };
  const bookingStatus = statusMap[variantParam] || "CONFIRMED";
  const bookingState = await getBookingStatus(state.booking.id, state.booking.token, bookingStatus);
  const status = bookingState.data.status;
  const nights = calculateNights(state.stay.checkin, state.stay.checkout);
  const total = nights * state.room.pricePerNight;

  const variantCopy = {
    CONFIRMED: {
      title: "Booking confirmed",
      body: "Payment completed successfully and your reservation is secured.",
      action: "Return to home",
      href: "index.html",
      className: "status-confirmed"
    },
    PENDING: {
      title: "Payment pending",
      body: "Your room is still reserved while the payment status is being finalized.",
      action: "Review booking",
      href: "booking.html",
      className: "status-pending"
    },
    FAILED: {
      title: "Payment failed",
      body: "The room selection is still visible so the guest can retry or update details.",
      action: "Try again",
      href: "booking.html",
      className: "status-failed"
    }
  }[status];

  statusNode.dataset.status = status;
  statusNode.innerHTML = `
    <div class="status-header">
      <p class="eyebrow">Status</p>
      <span class="status-pill ${variantCopy.className}">${variantCopy.title}</span>
      <h2>${variantCopy.title}</h2>
      <p>${variantCopy.body}</p>
    </div>
    <div class="status-meta">
      Booking reference <strong>${state.booking.id.slice(0, 8).toUpperCase()}</strong><br>
      Payment state <strong>${bookingState.data.paymentStatus}</strong>
    </div>
    <div class="status-actions">
      <a href="${variantCopy.href}" class="button button-primary">${variantCopy.action}</a>
      <a href="confirmation.html?status=pending" class="button button-secondary">View pending state</a>
      <a href="confirmation.html?status=failed" class="button button-secondary">View failed state</a>
    </div>
  `;

  summaryNode.innerHTML = `
    <div class="summary-block">
      <p class="eyebrow">Reservation summary</p>
      <h2>${state.room.name}</h2>
      <p>${state.room.tagline}</p>
    </div>
    <div class="summary-list">
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
      <span>${nights} night${nights > 1 ? "s" : ""}</span>
      <span>${state.stay.guests} guest${Number(state.stay.guests) > 1 ? "s" : ""}</span>
      <span>${state.guest?.firstName || "Guest"} ${state.guest?.lastName || ""}</span>
    </div>
    <div class="summary-total">
      <span>Total stay estimate</span>
      <strong>${formatCurrency(total)}</strong>
    </div>
    <p class="note">Next backend step: fetch the final reservation payload from <code>GET /api/bookings/{id}?token=</code> and map each returned status to these UI variants.</p>
  `;
}

function roomCardTemplate(room) {
  return `
    <article class="room-card">
      <div class="room-card-media">
        <img src="${room.image}" alt="${room.name}">
        <span class="room-badge">Up to ${room.capacity} guests</span>
      </div>
      <div class="room-card-body">
        <div class="room-card-header">
          <p class="eyebrow">Premium room</p>
          <h2>${room.name}</h2>
          <p>${room.tagline}</p>
        </div>
        <div class="amenity-tags">
          ${room.amenities.map((amenity) => `<span>${amenity}</span>`).join("")}
        </div>
        <div class="price-row">
          <div class="price-stack">
            <strong class="price">${formatCurrency(room.pricePerNight)}</strong>
            <span class="note">per night</span>
          </div>
          <button class="button button-primary" type="button" data-select-room="${room.id}">Select room</button>
        </div>
      </div>
    </article>
  `;
}

function calculateNights(checkin, checkout) {
  const start = new Date(checkin);
  const end = new Date(checkout);
  return Math.max(1, Math.round((end - start) / 86400000));
}

function formatStayRange(checkin, checkout) {
  return `${formatLongDate(checkin)} to ${formatLongDate(checkout)}`;
}

function formatLongDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
