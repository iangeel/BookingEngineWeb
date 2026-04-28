import {
  createBooking,
  getAvailability,
  getBookingStatus,
  getMockRooms,
  initiatePayment,
  updateClientData
} from "./api.js";

const STORAGE_KEY = "aurelia-booking-flow";
const LANGUAGE_KEY = "booking-engine-language";
const DEFAULT_LANGUAGE = "ro";
const LOCALES = {
  ro: "ro-RO",
  en: "en-US"
};
const ROOM_COPY = {
  ro: {
    1: {
      name: "Suita cu terasa",
      tagline: "Terasa privata, pat king size, baie din marmura",
      amenities: ["Terasa privata", "Pat king size", "Dus tip ploaie", "Zona lounge la rasarit"]
    },
    2: {
      name: "Pavilion gradina",
      tagline: "Liniste spre curte cu finisaje calde din lemn",
      amenities: ["Vedere spre gradina", "Colt pentru mic dejun", "Nisa de lectura", "Dressing walk-in"]
    },
    3: {
      name: "Loft Signature",
      tagline: "Lux in plan deschis pentru sejururi mai lungi",
      amenities: ["Zona de lounge", "Cada freestanding", "Set de dining", "Concierge prioritar"]
    }
  },
  en: {
    1: {
      name: "Terrace Suite",
      tagline: "Private terrace, king bed, marble bath",
      amenities: ["Private terrace", "King bed", "Rain shower", "Sunrise lounge"]
    },
    2: {
      name: "Garden Pavilion",
      tagline: "Courtyard calm with warm wood details",
      amenities: ["Garden view", "Breakfast corner", "Reading nook", "Walk-in wardrobe"]
    },
    3: {
      name: "Signature Loft",
      tagline: "Open-plan luxury for longer stays",
      amenities: ["Lounge area", "Soaking tub", "Dining set", "Priority concierge"]
    }
  }
};
const TRANSLATIONS = {
  ro: {
    brandName: "Booking Engine",
    brandTagline: "Flux direct de rezervare",
    navSearch: "Cautare",
    navRooms: "Camere",
    navBooking: "Rezervare",
    navConfirmation: "Confirmare",
    languageLabel: "Limba",
    homeEyebrow: "Intrare in rezervare",
    homeSearchTitle: "Verifica disponibilitatea si continua catre selectia camerei",
    labelCheckin: "Check-in",
    labelCheckout: "Check-out",
    labelGuests: "Oaspeti",
    labelFirstName: "Prenume",
    labelLastName: "Nume",
    labelEmail: "Email",
    guests1: "1 oaspete",
    guests2: "2 oaspeti",
    guests3: "3 oaspeti",
    guests4: "4 oaspeti",
    buttonViewAvailability: "Vezi disponibilitatea",
    homeRoomsEyebrow: "Camere disponibile",
    homeRoomsTitle: "Selecteaza camera potrivita pentru aceasta perioada.",
    footerDescription: "Un frontend orientat pe rezervare, gandit sa functioneze impreuna cu `BookingOrchestratorAPI` in spatele site-urilor hotelurilor si unitatilor de cazare.",
    footerItem1: "Flux de rezervare pregatit pentru integrare",
    footerItem2: "Stari de rezervare conduse din backend",
    footerItem3: "Responsive pe orice dispozitiv",
    roomsEyebrow: "Disponibilitate camere",
    roomsTitle: "Camere disponibile pentru perioada selectata.",
    roomsLead: "Aceasta pagina ramane disponibila ca ruta directa alternativa, in timp ce fluxul principal incepe si continua din pagina principala.",
    roomsFooterDescription: "Ecran alternativ de listare a camerelor pentru oaspetii care ajung direct pe ruta de camere.",
    roomsFooterItem1: "Tarif pe noapte",
    roomsFooterItem2: "Selectie in functie de capacitate",
    roomsFooterItem3: "Pasi de rezervare accesibili",
    bookingEyebrow: "Detalii oaspete",
    bookingTitle: "Completeaza detaliile rezervarii.",
    bookingLead: "Camera selectata si rezumatul sederii raman vizibile pe masura ce oaspetele continua catre plata.",
    bookingFormEyebrow: "Oaspete principal",
    bookingFormTitle: "Informatii calator",
    bookingTrustTitle: "De ce sa continui?",
    bookingTrustBody: "Datele tale sunt pregatite pentru pasul de backend `PATCH /api/bookings/{id}/client?token=`, urmat de initierea platii.",
    buttonContinuePayment: "Continua catre plata",
    bookingFooterDescription: "Flux de date pentru oaspete pregatit pentru actualizari backend pe baza de token si initierea platii.",
    bookingFooterItem1: "Etichete accesibile pentru formular",
    bookingFooterItem2: "Progres salvat",
    bookingFooterItem3: "Pas urmator pregatit pentru confirmare",
    confirmationEyebrow: "Status rezervare",
    confirmationTitle: "Rezumatul rezervarii tale, disponibil imediat.",
    confirmationLead: "Aceasta pagina de confirmare suporta starile plata reusita, in asteptare si esuata folosind viitorul lookup `GET /api/bookings/{id}?token=` din backend.",
    confirmationFooterDescription: "Ecran de status al rezervarii conceput pentru preluare dupa plata si pentru claritate in fata oaspetelui.",
    confirmationFooterItem1: "Referinta vizibila",
    confirmationFooterItem2: "Variante pentru starea platii",
    confirmationFooterItem3: "Actiuni clare pentru pasul urmator",
    noMatchEyebrow: "Nicio potrivire disponibila",
    noMatchTitle: "Incearca sa modifici perioada sau numarul de oaspeti.",
    noMatchNote: "Integrarea live cu backendul poate inlocui ulterior aceasta filtrare demonstrativa cu disponibilitate reala.",
    preparingRoom: "Se pregateste...",
    roomSelectionError: "Nu am putut pregati aceasta camera acum. Te rugam sa incerci din nou.",
    emptyFlowTitle: "Nicio rezervare selectata",
    emptyFlowNote: "Porneste din pagina principala de rezervare pentru a crea un flux de rezervare.",
    statusLabel: "Status",
    confirmationSuccessTitle: "Rezervare confirmata",
    confirmationSuccessBody: "Plata a fost finalizata cu succes, iar rezervarea ta este securizata.",
    confirmationSuccessAction: "Inapoi la pagina principala",
    confirmationPendingTitle: "Plata in asteptare",
    confirmationPendingBody: "Camera ramane rezervata in timp ce statusul platii este finalizat.",
    confirmationPendingAction: "Revino la rezervare",
    confirmationFailedTitle: "Plata a esuat",
    confirmationFailedBody: "Selectia camerei ramane vizibila pentru ca oaspetele sa poata incerca din nou sau sa actualizeze datele.",
    confirmationFailedAction: "Incearca din nou",
    buttonViewPendingState: "Vezi varianta in asteptare",
    buttonViewFailedState: "Vezi varianta esuata",
    bookingReference: "Referinta rezervare",
    referenceShort: "Ref",
    paymentState: "Stare plata",
    paymentStatusSuccess: "Reusita",
    paymentStatusPending: "In asteptare",
    paymentStatusFailed: "Esuata",
    summaryEyebrow: "Rezumat rezervare",
    selectedRoom: "Camera selectata",
    totalStayEstimate: "Cost total estimat",
    nextBackendNote: "Pasul urmator in backend: preia payloadul final al rezervarii din `GET /api/bookings/{id}?token=` si mapeaza fiecare status in aceste variante de interfata.",
    guestFallback: "Oaspete",
    roomBadgeUpTo: "Pana la {count} oaspeti",
    premiumRoom: "Camera premium",
    perNight: "pe noapte",
    buttonSelectRoom: "Selecteaza camera",
    staySummaryTitle: "Perioada selectata",
    fromToSeparator: "pana la",
    nights: "nopti",
    night: "noapte",
    guestSingular: "oaspete",
    guestPlural: "oaspeti"
  },
  en: {
    brandName: "Booking Engine",
    brandTagline: "Direct booking flow",
    navSearch: "Search",
    navRooms: "Rooms",
    navBooking: "Booking",
    navConfirmation: "Confirmation",
    languageLabel: "Language",
    homeEyebrow: "Booking entry",
    homeSearchTitle: "Check availability and continue to room selection",
    labelCheckin: "Check-in",
    labelCheckout: "Check-out",
    labelGuests: "Guests",
    labelFirstName: "First name",
    labelLastName: "Last name",
    labelEmail: "Email",
    guests1: "1 guest",
    guests2: "2 guests",
    guests3: "3 guests",
    guests4: "4 guests",
    buttonViewAvailability: "View availability",
    homeRoomsEyebrow: "Available rooms",
    homeRoomsTitle: "Select the room that best fits this stay.",
    footerDescription: "A booking-focused frontend designed to work with `BookingOrchestratorAPI` behind hotel and accommodation websites.",
    footerItem1: "Plugin-ready booking flow",
    footerItem2: "Backend-driven reservation states",
    footerItem3: "Responsive on every device",
    roomsEyebrow: "Room availability",
    roomsTitle: "Available rooms for the selected stay.",
    roomsLead: "This page remains available as a fallback direct route, while the main booking flow now starts and continues from the homepage.",
    roomsFooterDescription: "Fallback room listing screen for guests who arrive directly on the rooms route.",
    roomsFooterItem1: "Nightly pricing",
    roomsFooterItem2: "Capacity-aware selection",
    roomsFooterItem3: "Accessible booking steps",
    bookingEyebrow: "Guest details",
    bookingTitle: "Complete your booking details.",
    bookingLead: "The selected room and stay summary remain visible while the guest continues toward payment.",
    bookingFormEyebrow: "Primary guest",
    bookingFormTitle: "Traveler information",
    bookingTrustTitle: "Why continue?",
    bookingTrustBody: "Your details are prepared for the backend `PATCH /api/bookings/{id}/client?token=` step, followed by payment initiation.",
    buttonContinuePayment: "Continue to payment",
    bookingFooterDescription: "Guest details flow prepared for token-based backend updates and payment initiation.",
    bookingFooterItem1: "Accessible form labels",
    bookingFooterItem2: "Saved progress",
    bookingFooterItem3: "Confirmation-ready next step",
    confirmationEyebrow: "Reservation status",
    confirmationTitle: "Your booking summary, ready at a glance.",
    confirmationLead: "This confirmation screen supports success, pending, and failed payment states using the future `GET /api/bookings/{id}?token=` backend lookup.",
    confirmationFooterDescription: "Booking status screen designed for post-payment retrieval and guest reassurance.",
    confirmationFooterItem1: "Reference visibility",
    confirmationFooterItem2: "Payment state variants",
    confirmationFooterItem3: "Action-oriented follow-up",
    noMatchEyebrow: "No current match",
    noMatchTitle: "Try shifting your stay by a day or adjusting guest count.",
    noMatchNote: "The live backend integration can later replace this placeholder filtering with true availability results.",
    preparingRoom: "Preparing...",
    roomSelectionError: "We couldn't prepare this room right now. Please try again.",
    emptyFlowTitle: "No booking selected",
    emptyFlowNote: "Start from the main booking page to create a booking flow.",
    statusLabel: "Status",
    confirmationSuccessTitle: "Booking confirmed",
    confirmationSuccessBody: "Payment completed successfully and your reservation is secured.",
    confirmationSuccessAction: "Return to home",
    confirmationPendingTitle: "Payment pending",
    confirmationPendingBody: "Your room is still reserved while the payment status is being finalized.",
    confirmationPendingAction: "Review booking",
    confirmationFailedTitle: "Payment failed",
    confirmationFailedBody: "The room selection remains visible so the guest can retry or update details.",
    confirmationFailedAction: "Try again",
    buttonViewPendingState: "View pending state",
    buttonViewFailedState: "View failed state",
    bookingReference: "Booking reference",
    referenceShort: "Ref",
    paymentState: "Payment state",
    paymentStatusSuccess: "Success",
    paymentStatusPending: "Pending",
    paymentStatusFailed: "Failed",
    summaryEyebrow: "Reservation summary",
    selectedRoom: "Selected room",
    totalStayEstimate: "Total stay estimate",
    nextBackendNote: "Next backend step: fetch the final booking payload from `GET /api/bookings/{id}?token=` and map each status to these UI variants.",
    guestFallback: "Guest",
    roomBadgeUpTo: "Up to {count} guests",
    premiumRoom: "Premium room",
    perNight: "per night",
    buttonSelectRoom: "Select room",
    staySummaryTitle: "Selected stay",
    fromToSeparator: "to",
    nights: "nights",
    night: "night",
    guestSingular: "guest",
    guestPlural: "guests"
  }
};

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
let currentLanguage = loadLanguage();

