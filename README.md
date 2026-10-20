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
src/data/repositories.ts ← repository catalog, section, visibility and public GitHub URL
scripts/logos.mjs      ← the logo system: one master mark → all child logos
scripts/og-images.py   ← social preview images (optional, needs Python + Playwright)
src/views/             ← page templates shared by all brands
src/app/               ← routes (root = main brand, [brand]/ = every sub-brand)
public/logos/          ← generated SVG logos (<id>.svg tile, <id>-mark.svg no tile)
```

## Common jobs

**Add a project or service page.** Copy an entry in `src/data/projects.ts`, change `brand`, `slug` and the text. Entries with `sample: true` are placeholders: replace or delete them (they are hidden from Google until then).

**Add a Products app.** Use `brand: "products"` and set its `platforms` (Android, iOS, web, desktop or private). Store, web and download URLs are optional; buttons appear only when a URL is set. Private apps show a request-access link.

**Update the repository catalog.** Add or edit an entry in `src/data/repositories.ts` with its Coding Moves `areas` and current GitHub visibility. A repository may appear in several areas. Public entries have an explicit GitHub URL; private entries have no URL and render “Only the owner can see this repository.” The main homepage lists every entry, and area homepages list entries assigned to that area. Being public does not itself grant reuse rights: check each repository's license. Recheck GitHub visibility before changing an entry from private to public.

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

Netlify reads the exported contact forms during deployment. Follow the notification setup below whenever form fields change. Git-based continuous deployment can be connected when you're ready.

## Contact form emails

In **Netlify → Forms**, enable form detection, then redeploy. Netlify must parse the new form fields from the deployed HTML.

Under **Notifications → Form submission notifications**, add these **Email notification** rules:

| Send to | Form |
|---|---|
| `contactmuawia@gmail.com` | Any form |
| `contactahmadhassann@gmail.com` | `contact-services` |

The notification comes from Netlify and includes the submitted fields, including the customer's email and phone when provided. Replying to the notification goes to the customer because the form field is named `email`. Check the spam folder for the first notification.

When you buy a domain, add it in Netlify → **Domain management**, then change `SITE_URL` in `src/data/site.ts` and redeploy.

## Before launch checklist

- [x] Remove sample projects before launch
- [x] Set `githubUrl` in `src/data/site.ts`; add an email address there if needed
- [ ] Read every page out loud once. Does it sound like you?
- [ ] Submit `/sitemap.xml` in Google Search Console after the domain is live
