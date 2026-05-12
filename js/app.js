import {
  createBooking,
  getAvailability,
  getBookingStatus,
  initiatePayment,
  updateClientData
} from "./api.js?v=20260512b";

const STORAGE_KEY = "aurelia-booking-flow";
const LANGUAGE_KEY = "booking-engine-language";
const DEFAULT_LANGUAGE = "ro";
const LOCALES = {
  ro: "ro-RO",
  en: "en-US"
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
    guestCounterDecrease: "Reduce numarul de oaspeti",
    guestCounterIncrease: "Creste numarul de oaspeti",
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
    noMatchEyebrow: "Nicio camera disponibila",
    noMatchTitle: "Backendul nu a returnat camere disponibile in acest moment.",
    noMatchNote: "Verifica datele din BookingOrchestratorAPI sau inventarul configurat pentru camere.",
    availabilityErrorEyebrow: "Disponibilitatea nu poate fi incarcata",
    availabilityErrorTitle: "Nu am putut prelua camerele disponibile acum.",
    availabilityErrorNote: "Verifica daca backendul BookingOrchestratorAPI ruleaza pe acelasi host sau este expus prin `/api`.",
    preparingRoom: "Se pregateste...",
    roomSelectionError: "Nu am putut pregati aceasta camera acum. Te rugam sa incerci din nou.",
    bookingSubmitError: "Nu am putut continua rezervarea acum. Te rugam sa incerci din nou.",
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
    buttonContinueToPaymentPage: "Continua catre plata",
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
    premiumRoom: "Camera disponibila",
    packageRoom: "Pachet de camere",
    singleRoom: "Camera individuala",
    roomCapacityLabel: "Capacitate",
    roomsIncludedLabel: "Camere incluse",
    roomCountLabel: "Numar camere",
    roomAvailabilityLabel: "Disponibila pentru perioada selectata",
    roomAvailabilityMissingLabel: "Disponibilitate primita din backend",
    priceUnavailable: "Tarif disponibil in pasul urmator",
    pricePerNight: "pe noapte",
    buttonSelectRoom: "Selecteaza camera",
    staySummaryTitle: "Perioada selectata",
    fromToSeparator: "pana la",
    nights: "nopti",
    night: "noapte",
    guestSingular: "oaspete",
    guestPlural: "oaspeti",
    amountPending: "Valoarea finala va fi confirmata de backend la initierea platii."
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
    guestCounterDecrease: "Decrease guest count",
    guestCounterIncrease: "Increase guest count",
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
    noMatchEyebrow: "No rooms available",
    noMatchTitle: "The backend did not return any available rooms right now.",
    noMatchNote: "Check the data in BookingOrchestratorAPI or the configured room inventory.",
    availabilityErrorEyebrow: "Availability unavailable",
    availabilityErrorTitle: "We couldn't load available rooms right now.",
    availabilityErrorNote: "Check that BookingOrchestratorAPI is running on the same host or exposed through `/api`.",
    preparingRoom: "Preparing...",
    roomSelectionError: "We couldn't prepare this room right now. Please try again.",
    bookingSubmitError: "We couldn't continue the booking right now. Please try again.",
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
    buttonContinueToPaymentPage: "Continue to payment",
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
    premiumRoom: "Available room",
    packageRoom: "Room package",
    singleRoom: "Single room",
    roomCapacityLabel: "Capacity",
    roomsIncludedLabel: "Included rooms",
    roomCountLabel: "Room count",
    roomAvailabilityLabel: "Available for the selected stay",
    roomAvailabilityMissingLabel: "Availability received from backend",
    priceUnavailable: "Rate available in the next step",
    pricePerNight: "per night",
    buttonSelectRoom: "Select room",
    staySummaryTitle: "Selected stay",
    fromToSeparator: "to",
    nights: "nights",
    night: "night",
    guestSingular: "guest",
    guestPlural: "guests",
    amountPending: "The final amount will be confirmed by the backend when payment starts."
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
  guest: null,
  payment: null,
  availability: null
};

const state = loadState();
let currentLanguage = loadLanguage();