document.addEventListener("DOMContentLoaded", async () => {
  applyLanguage();
  wireLanguageSwitcher();
  applyDateDefaults();
  hydrateSearchForms();
  wireSearchForms();

  const page = document.body.dataset.page;

  if (page === "home" || page === "rooms") {
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

function loadLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function saveLanguage(language) {
  currentLanguage = language;

  try {
    window.localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    // Ignore storage restrictions.
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

function t(key, replacements = {}) {
  const languagePack = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE];
  const template = languagePack[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;

  return Object.entries(replacements).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, value),
    template
  );
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  const metaDescription = document.querySelector("[data-i18n-meta-description]");
  if (metaDescription) {
    const descriptions = {
      home: {
        ro: "Un flux de rezervare direct, simplu si eficient, pentru hoteluri, vile si alte unitati de cazare.",
        en: "A focused direct-booking flow for hotels, villas, and accommodation businesses."
      },
      rooms: {
        ro: "Ruta alternativa catre camerele disponibile din motorul de rezervari.",
        en: "Fallback direct link to available rooms inside the booking engine."
      },
      booking: {
        ro: "Confirma camera selectata, completeaza datele oaspetelui si continua catre plata securizata.",
        en: "Confirm the selected room, enter guest details, and continue toward secure payment."
      },
      confirmation: {
        ro: "Verifica statusul rezervarii, detaliile de confirmare si starea platii.",
        en: "Review booking status, confirmation details, and payment state."
      }
    };
    const page = document.body.dataset.page;
    metaDescription.setAttribute("content", descriptions[page]?.[currentLanguage] || descriptions.home[currentLanguage]);
  }

  const pageTitles = {
    home: {
      ro: "Motor de rezervari directe",
      en: "Direct Booking Engine"
    },
    rooms: {
      ro: "Camere | Booking Engine",
      en: "Rooms | Booking Engine"
    },
    booking: {
      ro: "Detalii rezervare | Booking Engine",
      en: "Booking details | Booking Engine"
    },
    confirmation: {
      ro: "Confirmare rezervare | Booking Engine",
      en: "Booking confirmation | Booking Engine"
    }
  };
  document.title = pageTitles[document.body.dataset.page]?.[currentLanguage] || pageTitles.home[currentLanguage];

  document.querySelectorAll("[data-language-switcher]").forEach((select) => {
    select.value = currentLanguage;
  });
}

function localizeRoom(room) {
  const copy = ROOM_COPY[currentLanguage]?.[room.id];
  return copy ? { ...room, ...copy } : room;
}

function wireLanguageSwitcher() {
  document.querySelectorAll("[data-language-switcher]").forEach((select) => {
    select.addEventListener("change", async (event) => {
      saveLanguage(event.target.value);
      applyLanguage();
      hydrateSearchForms();

      if (document.querySelector("[data-room-list]")) {
        await renderRoomsPage();
      }

      if (document.body.dataset.page === "booking") {
        renderBookingPage();
      }

      if (document.body.dataset.page === "confirmation") {
        await renderConfirmationPage();
      }
    });
  });
}

function hydrateSearchForms() {
  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.elements.checkin.value = state.stay.checkin;
    form.elements.checkout.value = state.stay.checkout;
    form.elements.guests.value = String(state.stay.guests || 2);
  });

  document.querySelectorAll("[data-stay-summary]").forEach((node) => {
    node.innerHTML = `
      <strong>${t("staySummaryTitle")}</strong>
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)} · ${formatGuestsCount(state.stay.guests)}</span>
    `;
  });
}

function wireSearchForms() {
  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      state.stay = {
        checkin: form.elements.checkin.value,
        checkout: form.elements.checkout.value,
        guests: Number(form.elements.guests.value)
      };
      saveState();

      const roomList = document.querySelector("[data-room-list]");

      if (roomList) {
        await renderRoomsPage();
        roomList.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.location.href = "index.html#available-rooms";
    });
  });
}

