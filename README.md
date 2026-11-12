# Toronto Tech Week 2027: site refresh (demo)

A bolder redesign of torontotechweek.com that addresses the client's feedback on Concepts 1 to 4 and the Partner Perks page.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Design system
- **One core colour: Volt `#2E46FF`.** A 10-step Volt ramp plus Ink `#04050D` and Paper `#F3F4F9`. Every gradient (`.grad-volt`, `.grad-plasma`, `.grad-horizon`, `.text-volt-grad`) is built from the Volt ramp. Category tags on Perks are the only multi-hue element (the client asked for colour-coded tags), and they're limited to a small dot and outline.
- **Type:** TTW's existing volksans and Decima Mono (in `public/fonts`). Hierarchy comes from scale, tight tracking and a hairline stroke on display sizes (volksans ships only two weights).
- **Linework:** 1.5px high-contrast rules, framed columns and registration crosshairs at every intersection.
- **Light/dark:** there's no toggle. Each section declares `data-tone`, and `components/PageFx.tsx` flips `html[data-tone]` as sections cross the middle of the viewport. Colours are registered `@property` variables, so the whole page crossfades (`app/globals.css`).

- **Accent:** Signal `#D4FF3A` (electric lime) is the one supplementary colour. It's used for primary CTAs, live states, the track system, stat suffixes and the presenting-sponsor billboards.
- **Tone rhythm:** two swaps on the homepage only: night (hero + hosts) → day (sponsors, partners, impact) → night (community + footer).
- **Track system:** `components/RailTrack.tsx`. A double rail leaves the hero street, bends down the gutter column of every page, passes a "Stop 0X" station at each section head (lit as you pass), and carries a tram that rides with scroll. The line ends at a buffer stop.
- **Hero city:** about 3× wider drive range (±3000 units) with end-of-line buffer stops. Rooftop billboards carry the presenting sponsors in frame, with signature, supporting, founding and featured hosts along the line.
- **Preloader:** `components/Preloader.tsx`. A wireframe globe inside a rotating ring of type, with a track progress bar. It shows once per session; add `?nopreload` to skip it.

## Feedback → implementation
| Ask | Where |
| --- | --- |
| Nav balance (FAQ moved right) | `components/Nav.tsx` |
| Headline hierarchy, one-line supporting copy | `components/hero/Hero.tsx` |
| Streetcar centred, joystick + streetcar animate together, closer zoom, higher-fidelity skyline | `components/hero/*`: 3-layer parallax SVG with extruded buildings and Toronto landmarks; an idle autopilot moves the joystick and streetcar together; drag, arrow buttons or keyboard to drive |
| 2027 presenting sponsors (Google for Startups removed, 4th slot TBA) | `data/sponsors.ts` |
| Hosts count from data, "Feature on Homepage" curation, two-way carousel, CTA to commitment form | `data/hosts.ts`, `components/home/Hosts.tsx` |
| Homepage order: Hosts → Sponsors → Founding/In-Kind → 2026 stats → Social wall | `app/page.tsx` |
| Social wall with 12 posts, animated columns | `components/home/SocialWall.tsx` |
| Founding Partners (incl. Sage, pending confirmation) + In-Kind Partners | `data/sponsors.ts` |
| Full A–Z host list | `/partners` |
| Perks: partner carousel, colour-coded tags, auto offer count/value, approval status, For Attendees filter, search/sort | `components/perks/PerksClient.tsx`, `data/perks.ts` |
| Sign-in (Google / Microsoft / email code), 3 questions, beehiiv opt-in, unlocked state, redemption | `components/perks/AuthModal.tsx`, `RedeemModal.tsx` |
| Analytics plan | `lib/analytics.ts` (dataLayer events: `perk_impression`, `perk_click`, `perk_redeem`, `account_created{source}`, …) |

## Placeholders / TODO
- Form, beehiiv and report URLs: `lib/site.config.ts`
- Data files are shaped like the proposed Airtable tables. Swap them for an Airtable fetch at build time (or via ISR).
- Signature tier, social posts, perks and the topic list are demo content.
- Auth is simulated client-side. Production would use OAuth + email OTP (e.g. Clerk/Auth.js) and a server route for beehiiv.
- Logos in `public/logos` were fetched from public sources. Organizations without a file render as a consistent wordmark.
