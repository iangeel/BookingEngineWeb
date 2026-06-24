import {
  adminLogin,
  createAdminBooking,
  createAdminRoom,
  deleteAdminBooking,
  deleteAdminRoom,
  getAdminAvailableRooms,
  getAdminBooking,
  getAdminBookings,
  getAdminRooms,
  isAdminUnauthorizedError,
  updateAdminBooking,
  updateAdminRoom
} from "./api.js?v=20260624a";
import { THEME_BRAND } from "./themes/pursisimpluvama_theme.js?v=20260531a";

const LANGUAGE_KEY = "booking-engine-language";
const ADMIN_AUTH_KEY = "booking-engine-admin-auth";
const ADMIN_WINDOW_NAME_KEY = "bookingEngineAdminAuth";
const ADMIN_HASH_KEY = "adminAuth";
const ADMIN_COOKIE_KEY = "bookingEngineAdminAuth";
const DEFAULT_LANGUAGE = "ro";
const LOCALES = {
  ro: "ro-RO",
  en: "en-US"
};
const TRANSLATIONS = {
  ro: {
    brandName: "Booking Engine",
    brandTagline: "Flux direct de rezervare",
    navPublic: "Frontend public",
    navAdmin: "Administrare",
    navAdminPanel: "Panou administrativ",
    languageLabel: "Limba",
    loginEyebrow: "Autentificare",
    loginTitle: "Conectare administrator",
    labelUsername: "Utilizator",
    labelPassword: "Parola",
    buttonLogin: "Conectare",
    buttonLoggingIn: "Se conecteaza...",
    adminLoginFooterDescription: "Zona de login pentru administratorii care acceseaza panoul operational.",
    adminPanelFooterDescription: "Panoul administrativ afiseaza rezervarile si deschide fluxuri de creare sau editare prin ferestre dedicate.",
    adminLoginFooterItem1: "Autentificare JWT",
    adminLoginFooterItem2: "Acces securizat",
    adminLoginFooterItem3: "Intrare catre panoul administrativ",
    adminPanelFooterItem1: "Autentificare JWT",
    adminPanelFooterItem2: "Tabel rezervari ordonat dupa startDate",
    adminPanelFooterItem3: "Ferestre dedicate pentru creare si editare",
    roomsTab: "Camere",
    bookingsTab: "Rezervari",
    sessionUnknown: "Sesiune activa",
    sessionUntil: "Expira la {value}",
    buttonRefresh: "Reincarca",
    buttonLogout: "Deconectare",
    buttonCreateRoom: "Creeaza camera",
    buttonCreateBooking: "Creeaza rezervare",
    buttonSaveRoom: "Salveaza camera",
    buttonAddRatePeriod: "Adauga perioada",
    buttonRemoveRatePeriod: "Sterge perioada",
    buttonSaveBooking: "Salveaza rezervarea",
    buttonSavingRoom: "Se salveaza...",
    buttonSavingBooking: "Se salveaza...",
    buttonDiscard: "Renunta",
    buttonEdit: "Editeaza",
    buttonDelete: "Sterge",
    buttonRates: "Tarife",
    buttonNext: "Urmatorul",
    buttonChangeDates: "Modifica perioada",
    buttonLoading: "Se incarca...",
    buttonCheckingAvailability: "Se cauta...",
    bookingsEyebrow: "Rezervari",
    bookingsTitle: "Administrare rezervari",
    bookingShowAllLabel: "Afiseaza toate rezervarile",
    bookingSearchLabel: "Cauta rezervare",
    bookingSearchPlaceholder: "Cauta dupa nume, email sau token",
    roomsEyebrow: "Camere",
    roomEditorCreate: "Creare camera",
    roomEditorEdit: "Editare camera",
    bookingEditorCreate: "Creare rezervare",
    bookingEditorEdit: "Editare rezervare",
    roomsInventoryTitle: "Camere existente",
    roomRatePeriodsEmpty: "Foloseste tariful de baza pentru toate datele.",
    roomRatePeriodsConfigured: "Perioade configurate",
    labelRoomName: "Tip camera",
    labelRoomNumber: "Numar camera",
    labelCapacity: "Capacitate",
    labelRate: "Tarif pe noapte",
    labelMinimumNights: "Minimum nopti",
    labelDiscount: "Discount",
    labelRatePeriods: "Perioade tarifare",
    roomRatesTitle: "Tarife camera",
    roomRatesLegendBase: "Tarif de baza",
    roomRatesLegendOverride: "Perioada tarifara configurata",
    roomRatesMinimumNightsShort: "min. {count} nopti",
    labelIncludedRooms: "Camere incluse",
    labelGuestCount: "Numar oaspeti",
    labelStatus: "Status",
    statusAuto: "Fara modificare",
    labelStartDate: "Data inceput",
    labelEndDate: "Data sfarsit",
    labelClientFirstName: "Prenume client",
    labelClientLastName: "Nume client",
    labelClientEmail: "Email client",
    labelClientPhone: "Telefon client",
    labelMentions: "Mentiuni",
    labelLockedUntil: "Blocat pana la",
    labelToken: "Token rezervare",
    roomTableName: "Tip",
    roomTableNumber: "Numar",
    roomTableCapacity: "Capacitate",
    roomTableRate: "Tarif",
    roomTableDiscount: "Discount",
    roomTableUpdated: "Actualizat",
    bookingTableNumber: "Nr.",
    bookingTableReference: "Nr. rezervare",
    bookingTableRoom: "Tip camera",
    bookingTableStay: "Perioada",
    bookingTableGuests: "Oaspeti",
    bookingTableStatus: "Status",
    bookingTableClient: "Client",
    bookingTablePhone: "Telefon",
    bookingTableMentions: "Mentiuni",
    bookingTableUpdated: "Actualizat",
    tableActions: "Actiuni",
    bookingsEmpty: "Nu exista rezervari in acest moment.",
    bookingsEmptyFiltered: "Nu exista rezervari care sa corespunda cautarii.",
    bookingsEmptyUpcoming: "Nu exista rezervari active sau viitoare.",
    roomsEmpty: "Nu exista camere in acest moment.",
    noRoomOptions: "Nu exista camere disponibile pentru selectie.",
    noAvailableRoomOptionsForDates: "Nu exista camere disponibile pentru perioada selectata.",
    roomSelectionHint: "Selecteaza cel putin o camera disponibila pentru rezervare.",
    bookingDatesStepHint: "Selecteaza perioada pentru a afisa doar camerele disponibile.",
    fallbackClient: "Fara client",
    loginSuccess: "Autentificarea a reusit.",
    logoutSuccess: "Sesiunea administrativa a fost inchisa.",
    sessionExpired: "Sesiunea administrativa a expirat. Conecteaza-te din nou.",
    loadFailed: "Nu am putut incarca datele administrative.",
    roomsLoadFailed: "Nu am putut incarca camerele.",
    bookingsLoadFailed: "Nu am putut incarca rezervarile.",
    availabilityLoadFailed: "Nu am putut incarca camerele disponibile.",
    roomSaved: "Camera a fost salvata.",
    roomDeleted: "Camera a fost stearsa.",
    bookingSaved: "Rezervarea a fost salvata.",
    bookingDeleted: "Rezervarea a fost stearsa.",
    roomDeleteConfirm: "Stergi aceasta camera?",
    bookingDeleteConfirm: "Stergi aceasta rezervare?",
    validationRoomRequired: "Selecteaza cel putin o camera.",
    warningSelectAtLeastOneRoom: "Selecteaza cel putin o camera inainte sa salvezi rezervarea.",
    warningRoomAlreadyBooked: "Una sau mai multe camere selectate sunt deja rezervate pentru perioada aleasa.",
    validationBookingDatesRequired: "Selecteaza data de inceput si data de sfarsit.",
    validationDateRange: "Data de final trebuie sa fie dupa data de inceput.",
    validationRatePeriodDateRange: "Perioada tarifara trebuie sa aiba data de final dupa sau egala cu data de inceput.",
    validationRoomFormInvalid: "Completeaza corect toate campurile obligatorii pentru camera."
  },
  en: {
    brandName: "Booking Engine",
    brandTagline: "Direct booking flow",
    navPublic: "Public frontend",
    navAdmin: "Admin",
    navAdminPanel: "Admin panel",
    languageLabel: "Language",
    loginEyebrow: "Authentication",
    loginTitle: "Administrator sign in",
    labelUsername: "Username",
    labelPassword: "Password",
    buttonLogin: "Sign in",
    buttonLoggingIn: "Signing in...",
    adminLoginFooterDescription: "Login area for administrators entering the operations panel.",
    adminPanelFooterDescription: "The admin panel lists bookings and opens create or edit flows in dedicated popups.",
    adminLoginFooterItem1: "JWT authentication",
    adminLoginFooterItem2: "Secure access",
    adminLoginFooterItem3: "Entry to the admin panel",
    adminPanelFooterItem1: "JWT authentication",
    adminPanelFooterItem2: "Bookings table ordered by startDate",
    adminPanelFooterItem3: "Dedicated popups for create and edit",
    roomsTab: "Rooms",
    bookingsTab: "Bookings",
    sessionUnknown: "Active session",
    sessionUntil: "Expires at {value}",
    buttonRefresh: "Refresh",
    buttonLogout: "Logout",
    buttonCreateRoom: "Create room",
    buttonCreateBooking: "Create booking",
    buttonSaveRoom: "Save room",
    buttonAddRatePeriod: "Add period",
    buttonRemoveRatePeriod: "Remove period",
    buttonSaveBooking: "Save booking",
    buttonSavingRoom: "Saving...",
    buttonSavingBooking: "Saving...",
    buttonDiscard: "Discard",
    buttonEdit: "Edit",
    buttonDelete: "Delete",
    buttonRates: "Rates",
    buttonNext: "Next",
    buttonChangeDates: "Change dates",
    buttonLoading: "Loading...",
    buttonCheckingAvailability: "Checking...",
    bookingsEyebrow: "Bookings",
    bookingsTitle: "Booking management",
    bookingShowAllLabel: "Show all bookings",
    bookingSearchLabel: "Search booking",
    bookingSearchPlaceholder: "Search by name, email, or token",
    roomsEyebrow: "Rooms",
    roomEditorCreate: "Create room",
    roomEditorEdit: "Edit room",
    bookingEditorCreate: "Create booking",
    bookingEditorEdit: "Edit booking",
    roomsInventoryTitle: "Existing rooms",
    roomRatePeriodsEmpty: "Use the base rate for every date.",
    roomRatePeriodsConfigured: "Configured periods",
    labelRoomName: "Room type",
    labelRoomNumber: "Room number",
    labelCapacity: "Capacity",
    labelRate: "Rate per night",
    labelMinimumNights: "Minimum nights",
    labelDiscount: "Discount",
    labelRatePeriods: "Rate periods",
    roomRatesTitle: "Room rates",
    roomRatesLegendBase: "Base rate",
    roomRatesLegendOverride: "Configured rate period",
    roomRatesMinimumNightsShort: "min. {count} nights",
    labelIncludedRooms: "Included rooms",
    labelGuestCount: "Guest count",
    labelStatus: "Status",
    statusAuto: "No override",
    labelStartDate: "Start date",
    labelEndDate: "End date",
    labelClientFirstName: "Client first name",
    labelClientLastName: "Client last name",
    labelClientEmail: "Client email",
    labelClientPhone: "Client phone",
    labelMentions: "Notes",
    labelLockedUntil: "Locked until",
    labelToken: "Booking token",
    roomTableName: "Type",
    roomTableNumber: "Number",
    roomTableCapacity: "Capacity",
    roomTableRate: "Rate",
    roomTableDiscount: "Discount",
    roomTableUpdated: "Updated",
    bookingTableNumber: "No.",
    bookingTableReference: "Book reference",
    bookingTableRoom: "Room type",
    bookingTableStay: "Stay",
    bookingTableGuests: "Guests",
    bookingTableStatus: "Status",
    bookingTableClient: "Client",
    bookingTablePhone: "Phone",
    bookingTableMentions: "Notes",
    bookingTableUpdated: "Updated",
    tableActions: "Actions",
    bookingsEmpty: "There are no bookings right now.",
    bookingsEmptyFiltered: "There are no bookings matching this search.",
    bookingsEmptyUpcoming: "There are no current or upcoming bookings.",
    roomsEmpty: "There are no rooms right now.",
    noRoomOptions: "There are no rooms available for selection.",
    noAvailableRoomOptionsForDates: "There are no available rooms for the selected period.",
    roomSelectionHint: "Select at least one available room for the booking.",
    bookingDatesStepHint: "Choose the stay dates to load only the available rooms.",
    fallbackClient: "No client",
    loginSuccess: "Authentication succeeded.",
    logoutSuccess: "The admin session has been closed.",
    sessionExpired: "The admin session expired. Please sign in again.",
    loadFailed: "We couldn't load admin data.",
    roomsLoadFailed: "We couldn't load rooms.",
    bookingsLoadFailed: "We couldn't load bookings.",
    availabilityLoadFailed: "We couldn't load available rooms.",
    roomSaved: "The room was saved.",
    roomDeleted: "The room was deleted.",
    bookingSaved: "The booking was saved.",
    bookingDeleted: "The booking was deleted.",
    roomDeleteConfirm: "Delete this room?",
    bookingDeleteConfirm: "Delete this booking?",
    validationRoomRequired: "Select at least one room.",
    warningSelectAtLeastOneRoom: "Select at least one room before saving the booking.",
    warningRoomAlreadyBooked: "One or more selected rooms are already booked for the chosen period.",
    validationBookingDatesRequired: "Select both a start date and an end date.",
    validationDateRange: "End date must be after start date.",
    validationRatePeriodDateRange: "A rate period end date must be on or after the start date.",
    validationRoomFormInvalid: "Complete all required room fields correctly."
  }
};

