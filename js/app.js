import {
  createBooking,
  getAvailability,
  getBookingStatus,
  initiatePayment,
  updateClientData
} from "./api.js?v=20260522b";
import { THEME_BRAND, THEME_SITE_CONTENT } from "./themes/pursisimpluvama_theme.js?v=20260525a";

const STORAGE_KEY = "aurelia-booking-flow";
const LANGUAGE_KEY = "booking-engine-language";
const AVAILABILITY_CACHE_VERSION = "20260514d";
const DEFAULT_LANGUAGE = "ro";
const CONFIRMATION_POLL_ATTEMPTS = 6;
const CONFIRMATION_POLL_DELAY_MS = 2000;
const FIXED_COUNTRY_NAME = "Romania";
const COMPLIANCE_MODAL_ID = "site-compliance-modal";
const LOCALES = {
  ro: "ro-RO",
  en: "en-US"
};
const PHONE_COUNTRIES = [
  {
    code: "ro",
    dial: "+40",
    flag: "🇷🇴",
    names: {
      ro: "Romania",
      en: "Romania"
    }
  },
  {
    code: "gb",
    dial: "+44",
    flag: "🇬🇧",
    names: {
      ro: "Regatul Unit",
      en: "United Kingdom"
    }
  },
  {
    code: "de",
    dial: "+49",
    flag: "🇩🇪",
    names: {
      ro: "Germania",
      en: "Germany"
    }
  },
  {
    code: "it",
    dial: "+39",
    flag: "🇮🇹",
    names: {
      ro: "Italia",
      en: "Italy"
    }
  },
  {
    code: "fr",
    dial: "+33",
    flag: "🇫🇷",
    names: {
      ro: "Franta",
      en: "France"
    }
  },
  {
    code: "us",
    dial: "+1",
    flag: "🇺🇸",
    names: {
      ro: "Statele Unite",
      en: "United States"
    }
  }
];
const DEFAULT_PHONE_COUNTRY = "ro";
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
    labelGuests: "Persoane",
    guestCounterDecrease: "Reduce numarul de persoane",
    guestCounterIncrease: "Creste numarul de persoane",
    labelFirstName: "Prenume",
    labelLastName: "Nume",
    labelEmail: "Email",
    labelPhoneCountry: "Tara / prefix",
    labelMobilePhoneNumber: "Numar de telefon",
    labelCity: "Oras",
    labelCountry: "Tara",
    labelState: "Judet",
    labelPostalCode: "Cod postal",
    labelAddressDetails: "Adresa",
    guests1: "1 persoana",
    guests2: "2 persoane",
    guests3: "3 persoane",
    guests4: "4 persoane",
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
    roomsFooterDescription: "Ecran alternativ de listare a camerelor pentru persoanele care ajung direct pe ruta de camere.",
    roomsFooterItem1: "Tarif total pentru sejur",
    roomsFooterItem2: "Selectie in functie de capacitate",
    roomsFooterItem3: "Pasi de rezervare accesibili",
    bookingEyebrow: "Detalii persoana",
    bookingTitle: "Completeaza detaliile rezervarii.",
    bookingLead: "Camera selectata si rezumatul perioadei de cazare raman vizibile pe masura ce clientul continua catre plata.",
    bookingFormEyebrow: "Persoana principala",
    bookingFormTitle: "Informatii client",
    buttonContinuePayment: "Continua catre plata",
    bookingFooterDescription: "Flux de date pentru client pregatit pentru actualizari backend pe baza de token si initierea platii.",
    bookingFooterItem1: "Etichete accesibile pentru formular",
    bookingFooterItem2: "Progres salvat",
    bookingFooterItem3: "Pas urmator pregatit pentru confirmare",
    confirmationEyebrow: "Status rezervare",
    confirmationTitle: "Rezumatul rezervarii tale, disponibil imediat.",
    confirmationLead: "Verifica statusul rezervarii, plata si detaliile finale ale sejurului.",
    confirmationFooterDescription: "Ecran de status al rezervarii conceput pentru preluare dupa plata si pentru claritate in fata clientului.",
    confirmationFooterItem1: "Referinta vizibila",
    confirmationFooterItem2: "Variante pentru starea platii",
    confirmationFooterItem3: "Actiuni clare pentru pasul urmator",
    noMatchEyebrow: "Nicio camera disponibila",
    noMatchTitle: "Backendul nu a returnat camere disponibile in acest moment.",
    noMatchNote: "Verifica datele din BookingOrchestratorAPI sau inventarul configurat pentru camere.",
    availabilityErrorEyebrow: "Disponibilitatea nu poate fi incarcata",
    availabilityErrorTitle: "Nu am putut prelua camerele disponibile acum.",
    availabilityErrorNote: "Te rugam sa incerci din nou in cateva momente.",
    preparingRoom: "Se pregateste...",
    roomSelectionError: "Nu am putut pregati aceasta camera acum. Te rugam sa incerci din nou.",
    bookingSubmitError: "Nu am putut continua rezervarea acum. Te rugam sa incerci din nou.",
    bookingPhoneRequired: "Introdu un numar de telefon valid pentru a continua.",
    emptyFlowTitle: "Nicio rezervare selectata",
    emptyFlowNote: "Porneste din pagina principala de rezervare pentru a crea un flux de rezervare.",
    statusLabel: "Status",
    confirmationSuccessTitle: "Rezervare confirmata",
    confirmationSuccessBody: "Plata a fost finalizata cu succes, iar rezervarea ta este securizata.",
    confirmationSuccessAction: "Inapoi la pagina principala",
    confirmationPendingTitle: "Plata in asteptare",
    confirmationPendingBody: "Camera ramane rezervata in timp ce statusul platii este finalizat.",
    confirmationPendingAction: "Revino la rezervare",
    confirmationSyncTitle: "Verificam statusul platii",
    confirmationSyncBody: "Te rugam sa astepti cateva secunde cat confirmam raspunsul procesatorului.",
    confirmationFailedTitle: "Plata a esuat",
    confirmationFailedBody: "Selectia camerei ramane vizibila pentru ca persoana sa poata incerca din nou sau sa actualizeze datele.",
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
    nextBackendNote: "Statusul rezervarii este preluat din backend si se actualizeaza automat cat timp raspunsul platii este in curs de confirmare.",
    guestFallback: "Persoana",
    roomBadgeUpTo: "Pana la {count} persoane",
    premiumRoom: "Camera disponibila",
    packageRoom: "Pachet de camere",
    singleRoom: "Camera individuala",
    roomCapacityLabel: "Capacitate",
    roomsIncludedLabel: "Camere incluse",
    roomCountLabel: "Numar camere",
    roomAvailabilityLabel: "Disponibila pentru perioada selectata",
    roomAvailabilityMissingLabel: "Disponibilitate primita din backend",
    priceUnavailable: "Tarif disponibil in pasul urmator",
    priceForStay: "pentru intreaga perioada de cazare",
    buttonSelectRoom: "Selecteaza camera",
    staySummaryTitle: "Perioada selectata",
    fromToSeparator: "pana la",
    nights: "nopti",
    night: "noapte",
    guestSingular: "persoana",
    guestPlural: "persoane",
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
    labelGuests: "People",
    guestCounterDecrease: "Decrease people count",
    guestCounterIncrease: "Increase people count",
    labelFirstName: "First name",
    labelLastName: "Last name",
    labelEmail: "Email",
    labelPhoneCountry: "Country / dial code",
    labelMobilePhoneNumber: "Phone number",
    labelCity: "City",
    labelCountry: "Country",
    labelState: "State",
    labelPostalCode: "Postal code",
    labelAddressDetails: "Address",
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
    roomsFooterItem1: "Total stay pricing",
    roomsFooterItem2: "Capacity-aware selection",
    roomsFooterItem3: "Accessible booking steps",
    bookingEyebrow: "Person details",
    bookingTitle: "Complete your booking details.",
    bookingLead: "The selected room and stay summary remain visible while the client continues toward payment.",
    bookingFormEyebrow: "Primary person",
    bookingFormTitle: "Client information",
    buttonContinuePayment: "Continue to payment",
    bookingFooterDescription: "Client details flow prepared for token-based backend updates and payment initiation.",
    bookingFooterItem1: "Accessible form labels",
    bookingFooterItem2: "Saved progress",
    bookingFooterItem3: "Confirmation-ready next step",
    confirmationEyebrow: "Reservation status",
    confirmationTitle: "Your booking summary, ready at a glance.",
    confirmationLead: "Review booking status, payment, and final stay details.",
    confirmationFooterDescription: "Booking status screen designed for post-payment retrieval and guest reassurance.",
    confirmationFooterItem1: "Reference visibility",
    confirmationFooterItem2: "Payment state variants",
    confirmationFooterItem3: "Action-oriented follow-up",
    noMatchEyebrow: "No rooms available",
    noMatchTitle: "The backend did not return any available rooms right now.",
    noMatchNote: "Check the data in BookingOrchestratorAPI or the configured room inventory.",
    availabilityErrorEyebrow: "Availability unavailable",
    availabilityErrorTitle: "We couldn't load available rooms right now.",
    availabilityErrorNote: "Please try again in a few moments.",
    preparingRoom: "Preparing...",
    roomSelectionError: "We couldn't prepare this room right now. Please try again.",
    bookingSubmitError: "We couldn't continue the booking right now. Please try again.",
    bookingPhoneRequired: "Enter a valid phone number to continue.",
    emptyFlowTitle: "No booking selected",
    emptyFlowNote: "Start from the main booking page to create a booking flow.",
    statusLabel: "Status",
    confirmationSuccessTitle: "Booking confirmed",
    confirmationSuccessBody: "Payment completed successfully and your reservation is secured.",
    confirmationSuccessAction: "Return to home",
    confirmationPendingTitle: "Payment pending",
    confirmationPendingBody: "Your room is still reserved while the payment status is being finalized.",
    confirmationPendingAction: "Review booking",
    confirmationSyncTitle: "We're checking the payment status",
    confirmationSyncBody: "Please wait a few seconds while we confirm the processor response.",
    confirmationFailedTitle: "Payment failed",
    confirmationFailedBody: "The room selection remains visible so the person can retry or update details.",
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
    nextBackendNote: "The booking status comes from the backend and refreshes automatically while the payment response is still being confirmed.",
    guestFallback: "Person",
    roomBadgeUpTo: "Up to {count} people",
    premiumRoom: "Available room",
    packageRoom: "Room package",
    singleRoom: "Single room",
    roomCapacityLabel: "Capacity",
    roomsIncludedLabel: "Included rooms",
    roomCountLabel: "Room count",
    roomAvailabilityLabel: "Available for the selected stay",
    roomAvailabilityMissingLabel: "Availability received from backend",
    priceUnavailable: "Rate available in the next step",
    priceForStay: "for the full accommodation period",
    buttonSelectRoom: "Select room",
    staySummaryTitle: "Selected stay",
    fromToSeparator: "to",
    nights: "nights",
    night: "night",
    guestSingular: "person",
    guestPlural: "people",
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
  applyThemeBrand();
  renderComplianceFooter();
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