document.addEventListener("DOMContentLoaded", async () => {
  applyLanguage();
  wireLanguageSwitcher();
  applyDateDefaults();
  hydrateSearchForms();
  wireGuestSteppers();
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

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
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
    setGuestStepperValue(form, state.stay.guests || 2);
  });

  document.querySelectorAll("[data-stay-summary]").forEach((node) => {
    node.innerHTML = `
      <strong>${t("staySummaryTitle")}</strong>
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)} · ${formatGuestsCount(state.stay.guests)}</span>
    `;
  });
}

function wireGuestSteppers() {
  document.querySelectorAll("[data-guest-stepper]").forEach((stepper) => {
    const form = stepper.closest("form");

    stepper.querySelectorAll("[data-guest-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const current = Number(form.elements.guests.value || 2);
        const next = button.dataset.guestStep === "increase" ? current + 1 : current - 1;
        setGuestStepperValue(form, next);
      });
    });
  });
}

function setGuestStepperValue(form, value) {
  const safeValue = Math.max(1, Math.min(12, Number(value) || 2));
  const guestsInput = form.elements.guests;
  const display = form.querySelector("[data-guest-count-display]");
  const decreaseButton = form.querySelector('[data-guest-step="decrease"]');

  guestsInput.value = String(safeValue);

  if (display) {
    display.textContent = formatGuestsCount(safeValue);
  }

  if (decreaseButton) {
    decreaseButton.disabled = safeValue <= 1;
  }
}

function wireSearchForms() {
  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('[type="submit"]');
      const originalLabel = submitButton?.textContent;
      state.stay = {
        checkin: form.elements.checkin.value,
        checkout: form.elements.checkout.value,
        guests: Number(form.elements.guests.value)
      };
      state.room = null;
      state.booking = null;
      state.guest = null;
      state.payment = null;
      state.availability = null;
      saveState();

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = t("preparingRoom");
        }

        const response = await getAvailability(state.stay);
        state.availability = {
          stayKey: buildStayKey(state.stay),
          data: response.data
        };
        saveState();
        window.location.href = "rooms.html";
      } catch (error) {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalLabel || t("buttonViewAvailability");
        }
        window.alert(error.message || t("availabilityErrorNote"));
        console.error("Availability search failed", error);
      }
    });
  });
}

async function renderRoomsPage() {
  const roomList = document.querySelector("[data-room-list]");

  if (!roomList) {
    return;
  }

  try {
    const cachedAvailability = state.availability?.stayKey === buildStayKey(state.stay)
      ? state.availability.data
      : null;
    const rooms = cachedAvailability || (await getAvailability(state.stay)).data;

    state.availability = {
      stayKey: buildStayKey(state.stay),
      data: rooms
    };
    saveState();

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

          const optionId = button.dataset.selectRoom;
          const room = rooms.find((item) => item.optionId === optionId);

          if (!room) {
            throw new Error(t("roomSelectionError"));
          }

          state.room = room;
          state.payment = null;
          const bookingResponse = await createBooking({
            roomId: room.id,
            roomIds: room.roomIds,
            guestCount: state.stay.guests,
            startDate: state.stay.checkin,
            endDate: state.stay.checkout
          });

          state.room = {
            ...room,
            name: bookingResponse.data.roomName || room.name,
            capacity: bookingResponse.data.totalCapacity ?? bookingResponse.data.roomCapacity ?? room.totalCapacity ?? room.capacity
          };
          state.booking = bookingResponse.data;
          saveState();
          window.location.href = "booking.html";
        } catch (error) {
          button.disabled = false;
          button.textContent = originalLabel;
          window.alert(error.message || t("roomSelectionError"));
          console.error("Room selection failed", error);
        }
      });
    });
  } catch (error) {
    roomList.innerHTML = `
      <article class="surface-card empty-state">
        <p class="eyebrow">${t("availabilityErrorEyebrow")}</p>
        <h2>${t("availabilityErrorTitle")}</h2>
        <p class="note">${error.message || t("availabilityErrorNote")}</p>
      </article>
    `;
    console.error("Availability load failed", error);
  }
}