const state = {
  language: loadLanguage(),
  auth: loadAdminAuth(),
  rooms: [],
  bookings: [],
  bookingSearchTerm: "",
  showAllBookings: false,
  selectedBookingId: null,
  editingRoomId: null,
  roomDraft: null,
  viewingRatesRoomId: null,
  ratesCalendarCursor: "",
  editingBookingId: null,
  bookingDraft: null,
  bookingModalStep: "dates",
  availableBookingRooms: [],
  loadingAvailableBookingRooms: false,
  loadingRooms: false,
  loadingBookings: false
};

document.addEventListener("DOMContentLoaded", async () => {
  hydrateAdminAuthFromHash();
  applyLanguage();
  applyThemeBrand();
  wireLanguageSwitcher();

  const page = document.body.dataset.page;

  if (page === "admin-login") {
    if (hasValidAuth()) {
      window.location.replace("admin-panel.html");
      return;
    }

    wireLoginForm();
    return;
  }

  if (page === "admin-panel") {
    if (!hasAuthToken()) {
      clearAdminAuth();
      window.location.replace("admin.html");
      return;
    }

    wirePanelActions();
    wireRoomModal();
    wireRatesModal();
    wireBookingModal();
    renderPanelState();
    await loadAdminData();
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

function t(key, replacements = {}) {
  const languagePack = TRANSLATIONS[state.language] || TRANSLATIONS[DEFAULT_LANGUAGE];
  const template = languagePack[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;

  return Object.entries(replacements).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, value),
    template
  );
}

function loadLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  } catch {
    try {
      return window.sessionStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }
}

function saveLanguage(language) {
  state.language = language;
  try {
    window.localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    try {
      window.sessionStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // Ignore storage restrictions.
    }
  }
}

function loadAdminAuth() {
  const fromLocalStorage = readBrowserStorage("localStorage", ADMIN_AUTH_KEY);
  if (fromLocalStorage) {
    return normalizeAdminAuth(fromLocalStorage);
  }

  const fromSessionStorage = readBrowserStorage("sessionStorage", ADMIN_AUTH_KEY);
  if (fromSessionStorage) {
    return normalizeAdminAuth(fromSessionStorage);
  }

  const fromCookie = readCookieAuth(ADMIN_COOKIE_KEY);
  if (fromCookie) {
    return normalizeAdminAuth(fromCookie);
  }

  try {
    const raw = window.name ? JSON.parse(window.name) : null;
    return raw?.[ADMIN_WINDOW_NAME_KEY] ? normalizeAdminAuth(raw[ADMIN_WINDOW_NAME_KEY]) : null;
  } catch {
    return null;
  }
}

function saveAdminAuth(auth) {
  state.auth = normalizeAdminAuth(auth);
  writeBrowserStorage("localStorage", ADMIN_AUTH_KEY, state.auth);
  writeBrowserStorage("sessionStorage", ADMIN_AUTH_KEY, state.auth);
  writeCookieAuth(ADMIN_COOKIE_KEY, state.auth);
  writeWindowNameAuth(state.auth);
}

function clearAdminAuth() {
  state.auth = null;
  removeBrowserStorage("localStorage", ADMIN_AUTH_KEY);
  removeBrowserStorage("sessionStorage", ADMIN_AUTH_KEY);
  removeCookieAuth(ADMIN_COOKIE_KEY);
  writeWindowNameAuth(null);
}

function hasValidAuth() {
  if (!state.auth?.accessToken) {
    return false;
  }

  const expiresAtMs = Number(state.auth.expiresAtMs);
  if (Number.isFinite(expiresAtMs)) {
    return expiresAtMs > Date.now();
  }

  const expiresAt = parseBackendDateTime(state.auth.expiresAt);
  if (Number.isFinite(expiresAt?.getTime())) {
    return expiresAt.getTime() > Date.now();
  }

  return true;
}

function hasAuthToken() {
  return Boolean(state.auth?.accessToken);
}

function applyLanguage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-admin-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.adminI18n);
  });

  document.querySelectorAll("[data-admin-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.adminI18nPlaceholder));
  });

  document.querySelectorAll("[data-admin-language-switcher]").forEach((select) => {
    select.value = state.language;
  });

  const descriptions = {
    "admin-login": {
      ro: "Autentificare administrator pentru Booking Engine.",
      en: "Administrator sign-in for Booking Engine."
    },
    "admin-panel": {
      ro: "Panou administrativ pentru rezervari si camere.",
      en: "Administrative panel for bookings and rooms."
    }
  };
  const titles = {
    "admin-login": {
      ro: "Administrare | Booking Engine",
      en: "Admin | Booking Engine"
    },
    "admin-panel": {
      ro: "Panou Administrativ | Booking Engine",
      en: "Admin Panel | Booking Engine"
    }
  };
  const page = document.body.dataset.page;
  document.title = titles[page]?.[state.language] || titles["admin-login"][DEFAULT_LANGUAGE];

  const metaDescription = document.querySelector("[data-admin-meta-description]");
  if (metaDescription) {
    metaDescription.setAttribute("content", descriptions[page]?.[state.language] || descriptions["admin-login"][DEFAULT_LANGUAGE]);
  }

  if (page === "admin-panel") {
    renderPanelState();
  }
}

