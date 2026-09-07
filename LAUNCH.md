# RC7 launch notes

The five routes are implemented in the existing Next.js App Router. Business details, services, assets, sample reviews, and estimate delivery are centralized in `app/lib/site.ts`.

## Confirm before launch

- Reviews are illustrative placeholders, visibly labeled “Sample review.” Replace them with approved customer content or set `reviews.enabled` to `false`. No ratings or review structured data are emitted.
- The supplied contact details are Isaid Rangel, 682-203-3923, Rc7Isa@gmail.com, and the supplied Facebook profile. Confirm these destinations before publishing.
- No service area, address, hours, credentials, experience figures, warranties, or real customer testimonials were supplied. The site deliberately makes no claims about them. Confirm any future additions with the owner.
- Estimates use an email draft, addressed to Rc7Isa@gmail.com. A visitor must have an email app configured, review the draft, and send it. The website neither sends nor stores submissions. Call and direct email alternatives are visible. `delivery` and `emailDraft()` are the central integration points for a future backend.

## Assets and motion

The supplied photos, logo, and original 4.46 MB video are hosted in `public/assets`. The poster is the first frame extracted through Cloudinary from the supplied video. Next Image optimizes local photographs. No remote image configuration is needed because all rendered images are local.

The video source is assigned only when autoplay is appropriate or the visitor chooses play. Reduced-motion and data-saving preferences show the poster without fetching the video. Geist is self-hosted, with its license in `app/fonts/OFL.txt`, so builds do not depend on Google Fonts.

## Verification

Run `npm run lint` and `npm run build`. Browser checks in `scripts/verify.mjs`, `scripts/interactions.mjs`, and `scripts/final-checks.mjs` use a temporary Playwright installation (`npm install --no-save --package-lock=false playwright`) and the locally installed Chrome executable; adjust the executable path for another machine. Start the app on port 3000 before running these scripts. Playwright is not a production dependency.

The checks cover all routes at desktop, tablet, and mobile widths; menu focus and Escape handling; lightbox navigation; service preselection; form validation and email encoding; video playback and preference fallbacks; stacking offsets; and carousel controls and pause behavior. Review screenshots are written to `artifacts/`.
