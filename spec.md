# Specification

## Summary
**Goal:** Build an educational events website where users can submit events with photos and a review, and browse them in a themed gallery with a transparent review overlay.

**Planned changes:**
- Create a Motoko backend data model and API to submit events (title, description, optional date/location, review text, image bytes + MIME type) and list all events, persisting across upgrades.
- Build a frontend events gallery that fetches and displays events as photo cards with the review text styled transparently over/alongside the image, including an empty state when no events exist.
- Add a frontend “Submit Event” form with validation (title, review text, image required), image upload (JPEG/PNG/WebP), submission handling, and success/error messaging; refresh the gallery after submission without manual reload.
- Apply a cohesive educational/professional Tailwind theme across gallery and submission views, avoiding blue/purple as primary colors and keeping all user-facing text in English.

**User-visible outcome:** Users can view a gallery of educational/useful event photos with readable transparent review text, submit new events with an image and review via a form, and see newly submitted events appear in the gallery immediately.