function wireLanguageSwitcher() {
  document.querySelectorAll("[data-admin-language-switcher]").forEach((select) => {
    select.addEventListener("change", () => {
      saveLanguage(select.value);
      applyLanguage();
      applyThemeBrand();
    });
  });
}

function wireLoginForm() {
  const form = document.querySelector("[data-admin-login-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('[type="submit"]');
    const originalLabel = submitButton?.textContent;

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = t("buttonLoggingIn");
      }

      const response = await adminLogin({
        username: form.elements.username.value.trim(),
        password: form.elements.password.value
      });

      saveAdminAuth(response.data);
      setFeedback(t("loginSuccess"), "success");
      window.location.replace(buildAdminPanelUrl());
    } catch (error) {
      setFeedback(error.message || t("loadFailed"), "error");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel || t("buttonLogin");
      }
    }
  });
}

function wirePanelActions() {
  const logoutButton = document.querySelector("[data-admin-logout]");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearAdminAuth();
      window.location.replace("admin.html");
    });
  }

  const refreshButton = document.querySelector("[data-admin-refresh]");
  if (refreshButton) {
    refreshButton.addEventListener("click", async () => {
      await loadAdminData();
    });
  }

  const createRoomButton = document.querySelector("[data-admin-open-room-modal]");
  if (createRoomButton) {
    createRoomButton.addEventListener("click", () => {
      state.editingRoomId = null;
      state.roomDraft = createRoomDraft();
      renderRoomModal();
      openModal("room");
    });
  }

  const createBookingButton = document.querySelector("[data-admin-open-booking-modal]");
  if (createBookingButton) {
    createBookingButton.addEventListener("click", () => {
      state.editingBookingId = null;
      state.bookingDraft = createBookingDraft();
      state.bookingModalStep = "dates";
      state.availableBookingRooms = [];
      renderBookingModal();
      openModal("booking");
    });
  }

  const editBookingButton = document.querySelector("[data-admin-edit-booking]");
  if (editBookingButton) {
    editBookingButton.addEventListener("click", async () => {
      const bookingId = state.selectedBookingId;
      if (!bookingId) {
        return;
      }

      const response = await runProtected(
        () => getAdminBooking(state.auth.accessToken, bookingId),
        t("bookingsLoadFailed")
      );

      if (!response) {
        return;
      }

      upsertBooking(response.data);
      state.editingBookingId = bookingId;
      state.bookingDraft = createBookingDraft(response.data);
      state.bookingModalStep = "dates";
      state.availableBookingRooms = [];
      renderBookingModal();
      openModal("booking");
    });
  }

  const deleteBookingButton = document.querySelector("[data-admin-delete-booking]");
  if (deleteBookingButton) {
    deleteBookingButton.addEventListener("click", async () => {
      const bookingId = state.selectedBookingId;
      if (!bookingId || !window.confirm(t("bookingDeleteConfirm"))) {
        return;
      }

      const result = await runProtected(
        () => deleteAdminBooking(state.auth.accessToken, bookingId),
        t("bookingsLoadFailed")
      );

      if (result === null) {
        return;
      }

      state.selectedBookingId = null;
      state.editingBookingId = null;
      setFeedback(t("bookingDeleted"), "success");
      await refreshBookings();
    });
  }

  const searchInput = document.querySelector("[data-admin-booking-search]");
  if (searchInput) {
    searchInput.value = state.bookingSearchTerm;
    searchInput.addEventListener("input", () => {
      state.bookingSearchTerm = searchInput.value.trim();
      renderBookingsTable();
      renderSelectedBookingBar();
    });
  }

  const showAllBookingsCheckbox = document.querySelector("[data-admin-show-all-bookings]");
  if (showAllBookingsCheckbox) {
    showAllBookingsCheckbox.checked = state.showAllBookings;
    showAllBookingsCheckbox.addEventListener("change", () => {
      state.showAllBookings = showAllBookingsCheckbox.checked;
      renderBookingsTable();
      renderSelectedBookingBar();
    });
  }
}

function wireRoomModal() {
  document.querySelectorAll("[data-admin-close-room-modal]").forEach((button) => {
    button.addEventListener("click", closeRoomModal);
  });

  const discardButton = document.querySelector("[data-admin-cancel-room-edit]");
  if (discardButton) {
    discardButton.addEventListener("click", closeRoomModal);
  }

  const form = document.querySelector("[data-admin-room-form]");
  if (!form) {
    return;
  }

  form.addEventListener("input", () => {
    state.roomDraft = collectRoomDraftFromForm(form);
  });

  form.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-admin-add-rate-period]");
    if (addButton) {
      state.roomDraft = collectRoomDraftFromForm(form);
      state.roomDraft.ratePeriods.push(createRatePeriodDraft());
      renderRoomModal();
      return;
    }

    const removeButton = event.target.closest("[data-admin-remove-rate-period]");
    if (removeButton) {
      state.roomDraft = collectRoomDraftFromForm(form);
      state.roomDraft.ratePeriods.splice(Number(removeButton.dataset.adminRemoveRatePeriod), 1);
      renderRoomModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("[data-admin-room-submit]");
    const originalLabel = submitButton?.textContent;
    const draft = collectRoomDraftFromForm(form);
    const roomId = draft.roomId ? Number(draft.roomId) : null;

    if (!form.reportValidity()) {
      const invalidField = Array.from(form.elements).find((field) => typeof field.checkValidity === "function" && !field.checkValidity());
      setFeedback(invalidField?.validationMessage || t("validationRoomFormInvalid"), "error");
      return;
    }

    if (draft.ratePeriods.some((period) => period.endDate && period.startDate && period.endDate < period.startDate)) {
      setFeedback(t("validationRatePeriodDateRange"), "error");
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = t("buttonSavingRoom");
      }

      const result = await runProtected(
        () => roomId
          ? updateAdminRoom(state.auth.accessToken, roomId, draft)
          : createAdminRoom(state.auth.accessToken, draft),
        t("roomsLoadFailed")
      );

      if (result === null) {
        return;
      }

      setFeedback(t("roomSaved"), "success");
      state.editingRoomId = null;
      state.roomDraft = null;
      await refreshRooms();
      closeRoomModal();
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel || t("buttonSaveRoom");
      }
    }
  });
}