function applyThemeBrand() {
  document.querySelectorAll("[data-theme-brand-name]").forEach((node) => {
    node.textContent = THEME_BRAND.hotelName;
  });

  document.querySelectorAll("[data-theme-brand-mark]").forEach((node) => {
    node.textContent = THEME_BRAND.hotelMark;
  });
}

function renderComplianceFooter() {
  const footerNodes = document.querySelectorAll(".footer-minimal");

  if (!footerNodes.length) {
    return;
  }

  const complianceCopy = getComplianceCopy();
  const company = THEME_SITE_CONTENT.company;
  const footerMarkup = complianceFooterTemplate(complianceCopy, company);

  footerNodes.forEach((footer) => {
    footer.removeAttribute("aria-hidden");
    footer.innerHTML = footerMarkup;
  });

  wireComplianceFooter();
  mountNetopiaLogo();
}

function getComplianceCopy() {
  return THEME_SITE_CONTENT.compliance[currentLanguage] || THEME_SITE_CONTENT.compliance[DEFAULT_LANGUAGE];
}

function complianceFooterTemplate(copy, company) {
  return `
    <div class="compliance-footer">
      <div class="compliance-footer__top">
        <div class="compliance-footer__intro">
          <p class="eyebrow">${copy.footerEyebrow}</p>
          <h2>${copy.footerTitle}</h2>
          <p class="note">${copy.footerLead}</p>
          <div class="compliance-footer__actions">
            ${copy.footerLinks.map((link) => `
              <button class="compliance-link" type="button" data-compliance-open="${link.id}">${link.label}</button>
            `).join("")}
          </div>
        </div>
        <div class="compliance-footer__aside">
          <div class="compliance-payment-block">
            <span class="compliance-payment-block__label">${copy.securePaymentsLabel}</span>
            <div class="compliance-payment-block__mark" data-netopia-logo>
              <span class="compliance-payment-block__fallback">${THEME_SITE_CONTENT.netopia.fallbackLabel[currentLanguage] || THEME_SITE_CONTENT.netopia.fallbackLabel[DEFAULT_LANGUAGE]}</span>
            </div>
          </div>
          <div class="compliance-badges-block">
            <span class="compliance-company-block__label">${copy.consumerProtectionLabel}</span>
            <div class="compliance-badges">
              ${THEME_SITE_CONTENT.anpc.map((badge) => renderComplianceBadge(badge)).join("")}
            </div>
          </div>
          <div class="compliance-company-block">
            <span class="compliance-company-block__label">${copy.companySummaryLabel}</span>
            <strong>${escapeHtml(company.name)}</strong>
            <span>CUI ${escapeHtml(company.taxId)} · ${escapeHtml(company.tradeRegisterNumber)}</span>
            <span>${escapeHtml(company.address)}</span>
            <div class="compliance-company-block__contacts">
              <a href="tel:${escapeAttribute(company.phone)}">${escapeHtml(company.phone)}</a>
              <a href="mailto:${escapeAttribute(company.email)}">${escapeHtml(company.email)}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="compliance-modal" id="${COMPLIANCE_MODAL_ID}" data-compliance-modal hidden>
      <div class="compliance-modal__backdrop" data-compliance-close></div>
      <div class="compliance-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="${COMPLIANCE_MODAL_ID}-title">
        <header class="compliance-modal__header">
          <div>
            <p class="eyebrow">${copy.footerEyebrow}</p>
            <h2 id="${COMPLIANCE_MODAL_ID}-title">${copy.modalTitle}</h2>
          </div>
          <button class="compliance-modal__close" type="button" data-compliance-close aria-label="${copy.modalClose}">${copy.modalClose}</button>
        </header>
        <nav class="compliance-modal__nav" aria-label="${copy.modalTitle}">
          ${copy.footerLinks.map((link) => `
            <button class="compliance-modal__nav-button" type="button" data-compliance-nav="${link.id}">${link.label}</button>
          `).join("")}
        </nav>
        <div class="compliance-modal__body">
          ${copy.sections.map((section) => renderComplianceSection(section)).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderComplianceBadge(badge) {
  const alt = badge.alt?.[currentLanguage] || badge.alt?.[DEFAULT_LANGUAGE] || "";

  return `
    <a class="compliance-badge-link" href="${escapeAttribute(badge.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttribute(alt)}">
      <img class="compliance-badge-image" src="${escapeAttribute(badge.asset)}" alt="${escapeAttribute(alt)}" loading="lazy">
    </a>
  `;
}

function renderComplianceSection(section) {
  return `
    <section class="compliance-section" data-compliance-section="${section.id}" tabindex="-1">
      <h3>${section.title}</h3>
      ${(section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
      ${(section.bullets || []).length ? `
        <ul class="compliance-list">
          ${(section.bullets || []).map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}

function wireComplianceFooter() {
  const modal = document.querySelector("[data-compliance-modal]");

  if (!modal) {
    return;
  }

  document.querySelectorAll("[data-compliance-open]").forEach((button) => {
    button.addEventListener("click", () => openComplianceModal(modal, button.dataset.complianceOpen));
  });

  modal.querySelectorAll("[data-compliance-nav]").forEach((button) => {
    button.addEventListener("click", () => scrollComplianceSection(modal, button.dataset.complianceNav));
  });

  modal.querySelectorAll("[data-compliance-close]").forEach((button) => {
    button.addEventListener("click", () => closeComplianceModal(modal));
  });

  if (!window.__complianceModalKeydownBound) {
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }

      const visibleModal = document.querySelector("[data-compliance-modal]:not([hidden])");
      if (visibleModal) {
        closeComplianceModal(visibleModal);
      }
    });
    window.__complianceModalKeydownBound = true;
  }
}

function openComplianceModal(modal, sectionId) {
  modal.hidden = false;
  document.body.classList.add("modal-open");
  scrollComplianceSection(modal, sectionId || getComplianceCopy().footerLinks[0].id, false);
  requestAnimationFrame(() => modal.classList.add("is-visible"));
}

function closeComplianceModal(modal) {
  modal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    if (!modal.classList.contains("is-visible")) {
      modal.hidden = true;
    }
  }, 140);
}

function scrollComplianceSection(modal, sectionId, smooth = true) {
  setActiveComplianceNav(modal, sectionId);
  const section = modal.querySelector(`[data-compliance-section="${sectionId}"]`);
  if (!section) {
    return;
  }

  section.focus({ preventScroll: true });
  section.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

function setActiveComplianceNav(modal, sectionId) {
  modal.querySelectorAll("[data-compliance-nav]").forEach((button) => {
    const isActive = button.dataset.complianceNav === sectionId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function mountNetopiaLogo() {
  const containers = document.querySelectorAll("[data-netopia-logo]");
  const netopia = THEME_SITE_CONTENT.netopia;

  containers.forEach((container, index) => {
    renderNetopiaLogo(container, netopia, index);
  });
}

function renderNetopiaLogo(container, netopia, index) {
  const version = netopia.version === "vertical" ? "vertical" : "horizontal";
  const contrastColor = netopia.contrastColor || "#ffffff";
  const logoColor = getNetopiaLogoColor(contrastColor);
  const logoIndex = version === "vertical" ? 1 : 0;
  const fallbackLabel = netopia.fallbackLabel[currentLanguage] || netopia.fallbackLabel[DEFAULT_LANGUAGE];
  const logoUrl = `https://mny.ro/np-${logoColor}-${logoIndex}.svg`;

  container.innerHTML = `
    <a class="compliance-payment-block__logo-link" href="https://netopia-payments.com/" target="_blank" rel="noopener noreferrer" aria-label="${fallbackLabel}">
      <span class="compliance-payment-block__logo-shell compliance-payment-block__logo-shell--${version}" data-netopia-shell="${index}">
        <img class="compliance-payment-block__logo-image" src="${logoUrl}" alt="${fallbackLabel}" loading="lazy">
      </span>
    </a>
  `;

  const shell = container.querySelector(`[data-netopia-shell="${index}"]`);
  const image = container.querySelector(".compliance-payment-block__logo-image");

  if (shell) {
    shell.style.backgroundColor = needsNetopiaContrastPlate(contrastColor)
      ? getNetopiaContrastPlate(contrastColor)
      : "transparent";
  }

  if (image) {
    image.addEventListener("error", () => {
      container.innerHTML = `<span class="compliance-payment-block__fallback">${fallbackLabel}</span>`;
    }, { once: true });
  }
}

function needsNetopiaContrastPlate(color) {
  return getColorDistance(color, "#EB001B") < 0.25 || getColorDistance(color, "#F79E1B") < 0.25;
}

function getNetopiaContrastPlate(color) {
  return getColorBrightness(color) > 166 ? "#ffffff80" : "#00000080";
}

function getNetopiaLogoColor(color) {
  return getColorBrightness(color) > 166 ? "black" : "white";
}

function getColorDistance(colorOne, colorTwo) {
  const [redOne, greenOne, blueOne] = getRgbColor(colorOne);
  const [redTwo, greenTwo, blueTwo] = getRgbColor(colorTwo);
  const distance = Math.sqrt(
    Math.pow(redTwo - redOne, 2) +
    Math.pow(greenTwo - greenOne, 2) +
    Math.pow(blueTwo - blueOne, 2)
  );

  return distance / Math.sqrt(Math.pow(255, 2) * 3);
}

function getColorBrightness(color) {
  const [red, green, blue] = getRgbColor(color);
  return Math.sqrt(0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue));
}

function getRgbColor(color) {
  if (String(color).match(/^rgb/)) {
    const match = String(color).match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    if (match) {
      return [Number(match[1]), Number(match[2]), Number(match[3])];
    }
  }

  const expandedHex = String(color || "#000000")
    .replace(/^#/, "")
    .replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3");
  const hexNumber = Number(`0x${expandedHex}`);

  return [
    (hexNumber >> 16) & 255,
    (hexNumber >> 8) & 255,
    hexNumber & 255
  ];
}

function describeRoom(room) {
  const roomNames = room.roomNames?.length ? room.roomNames : [room.name];
  const roomCount = Number(room.roomCount || roomNames.length || 1);

  if (roomCount > 1) {
    const labels = roomNames
      .map((name) => normalizeRoomName(name))
      .filter(Boolean)
      .join(currentLanguage === "ro" ? ", " : ", ");

    return currentLanguage === "ro"
      ? `Pachet de ${roomCount} camere pentru grupuri, compus din: ${labels}.`
      : `Package of ${roomCount} rooms for groups, made up of: ${labels}.`;
  }

  const matchedRoom = resolveRoomDescription(room.name || roomNames[0]);
  return matchedRoom?.description?.[currentLanguage] || matchedRoom?.description?.[DEFAULT_LANGUAGE] || "";
}

function resolveRoomDescription(roomName) {
  const normalizedName = normalizeRoomName(roomName).toLowerCase();
  return THEME_SITE_CONTENT.roomDescriptions.find((entry) => normalizedName.includes(entry.match));
}

function normalizeRoomName(roomName) {
  return String(roomName || "").replaceAll(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

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
        ro: "Confirma camera selectata, completeaza datele clientului si continua catre plata securizata.",
        en: "Confirm the selected room, enter client details, and continue toward secure payment."
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
      applyThemeBrand();
      renderComplianceFooter();
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
    display.textContent = safeValue;
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
          version: AVAILABILITY_CACHE_VERSION,
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
        window.alert(t("availabilityErrorNote"));
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
    const cachedAvailability = isCurrentAvailabilityCache(state.availability, state.stay)
      ? state.availability.data
      : null;
    const rooms = cachedAvailability || (await getAvailability(state.stay)).data;

    state.availability = {
      version: AVAILABILITY_CACHE_VERSION,
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
            capacity: bookingResponse.data.totalCapacity ?? bookingResponse.data.roomCapacity ?? room.totalCapacity ?? room.capacity,
            totalRateForStay: room.totalRateForStay ?? null
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
        <p class="note">${t("availabilityErrorNote")}</p>
      </article>
    `;
    console.error("Availability load failed", error);
  }
}

function renderBookingPage() {
  const summaryNode = document.querySelector("[data-booking-summary]");
  const form = document.querySelector("[data-guest-form]");
  const guestsDisplay = document.querySelector("[data-booking-guests-display]");
  const feedbackNode = document.querySelector("[data-guest-form-feedback]");

  if (!summaryNode || !form || !guestsDisplay || !feedbackNode) {
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
      ${room.description ? `<p class="room-description">${room.description}</p>` : ""}
      <p>${t("roomCapacityLabel")}: ${formatGuestsCount(room.capacity)}</p>
      ${room.roomCount > 1 ? `<p>${t("roomsIncludedLabel")}: ${room.roomNames.join(", ")}</p>` : ""}
    </div>
    <div class="summary-list">
      <span>${formatStayRange(state.stay.checkin, state.stay.checkout)}</span>
      <span>${formatNights(nights)}</span>
      <span>${formatGuestsCount(state.booking.guestCount ?? state.stay.guests)}</span>
    </div>
    <div class="summary-total">
      <span>${t("totalStayEstimate")}</span>
      <strong>${formatRate(room.totalRateForStay)}</strong>
    </div>
    <p class="note">${room.totalRateForStay != null ? t("priceForStay") : t("amountPending")}</p>
  `;

  const countrySelect = form.elements.phoneCountry;
  const phoneInput = form.elements.mobilePhoneNumber;
  const initialGuest = {
    ...guestFromBooking(state.booking),
    ...(state.guest || {})
  };
  const initialPhoneValue = initialGuest.mobilePhoneNumber || "";
  const initialCountry = initialGuest.phoneCountry || detectPhoneCountry(initialPhoneValue) || DEFAULT_PHONE_COUNTRY;

  countrySelect.innerHTML = PHONE_COUNTRIES.map((country) => `
    <option value="${country.code}">${country.flag} ${country.names[currentLanguage] || country.names[DEFAULT_LANGUAGE]} (${country.dial})</option>
  `).join("");
  countrySelect.value = initialCountry;
  countrySelect.dataset.currentDial = getPhoneCountry(initialCountry).dial;

  form.elements.firstName.value = initialGuest.firstName || "";
  form.elements.lastName.value = initialGuest.lastName || "";
  form.elements.email.value = initialGuest.email || "";
  form.elements.city.value = initialGuest.city || "";
  form.elements.countryName.value = FIXED_COUNTRY_NAME;
  form.elements.state.value = initialGuest.state || "";
  form.elements.postalCode.value = initialGuest.postalCode || "";
  form.elements.addressDetails.value = initialGuest.addressDetails || "";
  phoneInput.value = initialPhoneValue || withPhonePrefix(getPhoneCountry(initialCountry).dial);

  guestsDisplay.textContent = formatGuestsCount(state.booking.guestCount ?? state.stay.guests ?? 2);

  countrySelect.onchange = () => {
    const nextCountry = getPhoneCountry(countrySelect.value);
    applyPhonePrefix(phoneInput, countrySelect.dataset.currentDial, nextCountry.dial);
    countrySelect.dataset.currentDial = nextCountry.dial;
    phoneInput.setCustomValidity("");
    clearFormFeedback(feedbackNode);
    persistGuestDraft(form);
  };

  [
    form.elements.firstName,
    form.elements.lastName,
    form.elements.email,
    phoneInput,
    form.elements.city,
    form.elements.countryName,
    form.elements.state,
    form.elements.postalCode,
    form.elements.addressDetails
  ].forEach((field) => {
    field.oninput = () => {
      phoneInput.setCustomValidity("");
      clearFormFeedback(feedbackNode);
      persistGuestDraft(form);
    };
  });

  form.onsubmit = async (event) => {
    event.preventDefault();
    clearFormFeedback(feedbackNode);

    const selectedCountry = getPhoneCountry(countrySelect.value);
    const mobilePhoneNumber = phoneInput.value.trim();

    if (!hasPhoneSubscriberNumber(mobilePhoneNumber, selectedCountry.dial)) {
      phoneInput.setCustomValidity(t("bookingPhoneRequired"));
    } else {
      phoneInput.setCustomValidity("");
    }

    if (!form.reportValidity()) {
      const invalidField = Array.from(form.elements).find((field) => typeof field.checkValidity === "function" && !field.checkValidity());
      setFormFeedback(feedbackNode, invalidField?.validationMessage || t("bookingSubmitError"));
      return;
    }

    const guest = {
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      phoneCountry: selectedCountry.code,
      mobilePhoneNumber,
      city: form.elements.city.value.trim(),
      countryName: FIXED_COUNTRY_NAME,
      state: form.elements.state.value.trim(),
      postalCode: form.elements.postalCode.value.trim(),
      addressDetails: form.elements.addressDetails.value.trim(),
      guests: Number(state.booking.guestCount ?? state.stay.guests ?? 2)
    };

    state.guest = guest;
    state.stay.guests = guest.guests;
    saveState();

    try {
      const bookingUpdate = await updateClientData(state.booking.id, state.booking.token, guest);
      state.booking = bookingUpdate.data;
      const payment = await initiatePayment(state.booking.id, state.booking.token);
      state.payment = payment.data;
      saveState();
      window.location.href = payment.data.paymentUrl;
    } catch (error) {
      setFormFeedback(feedbackNode, error.message || t("bookingSubmitError"));
      console.error("Booking submit failed", error);
    }
  };
}

function getPhoneCountry(code) {
  return PHONE_COUNTRIES.find((country) => country.code === code) || PHONE_COUNTRIES[0];
}

function detectPhoneCountry(value) {
  const phone = String(value || "").trim();
  return PHONE_COUNTRIES.find((country) => phone.startsWith(country.dial))?.code || null;
}

function withPhonePrefix(prefix) {
  return `${prefix} `;
}

function normalizePhoneValue(value) {
  return String(value || "").replaceAll(/\s+/g, " ").trim();
}

function hasPhoneSubscriberNumber(value, prefix) {
  const normalized = normalizePhoneValue(value);
  if (!normalized) {
    return false;
  }

  const compactValue = normalized.replaceAll(/[\s()-]/g, "");
  const compactPrefix = String(prefix || "").replaceAll(/[\s()-]/g, "");

  return compactValue.length > compactPrefix.length;
}

function applyPhonePrefix(input, previousPrefix, nextPrefix) {
  const currentValue = normalizePhoneValue(input.value);

  if (!currentValue || currentValue === previousPrefix) {
    input.value = withPhonePrefix(nextPrefix);
    return;
  }

  const compactValue = currentValue.replaceAll(/[\s()-]/g, "");
  const compactPrefix = String(previousPrefix || "").replaceAll(/[\s()-]/g, "");
  if (compactValue === compactPrefix) {
    input.value = withPhonePrefix(nextPrefix);
  }
}

function setFormFeedback(node, message) {
  if (!node) {
    return;
  }

  node.hidden = !message;
  node.textContent = message || "";
}

function clearFormFeedback(node) {
  if (!node) {
    return;
  }

  node.hidden = true;
  node.textContent = "";
}

function persistGuestDraft(form) {
  if (!form) {
    return;
  }

  state.guest = {
    ...(state.guest || {}),
    firstName: form.elements.firstName.value.trim(),
    lastName: form.elements.lastName.value.trim(),
    email: form.elements.email.value.trim(),
    phoneCountry: form.elements.phoneCountry.value,
    mobilePhoneNumber: form.elements.mobilePhoneNumber.value.trim(),
    city: form.elements.city.value.trim(),
    countryName: FIXED_COUNTRY_NAME,
    state: form.elements.state.value.trim(),
    postalCode: form.elements.postalCode.value.trim(),
    addressDetails: form.elements.addressDetails.value.trim(),
    guests: Number(state.booking?.guestCount ?? state.stay.guests ?? 2)
  };
  saveState();
}

async function renderConfirmationPage() {
  const statusNode = document.querySelector("[data-confirmation-status]");
  const summaryNode = document.querySelector("[data-confirmation-summary]");
  const bookingContext = syncBookingContextFromUrl();

  if (!statusNode || !summaryNode || !bookingContext) {
    if (statusNode) {
      statusNode.innerHTML = `<div class="empty-state"><h2>${t("emptyFlowTitle")}</h2><p class="note">${t("emptyFlowNote")}</p></div>`;
    }
    return;
  }

  statusNode.dataset.status = "PENDING";
  statusNode.innerHTML = `
    <div class="status-header">
      <p class="eyebrow">${t("statusLabel")}</p>
      <span class="status-pill status-pending">${t("confirmationSyncTitle")}</span>
      <h2>${t("confirmationSyncTitle")}</h2>
      <p>${t("confirmationSyncBody")}</p>
    </div>
  `;
  summaryNode.innerHTML = "";

  try {
    const bookingState = await getBookingStatusWithRetry(bookingContext.id, bookingContext.token);
    const status = bookingState.data.status;
    const stay = {
      checkin: bookingState.data.startDate || state.stay.checkin,
      checkout: bookingState.data.endDate || state.stay.checkout,
      guests: Number(bookingState.data.guestCount ?? state.stay.guests ?? 2)
    };
    const nights = calculateNights(stay.checkin, stay.checkout);
    const room = buildRoomSummary(state.room, bookingState.data);
    const guest = {
      ...guestFromBooking(bookingState.data),
      ...(state.guest || {})
    };
    const uiStatus = mapBookingStatusToUiState(status);

    state.stay = stay;
    state.booking = {
      ...(state.booking || {}),
      ...bookingState.data,
      id: bookingState.data.id || bookingContext.id,
      token: bookingContext.token
    };
    state.guest = {
      ...(state.guest || {}),
      ...guest
    };
    saveState();

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
        ${room.description ? `<p class="room-description">${room.description}</p>` : ""}
        <p>${t("roomCapacityLabel")}: ${formatGuestsCount(room.capacity)}</p>
        ${room.roomCount > 1 ? `<p>${t("roomsIncludedLabel")}: ${room.roomNames.join(", ")}</p>` : ""}
      </div>
      <div class="summary-list">
        <span>${formatStayRange(stay.checkin, stay.checkout)}</span>
        <span>${formatNights(nights)}</span>
        <span>${formatGuestsCount(stay.guests)}</span>
        <span>${guest.firstName || t("guestFallback")} ${guest.lastName || ""}</span>
      </div>
      <div class="summary-total">
        <span>${t("totalStayEstimate")}</span>
        <strong>${formatRate(room.totalRateForStay)}</strong>
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
  const description = describeRoom(room);

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
          ${description ? `<p class="room-description">${description}</p>` : ""}
          <p>${t("roomCapacityLabel")}: ${formatGuestsCount(room.capacity)}</p>
        </div>
        <div class="amenity-tags">
          ${room.roomCount > 1 ? `<span>${t("roomCountLabel")}: ${room.roomCount}</span>` : ""}
          ${room.roomCount > 1 ? `<span>${t("roomsIncludedLabel")}: ${room.roomNames.join(", ")}</span>` : ""}
          <span>${t("roomAvailabilityLabel")}</span>
        </div>
        <div class="price-row">
          <div class="price-stack">
            <strong class="price">${formatRate(room.totalRateForStay)}</strong>
            <span class="note">${room.totalRateForStay != null ? t("priceForStay") : t("priceUnavailable")}</span>
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

  const summary = {
    image: roomState?.image || "assets/room-terrace.svg",
    name: bookingState?.roomName || roomState?.name || roomNames.join(" + "),
    capacity: bookingState?.totalCapacity ?? bookingState?.roomCapacity ?? roomState?.totalCapacity ?? roomState?.capacity ?? state.stay.guests,
    roomCount: bookingState?.roomCount ?? roomState?.roomCount ?? roomNames.length,
    roomNames,
    totalRateForStay: bookingState?.totalRateForStay ?? roomState?.totalRateForStay ?? null
  };

  return {
    ...summary,
    description: describeRoom(summary)
  };
}

function guestFromBooking(booking) {
  if (!booking) {
    return {};
  }

  return {
    firstName: booking.clientFirstName || "",
    lastName: booking.clientLastName || "",
    email: booking.clientEmail || "",
    mobilePhoneNumber: booking.clientPhoneNumber || "",
    phoneCountry: detectPhoneCountry(booking.clientPhoneNumber || "") || DEFAULT_PHONE_COUNTRY,
    city: booking.clientCity || "",
    countryName: booking.clientCountryName || FIXED_COUNTRY_NAME,
    state: booking.clientState || "",
    postalCode: booking.clientPostalCode || "",
    addressDetails: booking.clientAddressDetails || "",
    guests: Number(booking.guestCount ?? state.stay.guests ?? 2)
  };
}

function syncBookingContextFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get("bookingId");
  const token = params.get("token");

  if (bookingId && token) {
    state.booking = {
      ...(state.booking || {}),
      id: bookingId,
      token
    };
    saveState();
  }

  return state.booking;
}

async function getBookingStatusWithRetry(bookingId, token) {
  let latestResponse = null;

  for (let attempt = 0; attempt < CONFIRMATION_POLL_ATTEMPTS; attempt += 1) {
    latestResponse = await getBookingStatus(bookingId, token);

    if (mapBookingStatusToUiState(latestResponse.data.status) !== "PENDING") {
      return latestResponse;
    }

    if (attempt < CONFIRMATION_POLL_ATTEMPTS - 1) {
      await wait(CONFIRMATION_POLL_DELAY_MS);
    }
  }

  return latestResponse;
}

function buildStayKey(stay) {
  return [stay.checkin || "", stay.checkout || "", Number(stay.guests || 2)].join("|");
}

function isCurrentAvailabilityCache(availability, stay) {
  if (!availability || availability.version !== AVAILABILITY_CACHE_VERSION) {
    return false;
  }

  if (availability.stayKey !== buildStayKey(stay)) {
    return false;
  }

  return Array.isArray(availability.data)
    && availability.data.every((room) => Object.hasOwn(room || {}, "totalRateForStay"));
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
    currency: "RON",
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

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
