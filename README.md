# Booking Engine Web

Standalone booking-flow frontend for hospitality businesses, built with semantic HTML, CSS, and vanilla JavaScript.

## Files

- `index.html`: entry page with stay search only
- `rooms.html`: availability results page after the guest submits the search
- `booking.html`: guest details form and booking summary
- `confirmation.html`: booking status and payment outcome variants
- `admin.html`: administrator login entry point
- `admin-panel.html`: administrator operations panel for bookings and room actions
- `css/styles.css`: shared design tokens, layout system, and component styling
- `css/responsive.css`: tablet and desktop breakpoints
- `js/api.js`: real API service layer aligned to `BookingOrchestratorAPI`
- `js/app.js`: page behavior, local state, and booking journey logic
- `js/admin.js`: administrator login and panel controller
- `assets/*.svg`: original local illustration assets for hero and room cards

## How to Run Locally

Use the bundled local dev server so the frontend is served on `localhost:3000` and `/api` is proxied to `BookingOrchestratorAPI` on `localhost:8080`.

```bash
npm start
```

Then open:

- `http://localhost:3000/index.html`
- `http://localhost:3000/admin.html`

## Backend Integration

The frontend is now wired to the live public backend endpoints exposed by `BookingOrchestratorAPI`:

- `GET /api/availability?guests=`
- `POST /api/bookings`
- `PATCH /api/bookings/{id}/client?token=`
- `POST /api/bookings/{id}/payment?token=`
- `GET /api/bookings/{id}?token=`
- `POST /api/admin/auth/login`
- `GET/POST/PUT/DELETE /api/admin/rooms`
- `GET/POST/PUT/DELETE /api/admin/bookings`

### Current integration assumptions

1. The backend runs with servlet context path `/api`.
2. By default, the frontend calls relative URLs such as `/api/availability` and `/api/bookings`.
3. For local development, this repository now includes a small Node proxy server that forwards `/api/*` to `http://localhost:8080/api/*`.

### Optional API base override

If you need to point the frontend at a different backend origin, define this before loading `js/app.js`:

```html
<script>
  window.BOOKING_API_BASE_URL = "http://localhost:8080/api";
</script>
```

### Real request flow

1. `GET /api/availability?guests=...`
   `index.html` submits the selected check-in, check-out, and guest count, fetches availability, stores the result in frontend state, and redirects the guest to `rooms.html`.

2. `POST /api/bookings`
   Sends:

```json
{
  "roomId": 1,
  "roomIds": [1],
  "guestCount": 2,
  "startDate": "2026-06-06",
  "endDate": "2026-06-09"
}
```

3. `PATCH /api/bookings/{id}/client?token=...`
   Sends:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

4. `POST /api/bookings/{id}/payment?token=...`
   Uses the backend-calculated amount and redirects the user to the returned `paymentUrl`.

5. `GET /api/bookings/{id}?token=...`
   Used on the confirmation page to render the real booking status.

### Admin request flow

1. `POST /api/admin/auth/login`
   `admin.html` authenticates the administrator, stores the JWT response in local storage with its expiry metadata, and redirects to `admin-panel.html`.

2. `GET /api/admin/rooms` and `GET /api/admin/bookings`
   `admin-panel.html` loads protected data after login and when the operator refreshes the console.

3. `POST /api/admin/rooms`, `PUT /api/admin/rooms/{id}`, `DELETE /api/admin/rooms/{id}`
   Used by the room popup flow opened from the admin panel.

4. `POST /api/admin/bookings`, `PUT /api/admin/bookings/{id}`, `DELETE /api/admin/bookings/{id}`, `GET /api/admin/bookings/{id}`
   Used by the bookings-first admin panel, including row selection, edit popup flows, multi-room selection, and manual status/token overrides.

## Deployment Model

Recommended production setup:

- Deploy static frontend files to Nginx, Cloudflare Pages, Netlify, Vercel static hosting, or S3 + CDN.
- Route API requests to the BookingOrchestrator backend under `/api`.
- Use separate environments for local, staging, and production API base URLs.
- Add analytics and error tracking after live backend wiring, not before.

## Notes

- The design is mobile-first and optimized for a focused direct-booking journey.
- The main flow now follows a clean handoff: `index.html` for search, `rooms.html` for availability, `booking.html` for guest details, and `confirmation.html` for status.
- This app is meant to be linked from a hotel's or property's own presentation website, not replace it.
- Property storytelling and reviews are intentionally minimized here so the UI stays centered on conversion and booking flow.
- The confirmation screen now maps to real backend booking states instead of mock-only variants.
- The entry page uses a simple `+ / -` guest counter instead of a predefined guest dropdown, with `2` guests as the default.
- The booking page shows the already selected guest count as a read-only value so it stays aligned with the backend `guestCount` used when the booking was created.
- The admin flow is intentionally split into a login entry point and a bookings-first operational panel, with popup create or edit flows instead of large inline editors.