function wireRatesModal() {
  document.querySelectorAll("[data-admin-close-rates-modal]").forEach((button) => {
    button.addEventListener("click", closeRatesModal);
  });

  const previousMonthButton = document.querySelector("[data-admin-rates-prev-month]");
  if (previousMonthButton) {
    previousMonthButton.addEventListener("click", () => {
      state.ratesCalendarCursor = formatLocalDateIso(addMonths(getRatesCalendarMonthStart(), -1));
      renderRatesModal();
    });
  }

  const nextMonthButton = document.querySelector("[data-admin-rates-next-month]");
  if (nextMonthButton) {
    nextMonthButton.addEventListener("click", () => {
      state.ratesCalendarCursor = formatLocalDateIso(addMonths(getRatesCalendarMonthStart(), 1));
      renderRatesModal();
    });
  }
}

function wireBookingModal() {
  document.querySelectorAll("[data-admin-close-booking-modal]").forEach((button) => {
    button.addEventListener("click", closeBookingModal);
  });

  const discardButton = document.querySelector("[data-admin-cancel-booking-edit]");
  if (discardButton) {
    discardButton.addEventListener("click", closeBookingModal);
  }

  const form = document.querySelector("[data-admin-booking-form]");
  if (!form) {
    return;
  }

  const nextButton = document.querySelector("[data-admin-booking-next]");
  const backButton = document.querySelector("[data-admin-booking-back]");

  const syncBookingDraft = () => {
    state.bookingDraft = collectBookingDraftFromForm(form, state.bookingDraft || createBookingDraft());
  };

  form.addEventListener("input", syncBookingDraft);
  form.addEventListener("change", syncBookingDraft);

  if (nextButton) {
    nextButton.addEventListener("click", async () => {
      const draft = collectBookingDraftFromForm(form, state.bookingDraft || createBookingDraft());

      if (!draft.startDate || !draft.endDate) {
        setFeedback(t("validationBookingDatesRequired"), "error");
        return;
      }

      if (draft.endDate < draft.startDate) {
        setFeedback(t("validationDateRange"), "error");
        return;
      }

      state.bookingDraft = draft;
      state.loadingAvailableBookingRooms = true;
      renderBookingModal();

      try {
        const response = await runProtected(
          () => getAdminAvailableRooms(state.auth.accessToken, {
            startDate: draft.startDate,
            endDate: draft.endDate,
            excludeBookingId: state.editingBookingId
          }),
          t("availabilityLoadFailed")
        );

        if (!response) {
          return;
        }

        state.availableBookingRooms = sortRooms(response.data || []);
        const availableRoomIds = new Set(state.availableBookingRooms.map((room) => String(room.id)));
        state.bookingDraft.roomIds = (draft.roomIds || [])
          .map((roomId) => Number(roomId))
          .filter(Number.isFinite)
          .filter((roomId) => availableRoomIds.has(String(roomId)));
        state.bookingModalStep = "details";
        renderBookingModal();
      } finally {
        state.loadingAvailableBookingRooms = false;
        renderBookingModal();
      }
    });
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      state.bookingDraft = collectBookingDraftFromForm(form, state.bookingDraft || createBookingDraft());
      state.bookingModalStep = "dates";
      renderBookingModal();
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("[data-admin-booking-submit]");
    const originalLabel = submitButton?.textContent;
    const draft = collectBookingDraftFromForm(form, state.bookingDraft || createBookingDraft());
    const bookingId = draft.bookingId || null;
    const selectedRoomIds = draft.roomIds || [];

    if (!selectedRoomIds.length) {
      const warningMessage = t("warningSelectAtLeastOneRoom");
      setFeedback(warningMessage, "error");
      window.alert(warningMessage);
      return;
    }

    if (!draft.startDate || !draft.endDate) {
      setFeedback(t("validationBookingDatesRequired"), "error");
      return;
    }

    if (draft.endDate < draft.startDate) {
      setFeedback(t("validationDateRange"), "error");
      return;
    }

    const payload = {
      roomIds: selectedRoomIds,
      guestCount: draft.guestCount,
      startDate: draft.startDate,
      endDate: draft.endDate,
      status: draft.status,
      clientFirstName: draft.clientFirstName,
      clientLastName: draft.clientLastName,
      clientEmail: draft.clientEmail,
      clientPhoneNumber: draft.clientPhoneNumber,
      mentions: draft.mentions,
      lockedUntil: draft.lockedUntil,
      token: draft.token
    };

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = t("buttonSavingBooking");
      }

      const result = bookingId
        ? await updateAdminBooking(state.auth.accessToken, bookingId, payload)
        : await createAdminBooking(state.auth.accessToken, payload);

      setFeedback(t("bookingSaved"), "success");
      state.bookingDraft = null;
      state.editingBookingId = null;
      await refreshBookings();
      closeBookingModal();
      return result;
    } catch (error) {
      if (isAdminUnauthorizedError(error)) {
        clearAdminAuth();
        window.location.replace("admin.html");
        return;
      }

      if (error?.status === 409) {
        const warningMessage = `${t("warningRoomAlreadyBooked")}

${error.message || ""}`.trim();
        setFeedback(warningMessage, "error");
        window.alert(warningMessage);
        return;
      }

      setFeedback(error.message || t("bookingsLoadFailed"), "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel || t("buttonSaveBooking");
      }
    }
  });
}

async function loadAdminData() {
  if (!hasAuthToken()) {
    clearAdminAuth();
    window.location.replace("admin.html");
    return;
  }

  await Promise.all([refreshRooms(), refreshBookings()]);
  renderPanelState();
}

async function runProtected(task, fallbackMessage) {
  try {
    return await task();
  } catch (error) {
    if (isAdminUnauthorizedError(error)) {
      clearAdminAuth();
      window.location.replace("admin.html");
      return null;
    }

    setFeedback(error.message || fallbackMessage || t("loadFailed"), "error");
    return null;
  }
}

async function refreshRooms() {
  state.loadingRooms = true;
  renderRoomModal();

  const response = await runProtected(
    () => getAdminRooms(state.auth.accessToken),
    t("roomsLoadFailed")
  );

  state.loadingRooms = false;

  if (!response) {
    renderRoomModal();
    return false;
  }

  state.rooms = sortRooms(response.data || []);
  renderRoomModal();
  renderPanelState();
  return true;
}

async function refreshBookings() {
  state.loadingBookings = true;
  renderBookingsTable();

  const response = await runProtected(
    () => getAdminBookings(state.auth.accessToken),
    t("bookingsLoadFailed")
  );

  state.loadingBookings = false;

  if (!response) {
    renderBookingsTable();
    return false;
  }

  state.bookings = sortBookings(response.data || []);
  if (!state.bookings.find((booking) => booking.id === state.selectedBookingId)) {
    state.selectedBookingId = null;
  }
  renderPanelState();
  return true;
}

function renderPanelState() {
  renderSessionSummary();
  renderBookingsTable();
  renderSelectedBookingBar();
  renderRoomModal();
  renderRatesModal();
  renderBookingModal();
}