function renderBookingPage() {
  const summaryNode = document.querySelector("[data-booking-summary]");
  const form = document.querySelector("[data-guest-form]");
  const guestsDisplay = document.querySelector("[data-booking-guests-display]");

  if (!summaryNode || !form || !guestsDisplay) {
    return;
  }

  if (!state.booking) {
    window.location.href = "index.html";
    return;
  }

  const nights = calculateNights(state.stay.checkin, state.stay.checkout);
  const room = buildRoomSummary(state.room, state.booking);

  summaryNode.innerHTML = `
    <img src="${room.image}" alt="${room.name}">
    <div class="summary-block">
      <p class="eyebrow">${t("selectedRoom")}</p>
      <h2>${room.name}</h2>
      <p>${t("roomCapacityLabel")}: ${formatGuestsCount(room.capacity)}</p>
      ${room.roomCount > 1 ? `<p>${t("roomsIncludedLabel")}: ${room.roomNames.join(", ")}</p>` : ""}
    </div>
    <div class="summary-list">
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
      <span>${formatNights(nights)}</span>
      <span>${formatGuestsCount(state.booking.guestCount ?? state.stay.guests)}</span>
      <span>${t("referenceShort")} ${state.booking.id.slice(0, 8).toUpperCase()}</span>
    </div>
    <div class="summary-total">
      <span>${t("totalStayEstimate")}</span>
      <strong>${formatRate(room.totalRatePerNight)}</strong>
    </div>
    <p class="note">${room.totalRatePerNight != null ? t("pricePerNight") : t("amountPending")}</p>
  `;

  if (state.guest) {
    form.elements.firstName.value = state.guest.firstName || "";
    form.elements.lastName.value = state.guest.lastName || "";
    form.elements.email.value = state.guest.email || "";
  }
  guestsDisplay.textContent = formatGuestsCount(state.booking.guestCount ?? state.stay.guests ?? 2);

  form.onsubmit = async (event) => {
    event.preventDefault();

    const guest = {
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      guests: Number(state.booking.guestCount ?? state.stay.guests ?? 2)
    };

    state.guest = guest;
    state.stay.guests = guest.guests;

    try {
      const bookingUpdate = await updateClientData(state.booking.id, state.booking.token, guest);
      state.booking = bookingUpdate.data;
      const payment = await initiatePayment(state.booking.id, state.booking.token);
      state.payment = payment.data;
      saveState();
      window.location.href = payment.data.paymentUrl;
    } catch (error) {
      window.alert(error.message || t("bookingSubmitError"));
      console.error("Booking submit failed", error);
    }
  };
}

