# itsadee.com — Build Notes

## What has been built

A single-page, text-first personal portfolio has been created from an empty workspace using Next.js 16, React 19, TypeScript, Tailwind CSS v4, `next-themes`, and Lucide.

The site is designed as an original portfolio informed by the compact editorial structure of Animesh and the technical grid discipline of Chánh Đại. It does not copy either site's identity, source code, avatar, or content.

## Visual direction implemented

- Black-and-white-first light and dark themes with a restrained electric-blue interaction accent.
- Compact profile header rather than a large landing-page hero.
- Fine grid lines, framed center content column, hatched section bands, mono metadata, and a desktop INDEX rail.
- Text-only project presentation: there are no product screenshots, thumbnails, or mockup cards.
- An original monochrome illustrated avatar replaces a personal photo.
- A small custom cursor-following cat appears on desktop fine-pointer devices only; it is disabled on touch devices and for reduced-motion preferences.

## Content decisions implemented

- Positioning: **Software Developer · Product-minded builder**.
- Public “Open to work” language has been removed.
- No phone number is displayed.
- Social/contact links: email, LinkedIn, GitHub, and X.
- Featured projects, in order: Fettle, Rubrii, DeFile, Streetbyte.
- Supporting work: PickUmrah, RentPay, Testie, Neuropal, Sanjivani Banquet, and DCA Academy.
- Experience uses accessible accordion rows for Creatoactive Studios, Tentaxaur Studio, Jade Studios, Neuropal, DataCrush Analytics, and LearnyFox Studio.
- Product-management interest is shown through wording about scope, interface, delivery, and product ownership; the site does not claim a Product Manager title.

## Important files

| Path | Purpose |
|---|---|
| `app/page.tsx` | Homepage structure and portfolio content presentation |
| `app/globals.css` | Complete visual system, responsive layout, themes, grid, and mascot styling |
| `app/data/portfolio.ts` | Typed source of truth for projects, experience, skills, and social links |
| `app/components/` | Theme, header, desktop INDEX, experience accordion, and mascot behavior |
| `public/adee-avatar.png` | Original generated illustrated avatar |
| `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | SEO, crawler, and sharing metadata |

## Verification completed

- `npm run lint` passes.
- `npm run build` passes and statically generates `/`, Open Graph image, robots, and sitemap routes.
- Desktop preview was visually reviewed at `http://localhost:3001`.
- Theme toggle and experience accordion interactions were tested.

## Remaining before deployment

1. Provide an updated résumé PDF, then add it as `public/resume/adee-shaikh-resume.pdf` and expose the résumé link in the header/footer.
2. Review wording and project ordering in `app/data/portfolio.ts` and adjust any project claims or dates.
3. Create a Vercel project, connect this directory, and set `itsadee.com` as the production domain.
4. Perform a final mobile-device review and production-preview link check.