function renderSessionSummary() {
  const bookingSummary = document.querySelector("[data-admin-booking-summary]");
  const roomSummary = document.querySelector("[data-admin-room-summary]");
  const sessionSummary = document.querySelector("[data-admin-session-summary]");

  if (bookingSummary) {
    bookingSummary.textContent = `${state.bookings.length} ${t("bookingsTab")}`;
  }

  if (roomSummary) {
    roomSummary.textContent = `${state.rooms.length} ${t("roomsTab")}`;
  }

  if (sessionSummary) {
    sessionSummary.textContent = hasValidAuth()
      ? t("sessionUntil", { value: formatDateTime(state.auth.expiresAt) })
      : t("sessionUnknown");
  }
}

function renderBookingsTable() {
  const container = document.querySelector("[data-admin-bookings-list]");
  if (!container) {
    return;
  }

  const visibleBookings = getFilteredBookings();
  if (state.selectedBookingId && !visibleBookings.some((booking) => booking.id === state.selectedBookingId)) {
    state.selectedBookingId = null;
  }

  if (state.loadingBookings) {
    container.innerHTML = `<div class="empty-state"><p>${t("buttonLoading")}</p></div>`;
    return;
  }

  if (!state.bookings.length) {
    container.innerHTML = `<div class="empty-state"><p>${t("bookingsEmpty")}</p></div>`;
    return;
  }

  if (!visibleBookings.length) {
    const emptyKey = state.bookingSearchTerm.trim() || state.showAllBookings
      ? "bookingsEmptyFiltered"
      : "bookingsEmptyUpcoming";
    container.innerHTML = `<div class="empty-state"><p>${t(emptyKey)}</p></div>`;
    return;
  }

  container.innerHTML = `
    <table class="admin-table admin-bookings-table">
      <thead>
        <tr>
          <th>${t("bookingTableNumber")}</th>
          <th>${t("bookingTableReference")}</th>
          <th>${t("bookingTableRoom")}</th>
          <th>${t("bookingTableStay")}</th>
          <th>${t("bookingTableGuests")}</th>
          <th>${t("bookingTableStatus")}</th>
          <th>${t("bookingTableClient")}</th>
          <th>${t("bookingTablePhone")}</th>
          <th>${t("bookingTableMentions")}</th>
          <th>${t("bookingTableUpdated")}</th>
        </tr>
      </thead>
      <tbody>
        ${visibleBookings.map((booking) => `
          <tr class="admin-booking-row${booking.id === state.selectedBookingId ? " is-selected" : ""}" data-booking-row="${booking.id}">
            <td>${escapeHtml(formatBookingRoomNumbers(booking))}</td>
            <td>${escapeHtml(formatBookingReference(booking.id))}</td>
            <td>${escapeHtml(formatBookingRoomTypes(booking))}</td>
            <td>${escapeHtml(formatStayRange(booking.startDate, booking.endDate))}</td>
            <td>${booking.guestCount ?? "-"}</td>
            <td><span class="status-pill ${escapeHtml(getBookingStatusClassName(booking.status))}">${escapeHtml(booking.status || "-")}</span></td>
            <td>${escapeHtml(formatClientName(booking))}</td>
            <td>${booking.clientPhoneNumber ? escapeHtml(booking.clientPhoneNumber) : "-"}</td>
            <td>${booking.mentions ? escapeHtml(booking.mentions) : "-"}</td>
            <td>${formatDateTime(booking.updatedAt || booking.createdAt)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  container.querySelectorAll("[data-booking-row]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedBookingId = row.dataset.bookingRow;
      renderSelectedBookingBar();
      renderBookingsTable();
    });
  });
}

function renderSelectedBookingBar() {
  const section = document.querySelector("[data-admin-booking-actions]");
  const meta = document.querySelector("[data-admin-selected-booking-meta]");

  if (!section || !meta) {
    return;
  }

  const booking = getFilteredBookings().find((item) => item.id === state.selectedBookingId);
  section.hidden = !booking;

  if (!booking) {
    meta.innerHTML = "";
    return;
  }

  meta.innerHTML = `
    <strong>${escapeHtml(formatBookingRoomTypes(booking))}</strong>
    <span>${t("bookingTableNumber")}: ${escapeHtml(formatBookingRoomNumbers(booking))}</span>
    <span>${escapeHtml(formatStayRange(booking.startDate, booking.endDate))}</span>
    <span>${booking.guestCount ?? "-"} ${escapeHtml(t("bookingTableGuests").toLowerCase())}</span>
    <span>${escapeHtml(booking.status || "-")}</span>
  `;
}

