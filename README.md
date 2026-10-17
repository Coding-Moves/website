# Coding Moves website

**Build. Explore. Impact.** One website for the whole Coding Moves family. Each brand has its own logo, colour and pages.

| Brand | Home | About | Contact | Project pages |
|---|---|---|---|---|
| Coding Moves (main) | `/` | `/about/` | `/contact/` | n/a |
| Services | `/services/` | `/services/about/` | `/services/contact/` | `/services/<slug>/` |
| Lab | `/lab/` | `/lab/about/` | `/lab/contact/` | `/lab/<slug>/` |
| Open Source | `/open-source/` | `/open-source/about/` | `/open-source/contact/` | `/open-source/<slug>/` |
| Products | `/products/` | `/products/about/` | `/products/contact/` | `/products/<slug>/` |
| Research *(in progress)* | `/research/` | … | … | `/research/<slug>/` |
| Academy *(in progress)* | `/academy/` | … | … | `/academy/<slug>/` |

## Run it

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static site in /out
```

## Where things live

```text
src/data/site.ts       ← site URL, GitHub, email (change SITE_URL when you buy the domain)
src/data/brands.ts     ← every brand: name, colours, all page text
src/data/projects.ts   ← every project / service page (vision, problem, idea, features)
scripts/logos.mjs      ← the logo system: one master mark → all child logos
scripts/og-images.py   ← social preview images (optional, needs Python + Playwright)
src/views/             ← page templates shared by all brands
src/app/               ← routes (root = main brand, [brand]/ = every sub-brand)
public/logos/          ← generated SVG logos (<id>.svg tile, <id>-mark.svg no tile)
```

## Common jobs

**Add a project or service page.** Copy an entry in `src/data/projects.ts`, change `brand`, `slug` and the text. Entries with `sample: true` are placeholders: replace or delete them (they are hidden from Google until then).

**Add a new brand** (e.g. Team, Media):
1. Add it to `BRANDS` in `src/data/brands.ts` (`status: "in-progress"` until ready).
2. Add its colours + badge icon to `VARIANTS` in `scripts/logos.mjs`, then `npm run logos`.
3. Add its id to the `BrandId` type. Menus, footer, sitemap and pages update by themselves.

**Logos.** Every logo comes from the same master "C + chevrons" tile. A child logo only changes the colour and adds a corner badge. Edit `scripts/logos.mjs` and run `npm run logos` (it also runs on every build).

## Deploy to Netlify

Production site: [codingmoves.netlify.app](https://codingmoves.netlify.app). Netlify builds with `npm run build` and publishes `out`, as configured in `netlify.toml`.

The site was initially deployed with Netlify CLI. In a fresh checkout, sign in to the Coding Moves Netlify team and link the existing site before publishing:

```bash
npm ci
netlify login
netlify link --id d947983b-41e4-4af9-b63b-7a3bc82040cd
netlify deploy --prod --dir=out
```

Form detection is enabled for this site. After a deploy, verify the seven contact forms in **Netlify → Forms**. Configure email notifications there if needed. Git-based continuous deployment can be connected after the source reaches `main`.

When you buy a domain, add it in Netlify → **Domain management**, then change `SITE_URL` in `src/data/site.ts` and redeploy.

## Before launch checklist

- [x] Remove sample projects before launch
- [x] Set `githubUrl` in `src/data/site.ts`; add an email address there if needed
- [ ] Read every page out loud once. Does it sound like you?
- [ ] Submit `/sitemap.xml` in Google Search Console after the domain is live