async function renderConfirmationPage() {
  const statusNode = document.querySelector("[data-confirmation-status]");
  const summaryNode = document.querySelector("[data-confirmation-summary]");

  if (!statusNode || !summaryNode || !state.booking) {
    if (statusNode) {
      statusNode.innerHTML = `<div class="empty-state"><h2>${t("emptyFlowTitle")}</h2><p class="note">${t("emptyFlowNote")}</p></div>`;
    }
    return;
  }

  try {
    const bookingState = await getBookingStatus(state.booking.id, state.booking.token);
    const status = bookingState.data.status;
    const nights = calculateNights(state.stay.checkin, state.stay.checkout);
    const room = buildRoomSummary(state.room, bookingState.data);
    const uiStatus = mapBookingStatusToUiState(status);

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
        action: state.payment?.paymentUrl ? t("buttonContinueToPaymentPage") : t("confirmationPendingAction"),
        href: state.payment?.paymentUrl || "booking.html",
        className: "status-pending"
      },
      FAILED: {
        title: t("confirmationFailedTitle"),
        body: t("confirmationFailedBody"),
        action: t("confirmationFailedAction"),
        href: "booking.html",
        className: "status-failed"
      }
    }[uiStatus];

    statusNode.dataset.status = uiStatus;
    statusNode.innerHTML = `
      <div class="status-header">
        <p class="eyebrow">${t("statusLabel")}</p>
        <span class="status-pill ${variantCopy.className}">${variantCopy.title}</span>
        <h2>${variantCopy.title}</h2>
        <p>${variantCopy.body}</p>
      </div>
      <div class="status-meta">
        ${t("bookingReference")} <strong>${state.booking.id.slice(0, 8).toUpperCase()}</strong><br>
        ${t("paymentState")} <strong>${formatPaymentStatus(uiStatus)}</strong>
      </div>
      <div class="status-actions">
        <a href="${variantCopy.href}" class="button button-primary"${state.payment?.paymentUrl && uiStatus === "PENDING" ? ' target="_blank" rel="noreferrer"' : ""}>${variantCopy.action}</a>
      </div>
    `;

    summaryNode.innerHTML = `
      <div class="summary-block">
        <p class="eyebrow">${t("summaryEyebrow")}</p>
        <h2>${room.name}</h2>
        <p>${t("roomCapacityLabel")}: ${formatGuestsCount(room.capacity)}</p>
        ${room.roomCount > 1 ? `<p>${t("roomsIncludedLabel")}: ${room.roomNames.join(", ")}</p>` : ""}
      </div>
      <div class="summary-list">
        <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
        <span>${formatNights(nights)}</span>
        <span>${formatGuestsCount(bookingState.data.guestCount ?? state.stay.guests)}</span>
        <span>${state.guest?.firstName || t("guestFallback")} ${state.guest?.lastName || ""}</span>
      </div>
      <div class="summary-total">
        <span>${t("totalStayEstimate")}</span>
        <strong>${formatRate(room.totalRatePerNight)}</strong>
      </div>
      <p class="note">${t("nextBackendNote")}</p>
    `;
  } catch (error) {
    statusNode.innerHTML = `
      <div class="empty-state">
        <h2>${t("availabilityErrorTitle")}</h2>
        <p class="note">${error.message || t("availabilityErrorNote")}</p>
      </div>
    `;
    summaryNode.innerHTML = "";
    console.error("Confirmation status load failed", error);
  }
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
          <p class="eyebrow">${room.packageOption ? t("packageRoom") : t("singleRoom")}</p>
          <h2>${room.name}</h2>
          <p>${t("roomCapacityLabel")}: ${formatGuestsCount(room.capacity)}</p>
        </div>
        <div class="amenity-tags">
          ${room.roomCount > 1 ? `<span>${t("roomCountLabel")}: ${room.roomCount}</span>` : ""}
          ${room.roomCount > 1 ? `<span>${t("roomsIncludedLabel")}: ${room.roomNames.join(", ")}</span>` : ""}
          <span>${room.availableDates?.length ? t("roomAvailabilityLabel") : t("roomAvailabilityMissingLabel")}</span>
        </div>
        <div class="price-row">
          <div class="price-stack">
            <strong class="price">${formatRate(room.totalRatePerNight)}</strong>
            <span class="note">${room.totalRatePerNight != null ? t("pricePerNight") : t("priceUnavailable")}</span>
          </div>
          <button class="button button-primary" type="button" data-select-room="${room.optionId}">${t("buttonSelectRoom")}</button>
        </div>
      </div>
    </article>
  `;
}

function buildRoomSummary(roomState, bookingState) {
  const roomNames = bookingState?.roomNames?.length
    ? bookingState.roomNames
    : roomState?.roomNames?.length
      ? roomState.roomNames
      : bookingState?.roomName
        ? [bookingState.roomName]
        : roomState?.name
          ? [roomState.name]
          : [t("selectedRoom")];

  return {
    image: roomState?.image || "assets/room-terrace.svg",
    name: bookingState?.roomName || roomState?.name || roomNames.join(" + "),
    capacity: bookingState?.totalCapacity ?? bookingState?.roomCapacity ?? roomState?.totalCapacity ?? roomState?.capacity ?? state.stay.guests,
    roomCount: bookingState?.roomCount ?? roomState?.roomCount ?? roomNames.length,
    roomNames,
    totalRatePerNight: roomState?.totalRatePerNight ?? null
  };
}

function buildStayKey(stay) {
  return [stay.checkin || "", stay.checkout || "", Number(stay.guests || 2)].join("|");
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

function formatRate(value) {
  return value != null ? formatCurrency(Number(value)) : t("priceUnavailable");
}

function formatNights(nights) {
  return `${nights} ${nights > 1 ? t("nights") : t("night")}`;
}

function formatGuestsCount(guests) {
  return `${guests} ${Number(guests) > 1 ? t("guestPlural") : t("guestSingular")}`;
}

function formatPaymentStatus(status) {
  const map = {
    CONFIRMED: t("paymentStatusSuccess"),
    PENDING: t("paymentStatusPending"),
    FAILED: t("paymentStatusFailed")
  };
  return map[status] || status;
}

function mapBookingStatusToUiState(status) {
  if (status === "CONFIRMED") {
    return "CONFIRMED";
  }

  if (status === "FAILED") {
    return "FAILED";
  }

  return "PENDING";
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