function getFilteredBookings() {
  const today = getTodayDateString();
  const baseBookings = state.showAllBookings
    ? state.bookings
    : state.bookings.filter((booking) => booking?.endDate && booking.endDate >= today);
  const query = state.bookingSearchTerm.trim().toLowerCase();
  if (!query) {
    return baseBookings;
  }

  return baseBookings.filter((booking) => {
    const haystack = [
      formatBookingReference(booking.id),
      booking.clientFirstName,
      booking.clientLastName,
      booking.clientEmail,
      booking.mentions,
      booking.token
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

function formatBookingReference(bookingId) {
  if (!bookingId) {
    return "-";
  }

  return String(bookingId).split("-")[0] || "-";
}

function getBookingStatusClassName(status) {
  switch (String(status || "").toUpperCase()) {
    case "CONFIRMED":
      return "status-confirmed";
    case "PENDING":
      return "status-pending";
    case "FAILED":
      return "status-failed";
    default:
      return "status-muted";
  }
}

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderRoomModal() {
  const title = document.querySelector("[data-admin-room-modal-title]");
  const form = document.querySelector("[data-admin-room-form]");
  const list = document.querySelector("[data-admin-rooms-list]");
  const ratePeriodList = document.querySelector("[data-admin-rate-period-list]");

  if (!title || !form || !list || !ratePeriodList) {
    return;
  }

  const room = state.rooms.find((item) => item.id === state.editingRoomId);
  const draft = state.roomDraft || createRoomDraft(room);
  state.roomDraft = draft;

  title.textContent = room ? t("roomEditorEdit") : t("roomEditorCreate");
  form.elements.roomId.value = draft.roomId || "";
  form.elements.name.value = draft.name || "";
  form.elements.roomNumber.value = draft.roomNumber || "";
  form.elements.capacity.value = draft.capacity ?? "";
  form.elements.ratePerNight.value = draft.ratePerNight ?? "";
  form.elements.discount.value = draft.discount ?? "";
  ratePeriodList.innerHTML = renderRatePeriodInputs(draft.ratePeriods);

  if (state.loadingRooms) {
    list.innerHTML = `<div class="empty-state"><p>${t("buttonLoading")}</p></div>`;
    return;
  }

  if (!state.rooms.length) {
    list.innerHTML = `<div class="empty-state"><p>${t("roomsEmpty")}</p></div>`;
    return;
  }

  list.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>${t("roomTableName")}</th>
          <th>${t("roomTableNumber")}</th>
          <th>${t("roomTableCapacity")}</th>
          <th>${t("roomTableRate")}</th>
          <th>${t("roomTableDiscount")}</th>
          <th>${t("tableActions")}</th>
        </tr>
      </thead>
      <tbody>
        ${state.rooms.map((currentRoom) => `
          <tr>
            <td>
              <div class="admin-rate-period-summary">
                <strong>${escapeHtml(currentRoom.name)}</strong>
              </div>
            </td>
            <td>${escapeHtml(currentRoom.roomNumber || "-")}</td>
            <td>${currentRoom.capacity ?? "-"}</td>
            <td>
              <div class="admin-rate-period-summary">
                <strong>${formatCurrency(currentRoom.ratePerNight)}</strong>
                <span class="note">${t("labelRate")}</span>
              </div>
            </td>
            <td>${formatPercent(currentRoom.discount)}</td>
            <td>
              <div class="admin-row-actions">
                <button class="button button-secondary" type="button" data-room-rates="${currentRoom.id}">${t("buttonRates")}</button>
                <button class="button button-success" type="button" data-room-edit="${currentRoom.id}">${t("buttonEdit")}</button>
                <button class="button button-danger" type="button" data-room-delete="${currentRoom.id}">${t("buttonDelete")}</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  list.querySelectorAll("[data-room-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      state.editingRoomId = Number(button.dataset.roomEdit);
      state.roomDraft = createRoomDraft(state.rooms.find((item) => item.id === state.editingRoomId));
      renderRoomModal();
    });
  });

  list.querySelectorAll("[data-room-rates]").forEach((button) => {
    button.addEventListener("click", () => {
      const roomId = Number(button.dataset.roomRates);
      const roomForRates = state.rooms.find((item) => item.id === roomId);
      if (!roomForRates) {
        return;
      }

      state.viewingRatesRoomId = roomId;
      state.ratesCalendarCursor = getInitialRatesCalendarCursor(roomForRates);
      renderRatesModal();
      openModal("rates");
    });
  });

  list.querySelectorAll("[data-room-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm(t("roomDeleteConfirm"))) {
        return;
      }

      const roomId = Number(button.dataset.roomDelete);
      const result = await runProtected(
        () => deleteAdminRoom(state.auth.accessToken, roomId),
        t("roomsLoadFailed")
      );

      if (result === null) {
        return;
      }

      if (state.editingRoomId === roomId) {
        state.editingRoomId = null;
      }

      setFeedback(t("roomDeleted"), "success");
      await refreshRooms();
    });
  });
}

function renderBookingModal() {
  const title = document.querySelector("[data-admin-booking-modal-title]");
  const form = document.querySelector("[data-admin-booking-form]");
  const roomOptions = document.querySelector("[data-admin-room-options]");
  const roomSection = document.querySelector("[data-admin-booking-room-section]");
  const stepHint = document.querySelector("[data-admin-booking-step-hint]");
  const nextButton = document.querySelector("[data-admin-booking-next]");
  const backButton = document.querySelector("[data-admin-booking-back]");
  const submitButton = document.querySelector("[data-admin-booking-submit]");
  const detailFields = document.querySelectorAll("[data-admin-booking-details-field]");
  const dateFields = document.querySelectorAll("[data-admin-booking-dates-field]");

  if (!title || !form || !roomOptions || !roomSection || !stepHint || !nextButton || !backButton || !submitButton) {
    return;
  }

  const booking = state.bookings.find((item) => item.id === state.editingBookingId);
  const draft = state.bookingDraft || createBookingDraft(booking);
  state.bookingDraft = draft;
  const isDetailsStep = state.bookingModalStep === "details";

  title.textContent = booking ? t("bookingEditorEdit") : t("bookingEditorCreate");

  roomOptions.innerHTML = state.loadingAvailableBookingRooms
    ? `<div class="empty-state"><p>${t("buttonCheckingAvailability")}</p></div>`
    : state.availableBookingRooms.length
    ? `
      <p class="note">${t("roomSelectionHint")}</p>
      <div class="admin-room-options-grid">
        ${state.availableBookingRooms.map((room) => `
          <label class="admin-room-option">
            <input type="checkbox" name="roomIds" value="${room.id}">
            <span>${escapeHtml(formatRoomLabel(room))} · ${formatCurrency(room.ratePerNight)}</span>
          </label>
        `).join("")}
      </div>
    `
    : `<div class="empty-state"><p>${t("noAvailableRoomOptionsForDates")}</p></div>`;

  form.elements.bookingId.value = draft.bookingId || "";
  form.elements.guestCount.value = draft.guestCount ?? "";
  form.elements.startDate.value = draft.startDate || "";
  form.elements.endDate.value = draft.endDate || "";
  form.elements.status.value = draft.status || "CONFIRMED";
  form.elements.clientFirstName.value = draft.clientFirstName || "";
  form.elements.clientLastName.value = draft.clientLastName || "";
  form.elements.clientEmail.value = draft.clientEmail || "";
  form.elements.clientPhoneNumber.value = draft.clientPhoneNumber || "";
  form.elements.mentions.value = draft.mentions || "";
  form.elements.lockedUntil.value = toDateTimeLocalValue(draft.lockedUntil);
  form.elements.token.value = draft.token || "";

  stepHint.textContent = isDetailsStep ? t("roomSelectionHint") : t("bookingDatesStepHint");
  setElementVisibility(stepHint, true);
  setElementVisibility(roomSection, isDetailsStep);
  detailFields.forEach((field) => {
    setElementVisibility(field, isDetailsStep);
  });
  dateFields.forEach((field) => {
    setElementVisibility(field, true);
  });
  form.elements.startDate.disabled = isDetailsStep;
  form.elements.endDate.disabled = isDetailsStep;
  setElementVisibility(nextButton, !isDetailsStep);
  nextButton.disabled = state.loadingAvailableBookingRooms;
  nextButton.textContent = state.loadingAvailableBookingRooms ? t("buttonCheckingAvailability") : t("buttonNext");
  setElementVisibility(backButton, isDetailsStep);
  setElementVisibility(submitButton, isDetailsStep);
  submitButton.disabled = state.loadingAvailableBookingRooms || !state.availableBookingRooms.length;

  const selectedRoomIds = new Set((draft.roomIds || []).map(String));
  roomOptions.querySelectorAll('input[name="roomIds"]').forEach((input) => {
    input.checked = selectedRoomIds.has(input.value);
  });
}

function renderRatesModal() {
  const modal = document.querySelector("[data-admin-rates-modal]");
  const title = document.querySelector("[data-admin-rates-modal-title]");
  const roomMeta = document.querySelector("[data-admin-rates-room-meta]");
  const monthLabel = document.querySelector("[data-admin-rates-month-label]");
  const weekdays = document.querySelector("[data-admin-rates-weekdays]");
  const calendarGrid = document.querySelector("[data-admin-rates-grid]");

  if (!modal || !title || !roomMeta || !monthLabel || !weekdays || !calendarGrid) {
    return;
  }

  const room = state.rooms.find((item) => item.id === state.viewingRatesRoomId);
  if (!room) {
    closeRatesModal();
    return;
  }

  const monthStart = getRatesCalendarMonthStart();
  title.textContent = t("roomRatesTitle");
  roomMeta.innerHTML = `
    <strong>${escapeHtml(formatRoomLabel(room))}</strong>
    <span>${escapeHtml(t("labelRate"))}: ${escapeHtml(formatCurrency(room.ratePerNight))}</span>
  `;
  monthLabel.textContent = formatRatesMonthLabel(monthStart);
  weekdays.innerHTML = getRatesWeekdayLabels().map((label) => `
    <span class="admin-rates-calendar-weekday">${escapeHtml(label)}</span>
  `).join("");
  calendarGrid.innerHTML = buildRatesCalendarDays(room, monthStart);
}

function setElementVisibility(element, isVisible) {
  if (!element) {
    return;
  }

  element.hidden = !isVisible;
  element.style.display = isVisible ? "" : "none";
}

function createBookingDraft(booking = {}) {
  return {
    bookingId: booking?.id || "",
    roomIds: Array.isArray(booking?.roomIds) ? [...booking.roomIds] : [],
    guestCount: booking?.guestCount ?? "",
    startDate: booking?.startDate || "",
    endDate: booking?.endDate || "",
    status: booking?.status || "CONFIRMED",
    clientFirstName: booking?.clientFirstName || "",
    clientLastName: booking?.clientLastName || "",
    clientEmail: booking?.clientEmail || "",
    clientPhoneNumber: booking?.clientPhoneNumber || "",
    mentions: booking?.mentions || "",
    lockedUntil: booking?.lockedUntil || "",
    token: booking?.token || ""
  };
}

function createRoomDraft(room = {}) {
  return {
    roomId: room?.id || "",
    name: room?.name || "",
    roomNumber: room?.roomNumber || "",
    capacity: room?.capacity ?? "",
    ratePerNight: room?.ratePerNight ?? "",
    discount: room?.discount ?? "",
    ratePeriods: Array.isArray(room?.ratePeriods) && room.ratePeriods.length
      ? room.ratePeriods.map((period) => createRatePeriodDraft(period))
      : []
  };
}

function createRatePeriodDraft(period = {}) {
  return {
    startDate: period.startDate || "",
    endDate: period.endDate || "",
    ratePerNight: period.ratePerNight ?? "",
    minimumNights: period.minimumNights ?? ""
  };
}

function collectRoomDraftFromForm(form) {
  if (!form) {
    return createRoomDraft();
  }

  return {
    roomId: form.elements.roomId.value || "",
    name: form.elements.name.value,
    roomNumber: form.elements.roomNumber.value,
    capacity: form.elements.capacity.value,
    ratePerNight: form.elements.ratePerNight.value,
    discount: form.elements.discount.value,
    ratePeriods: Array.from(form.querySelectorAll("[data-admin-rate-period-item]")).map((row) => ({
      startDate: row.querySelector('[name="ratePeriodStartDate"]')?.value || "",
      endDate: row.querySelector('[name="ratePeriodEndDate"]')?.value || "",
      ratePerNight: row.querySelector('[name="ratePeriodRatePerNight"]')?.value || "",
      minimumNights: row.querySelector('[name="ratePeriodMinimumNights"]')?.value || ""
    }))
  };
}

function collectBookingDraftFromForm(form, baseDraft = createBookingDraft()) {
  const roomInputs = Array.from(form.querySelectorAll('input[name="roomIds"]'));
  const roomIds = state.bookingModalStep === "details" && roomInputs.length
    ? roomInputs
      .filter((input) => input.checked)
      .map((input) => Number(input.value))
      .filter(Number.isFinite)
    : Array.isArray(baseDraft.roomIds)
      ? [...baseDraft.roomIds]
      : [];

  return {
    bookingId: form.elements.bookingId.value || baseDraft.bookingId || "",
    roomIds,
    guestCount: form.elements.guestCount.value,
    startDate: form.elements.startDate.value,
    endDate: form.elements.endDate.value,
    status: form.elements.status.value,
    clientFirstName: form.elements.clientFirstName.value,
    clientLastName: form.elements.clientLastName.value,
    clientEmail: form.elements.clientEmail.value,
    clientPhoneNumber: form.elements.clientPhoneNumber.value,
    mentions: form.elements.mentions.value,
    lockedUntil: form.elements.lockedUntil.value,
    token: form.elements.token.value.trim()
  };
}

function renderRatePeriodInputs(ratePeriods) {
  if (!ratePeriods.length) {
    return `<p class="note">${t("roomRatePeriodsEmpty")}</p>`;
  }

  return ratePeriods.map((period, index) => `
    <article class="admin-rate-period-item" data-admin-rate-period-item="${index}">
      <div class="admin-rate-period-grid">
        <label>
          <span>${t("labelStartDate")}</span>
          <input name="ratePeriodStartDate" type="date" value="${escapeHtml(period.startDate || "")}" required>
        </label>
        <label>
          <span>${t("labelEndDate")}</span>
          <input name="ratePeriodEndDate" type="date" value="${escapeHtml(period.endDate || "")}" required>
        </label>
        <label>
          <span>${t("labelRate")}</span>
          <input name="ratePeriodRatePerNight" type="number" min="0" step="0.01" value="${escapeHtml(period.ratePerNight ?? "")}" required>
        </label>
        <label>
          <span>${t("labelMinimumNights")}</span>
          <input name="ratePeriodMinimumNights" type="number" min="1" step="1" value="${escapeHtml(period.minimumNights ?? "")}">
        </label>
        <div class="admin-inline-actions">
          <button class="button button-secondary" type="button" data-admin-remove-rate-period="${index}">${t("buttonRemoveRatePeriod")}</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openModal(type) {
  const selector = {
    room: "[data-admin-room-modal]",
    booking: "[data-admin-booking-modal]",
    rates: "[data-admin-rates-modal]"
  }[type];
  const modal = selector ? document.querySelector(selector) : null;
  if (modal) {
    modal.hidden = false;
  }
}

function closeRoomModal() {
  state.editingRoomId = null;
  state.roomDraft = null;
  const modal = document.querySelector("[data-admin-room-modal]");
  if (modal) {
    modal.hidden = true;
  }
}

function closeBookingModal() {
  state.editingBookingId = null;
  state.bookingDraft = null;
  state.bookingModalStep = "dates";
  state.availableBookingRooms = [];
  state.loadingAvailableBookingRooms = false;
  const modal = document.querySelector("[data-admin-booking-modal]");
  if (modal) {
    modal.hidden = true;
  }
}

function closeRatesModal() {
  state.viewingRatesRoomId = null;
  state.ratesCalendarCursor = "";
  const modal = document.querySelector("[data-admin-rates-modal]");
  if (modal) {
    modal.hidden = true;
  }
}

function setFeedback(message, type = "info") {
  const node = document.querySelector("[data-admin-feedback]");
  if (!node) {
    return;
  }

  node.hidden = !message;
  node.className = `admin-feedback is-${type}`;
  node.textContent = message || "";
}

function sortBookings(bookings) {
  return [...bookings].sort((left, right) => {
    const startCompare = String(left.startDate || "").localeCompare(String(right.startDate || ""));
    if (startCompare !== 0) {
      return startCompare;
    }

    return String(left.id || "").localeCompare(String(right.id || ""));
  });
}

function sortRooms(rooms) {
  return [...rooms].sort((left, right) => {
    const leftNumber = Number.parseInt(left.roomNumber, 10);
    const rightNumber = Number.parseInt(right.roomNumber, 10);
    const bothNumeric = Number.isFinite(leftNumber) && Number.isFinite(rightNumber);

    if (bothNumeric && leftNumber !== rightNumber) {
      return leftNumber - rightNumber;
    }

    const labelCompare = formatRoomLabel(left).localeCompare(formatRoomLabel(right), undefined, { numeric: true, sensitivity: "base" });
    if (labelCompare !== 0) {
      return labelCompare;
    }

    return Number(left.id || 0) - Number(right.id || 0);
  });
}

function formatRoomLabel(room) {
  if (!room) {
    return "";
  }

  if (!room.roomNumber) {
    return room.name || "";
  }

  return `${room.name || ""} - ${room.roomNumber}`.trim();
}

function upsertBooking(booking) {
  const index = state.bookings.findIndex((item) => item.id === booking.id);
  if (index === -1) {
    state.bookings.push(booking);
  } else {
    state.bookings.splice(index, 1, booking);
  }
  state.bookings = sortBookings(state.bookings);
}

function formatCurrency(value) {
  if (value == null || value === "") {
    return "-";
  }

  return new Intl.NumberFormat(LOCALES[state.language], {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 2
  }).format(Number(value));
}

function formatCompactCurrency(value) {
  if (value == null || value === "") {
    return "-";
  }

  const amount = Number(value);
  const hasDecimals = !Number.isInteger(amount);
  const formattedAmount = new Intl.NumberFormat(LOCALES[state.language], {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0
  }).format(amount);

  return `${formattedAmount} RON`;
}

function formatPercent(value) {
  if (value == null || value === "") {
    return "0%";
  }

  return `${Math.round(Number(value) * 100)}%`;
}

function formatGroupedRoomNames(roomNames) {
  if (!Array.isArray(roomNames) || !roomNames.length) {
    return "-";
  }

  const groupedNames = roomNames.reduce((groups, roomName) => {
    const normalizedRoomName = String(roomName || "").trim();
    if (!normalizedRoomName) {
      return groups;
    }

    const existingGroup = groups.find((group) => group.name === normalizedRoomName);
    if (existingGroup) {
      existingGroup.count += 1;
      return groups;
    }

    groups.push({
      name: normalizedRoomName,
      count: 1
    });
    return groups;
  }, []);

  if (!groupedNames.length) {
    return "-";
  }

  return groupedNames.map((group) => `${group.count}x ${group.name}`).join(", ");
}

function formatBookingRoomTypes(booking) {
  if (Array.isArray(booking?.roomNames) && booking.roomNames.length) {
    return formatGroupedRoomNames(booking.roomNames);
  }

  return booking?.roomName || "-";
}

function formatBookingRoomNumbers(booking) {
  if (Array.isArray(booking?.roomNumbers) && booking.roomNumbers.length) {
    return booking.roomNumbers.filter(Boolean).join(", ") || "-";
  }

  return "-";
}

function formatRatePeriodsSummary(ratePeriods) {
  if (!Array.isArray(ratePeriods) || !ratePeriods.length) {
    return t("roomRatePeriodsEmpty");
  }

  return ratePeriods
    .map((period) => `${period.startDate} → ${period.endDate} · ${formatCurrency(period.ratePerNight)}${
      period.minimumNights ? ` · ${t("labelMinimumNights")}: ${period.minimumNights}` : ""
    }`)
    .join(" | ");
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const date = parseBackendDateTime(value);
  if (!Number.isFinite(date?.getTime())) {
    return String(value);
  }

  return date.toLocaleString(LOCALES[state.language], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatRatesMonthLabel(date) {
  return date.toLocaleDateString(LOCALES[state.language], {
    month: "long",
    year: "numeric"
  });
}

function formatStayRange(startDate, endDate) {
  if (!startDate || !endDate) {
    return "-";
  }

  return `${startDate} → ${endDate}`;
}

function getInitialRatesCalendarCursor(room) {
  const firstConfiguredPeriod = Array.isArray(room?.ratePeriods)
    ? [...room.ratePeriods]
      .filter((period) => period?.startDate)
      .sort((left, right) => String(left.startDate).localeCompare(String(right.startDate)))[0]
    : null;

  if (firstConfiguredPeriod?.startDate) {
    const firstConfiguredDate = parseLocalDateInput(firstConfiguredPeriod.startDate);
    if (firstConfiguredDate) {
      return formatLocalDateIso(startOfMonth(firstConfiguredDate));
    }
  }

  return formatLocalDateIso(startOfMonth(new Date()));
}

function getRatesCalendarMonthStart() {
  const selectedMonth = parseLocalDateInput(state.ratesCalendarCursor);
  return startOfMonth(selectedMonth || new Date());
}

function getRatesWeekdayLabels() {
  const mondayReference = new Date(2026, 5, 1);
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(mondayReference, index);
    return date.toLocaleDateString(LOCALES[state.language], { weekday: "short" });
  });
}

function buildRatesCalendarDays(room, monthStart) {
  const monthStartDayIndex = getMondayBasedDayIndex(monthStart);
  const calendarStart = addDays(monthStart, -monthStartDayIndex);

  return Array.from({ length: 42 }, (_, index) => {
    const currentDate = addDays(calendarStart, index);
    const currentDateIso = formatLocalDateIso(currentDate);
    const isCurrentMonth = currentDate.getMonth() === monthStart.getMonth();

    if (!isCurrentMonth) {
      return `<div class="admin-rates-calendar-day is-empty" aria-hidden="true"></div>`;
    }

    const configuredPeriod = findApplicableRatePeriod(room.ratePeriods, currentDateIso);
    const effectiveRate = configuredPeriod?.ratePerNight ?? room.ratePerNight;
    const minimumNights = configuredPeriod?.minimumNights;

    return `
      <article class="admin-rates-calendar-day ${configuredPeriod ? "is-override" : "is-base"}">
        <span class="admin-rates-calendar-date">${currentDate.getDate()}</span>
        <strong class="admin-rates-calendar-rate">${escapeHtml(formatCompactCurrency(effectiveRate))}</strong>
        ${minimumNights ? `
          <span class="admin-rates-calendar-minimum">${escapeHtml(t("roomRatesMinimumNightsShort", { count: minimumNights }))}</span>
        ` : ""}
      </article>
    `;
  }).join("");
}

function findApplicableRatePeriod(ratePeriods, dateIso) {
  if (!Array.isArray(ratePeriods) || !ratePeriods.length) {
    return null;
  }

  return ratePeriods.find((period) =>
    period?.startDate
    && period?.endDate
    && String(period.startDate) <= dateIso
    && String(period.endDate) >= dateIso
  ) || null;
}

function formatClientName(booking) {
  const fullName = `${booking.clientFirstName || ""} ${booking.clientLastName || ""}`.trim();
  const contactParts = [booking.clientEmail].filter(Boolean);
  if (fullName && contactParts.length) {
    return `${fullName} · ${contactParts.join(" · ")}`;
  }

  if (fullName) {
    return fullName;
  }

  return contactParts[0] || t("fallbackClient");
}

function toDateTimeLocalValue(value) {
  if (!value) {
    return "";
  }

  const date = parseBackendDateTime(value);
  if (!Number.isFinite(date?.getTime())) {
    return String(value).slice(0, 16);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function normalizeAdminAuth(auth) {
  if (!auth?.accessToken) {
    return null;
  }

  const expiresAt = parseBackendDateTime(auth.expiresAt);
  const expiresInSeconds = Number(auth.expiresInSeconds);
  const expiresAtMs = Number.isFinite(expiresAt?.getTime())
    ? expiresAt.getTime()
    : Number.isFinite(expiresInSeconds)
      ? Date.now() + (expiresInSeconds * 1000)
      : null;

  return {
    accessToken: auth.accessToken,
    tokenType: auth.tokenType || "Bearer",
    expiresInSeconds: Number.isFinite(expiresInSeconds) ? expiresInSeconds : null,
    expiresAt: auth.expiresAt || null,
    expiresAtMs
  };
}

function buildAdminPanelUrl() {
  if (!state.auth?.accessToken) {
    return "admin-panel.html";
  }

  const payload = encodeURIComponent(JSON.stringify(state.auth));
  return `admin-panel.html#${ADMIN_HASH_KEY}=${payload}`;
}

function readBrowserStorage(storageName, key) {
  try {
    const raw = window[storageName]?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeBrowserStorage(storageName, key, value) {
  try {
    window[storageName]?.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage restrictions.
  }
}

function removeBrowserStorage(storageName, key) {
  try {
    window[storageName]?.removeItem(key);
  } catch {
    // Ignore storage restrictions.
  }
}

function writeWindowNameAuth(auth) {
  try {
    const current = window.name ? JSON.parse(window.name) : {};
    if (auth) {
      current[ADMIN_WINDOW_NAME_KEY] = auth;
    } else {
      delete current[ADMIN_WINDOW_NAME_KEY];
    }
    window.name = JSON.stringify(current);
  } catch {
    if (auth) {
      window.name = JSON.stringify({ [ADMIN_WINDOW_NAME_KEY]: auth });
    }
  }
}

function readCookieAuth(name) {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((part) => part.startsWith(`${name}=`));

    if (!cookie) {
      return null;
    }

    const [, rawValue = ""] = cookie.split("=");
    return JSON.parse(decodeURIComponent(rawValue));
  } catch {
    return null;
  }
}

function writeCookieAuth(name, auth) {
  try {
    const normalized = normalizeAdminAuth(auth);
    if (!normalized) {
      removeCookieAuth(name);
      return;
    }

    const encoded = encodeURIComponent(JSON.stringify(normalized));
    const expires = Number.isFinite(Number(normalized.expiresAtMs))
      ? `; expires=${new Date(Number(normalized.expiresAtMs)).toUTCString()}`
      : "";
    document.cookie = `${name}=${encoded}; path=/; SameSite=Lax${expires}`;
  } catch {
    // Ignore cookie restrictions.
  }
}

function removeCookieAuth(name) {
  try {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  } catch {
    // Ignore cookie restrictions.
  }
}

function hydrateAdminAuthFromHash() {
  if (!window.location.hash || !window.location.hash.includes(`${ADMIN_HASH_KEY}=`)) {
    return;
  }

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  const params = new URLSearchParams(hash);
  const encoded = params.get(ADMIN_HASH_KEY);

  if (!encoded) {
    return;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(encoded));
    if (parsed?.accessToken) {
      saveAdminAuth(parsed);
    }
  } catch {
    // Ignore invalid hash payloads.
  }

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  } else {
    window.location.hash = "";
  }
}

function parseBackendDateTime(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  const normalized = String(value)
    .trim()
    .replace(" ", "T")
    .replace(/(\.\d{3})\d+$/, "$1");

  let date = new Date(normalized);
  if (Number.isFinite(date.getTime())) {
    return date;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(normalized)) {
    date = new Date(`${normalized}Z`);
  }

  return date;
}

function parseLocalDateInput(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = String(value).split("-").map(Number);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function getMondayBasedDayIndex(date) {
  return (date.getDay() + 6) % 7;
}

function formatLocalDateIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