async function renderRoomsPage() {
  const roomList = document.querySelector("[data-room-list]");

  if (!roomList) {
    return;
  }

  const response = await getAvailability(state.stay);
  const rooms = response.data.map(localizeRoom);

  roomList.innerHTML = rooms.length
    ? rooms.map((room) => roomCardTemplate(room)).join("")
    : `
      <article class="surface-card empty-state">
        <p class="eyebrow">${t("noMatchEyebrow")}</p>
        <h2>${t("noMatchTitle")}</h2>
        <p class="note">${t("noMatchNote")}</p>
      </article>
    `;

  roomList.querySelectorAll("[data-select-room]").forEach((button) => {
    button.addEventListener("click", async () => {
      const originalLabel = button.textContent;

      try {
        button.disabled = true;
        button.textContent = t("preparingRoom");

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
        window.alert(t("roomSelectionError"));
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
    window.location.href = "index.html#available-rooms";
    return;
  }

  const nights = calculateNights(state.stay.checkin, state.stay.checkout);
  const room = localizeRoom(state.room);
  const total = nights * room.pricePerNight;

  summaryNode.innerHTML = `
    <img src="${room.image}" alt="${room.name}">
    <div class="summary-block">
      <p class="eyebrow">${t("selectedRoom")}</p>
      <h2>${room.name}</h2>
      <p>${room.tagline}</p>
    </div>
    <div class="summary-list">
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
      <span>${formatNights(nights)}</span>
      <span>${formatGuestsCount(state.stay.guests)}</span>
      <span>${t("referenceShort")} ${state.booking.id.slice(0, 8).toUpperCase()}</span>
    </div>
    <div class="summary-total">
      <span>${t("totalStayEstimate")}</span>
      <strong>${formatCurrency(total)}</strong>
    </div>
  `;

  if (state.guest) {
    form.elements.firstName.value = state.guest.firstName || "";
    form.elements.lastName.value = state.guest.lastName || "";
    form.elements.email.value = state.guest.email || "";
    form.elements.guests.value = String(state.stay.guests || 2);
  }

  form.onsubmit = async (event) => {
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
  };
}

async function renderConfirmationPage() {
  const statusNode = document.querySelector("[data-confirmation-status]");
  const summaryNode = document.querySelector("[data-confirmation-summary]");

  if (!statusNode || !summaryNode || !state.room || !state.booking) {
    if (statusNode) {
      statusNode.innerHTML = `<div class="empty-state"><h2>${t("emptyFlowTitle")}</h2><p class="note">${t("emptyFlowNote")}</p></div>`;
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
  const room = localizeRoom(state.room);
  const total = nights * room.pricePerNight;

  const variantCopy = {
    CONFIRMED: {
      title: t("confirmationSuccessTitle"),
      body: t("confirmationSuccessBody"),
      action: t("confirmationSuccessAction"),
      href: "index.html",
      className: "status-confirmed"
    },
    PENDING: {
      title: t("confirmationPendingTitle"),
      body: t("confirmationPendingBody"),
      action: t("confirmationPendingAction"),
      href: "booking.html",
      className: "status-pending"
    },
    FAILED: {
      title: t("confirmationFailedTitle"),
      body: t("confirmationFailedBody"),
      action: t("confirmationFailedAction"),
      href: "booking.html",
      className: "status-failed"
    }
  }[status];

  statusNode.dataset.status = status;
  statusNode.innerHTML = `
    <div class="status-header">
      <p class="eyebrow">${t("statusLabel")}</p>
      <span class="status-pill ${variantCopy.className}">${variantCopy.title}</span>
      <h2>${variantCopy.title}</h2>
      <p>${variantCopy.body}</p>
    </div>
    <div class="status-meta">
      ${t("bookingReference")} <strong>${state.booking.id.slice(0, 8).toUpperCase()}</strong><br>
      ${t("paymentState")} <strong>${formatPaymentStatus(bookingState.data.paymentStatus)}</strong>
    </div>
    <div class="status-actions">
      <a href="${variantCopy.href}" class="button button-primary">${variantCopy.action}</a>
      <a href="confirmation.html?status=pending" class="button button-secondary">${t("buttonViewPendingState")}</a>
      <a href="confirmation.html?status=failed" class="button button-secondary">${t("buttonViewFailedState")}</a>
    </div>
  `;

  summaryNode.innerHTML = `
    <div class="summary-block">
      <p class="eyebrow">${t("summaryEyebrow")}</p>
      <h2>${room.name}</h2>
      <p>${room.tagline}</p>
    </div>
    <div class="summary-list">
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
      <span>${formatNights(nights)}</span>
      <span>${formatGuestsCount(state.stay.guests)}</span>
      <span>${state.guest?.firstName || t("guestFallback")} ${state.guest?.lastName || ""}</span>
    </div>
    <div class="summary-total">
      <span>${t("totalStayEstimate")}</span>
      <strong>${formatCurrency(total)}</strong>
    </div>
    <p class="note">${t("nextBackendNote")}</p>
  `;
}

function roomCardTemplate(room) {
  return `
    <article class="room-card">
      <div class="room-card-media">
        <img src="${room.image}" alt="${room.name}">
        <span class="room-badge">${t("roomBadgeUpTo", { count: room.capacity })}</span>
      </div>
      <div class="room-card-body">
        <div class="room-card-header">
          <p class="eyebrow">${t("premiumRoom")}</p>
          <h2>${room.name}</h2>
          <p>${room.tagline}</p>
        </div>
        <div class="amenity-tags">
          ${room.amenities.map((amenity) => `<span>${amenity}</span>`).join("")}
        </div>
        <div class="price-row">
          <div class="price-stack">
            <strong class="price">${formatCurrency(room.pricePerNight)}</strong>
            <span class="note">${t("perNight")}</span>
          </div>
          <button class="button button-primary" type="button" data-select-room="${room.id}">${t("buttonSelectRoom")}</button>
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
  return `${formatLongDate(checkin)} ${t("fromToSeparator")} ${formatLongDate(checkout)}`;
}

function formatLongDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(LOCALES[currentLanguage], {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat(LOCALES[currentLanguage], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNights(nights) {
  return `${nights} ${nights > 1 ? t("nights") : t("night")}`;
}

function formatGuestsCount(guests) {
  return `${guests} ${Number(guests) > 1 ? t("guestPlural") : t("guestSingular")}`;
}

function formatPaymentStatus(status) {
  const map = {
    SUCCESS: t("paymentStatusSuccess"),
    PENDING: t("paymentStatusPending"),
    FAILED: t("paymentStatusFailed")
  };
  return map[status] || status;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
