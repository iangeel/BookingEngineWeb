# Booking Engine Web

Standalone booking-flow frontend for hospitality businesses, built with semantic HTML, CSS, and vanilla JavaScript.

## Files

- `index.html`: booking-entry page with search, flow explanation, and room preview
- `rooms.html`: room selection and availability presentation
- `booking.html`: guest details form and booking summary
- `confirmation.html`: booking status and payment outcome variants
- `css/styles.css`: shared design tokens, layout system, and component styling
- `css/responsive.css`: tablet and desktop breakpoints
- `js/api.js`: mock service layer aligned to backend endpoints
- `js/app.js`: page behavior, local state, and booking journey logic
- `assets/*.svg`: original local illustration assets for hero and room cards

## How to Run Locally

Because the project uses ES modules, serve it through a simple local HTTP server instead of opening files directly.

### Option 1

```bash
npx serve .
```

### Option 2

```bash
python3 -m http.server 3000
```

Then open:

- `http://localhost:3000/index.html`

## Backend Integration

The frontend is already organized around these future backend targets:

- `GET /api/availability`
- `POST /api/bookings`
- `PATCH /api/bookings/{id}/client?token=`
- `POST /api/bookings/{id}/payment?token=`
- `GET /api/bookings/{id}?token=`

### Suggested next steps

1. Set a real `API_BASE_URL` in `js/api.js`, ideally from an environment-specific config file or deployment-time injected script.
2. Replace the mock data inside `getAvailability()` with a real `fetch()` call that maps `RoomAvailabilityInfo` records into room cards.
3. Replace `createBooking()` with a `POST /api/bookings` call using:

```json
{
  "roomId": 1,
  "startDate": "2026-06-06",
  "endDate": "2026-06-09"
}
```

4. Persist the returned booking `id` and `token` client-side for the next steps in the flow.
5. On `booking.html`, submit guest details to `PATCH /api/bookings/{id}/client?token=` with:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

6. Trigger `POST /api/bookings/{id}/payment?token=` after client data is saved and redirect the browser to the returned `paymentUrl`.
7. On `confirmation.html`, call `GET /api/bookings/{id}?token=` to render the final booking and payment status variant.

## Deployment Model

Recommended production setup:

- Deploy static frontend files to Nginx, Cloudflare Pages, Netlify, Vercel static hosting, or S3 + CDN.
- Route API requests to the BookingOrchestrator backend under `/api`.
- Use separate environments for local, staging, and production API base URLs.
- Add analytics and error tracking after live backend wiring, not before.

## Notes

- The design is mobile-first and optimized for a focused direct-booking journey.
- This app is meant to be linked from a hotel's or property's own presentation website, not replace it.
- Property storytelling and reviews are intentionally minimized here so the UI stays centered on conversion and booking flow.
- The confirmation screen includes success, pending, and failed payment variants.
- All current API interactions are mocked to keep this repository frontend-only.
