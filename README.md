# jhctal.com

Personal site and portfolio of Latchlern Jack, built with [Astro](https://astro.build).

Live at [www.jhctal.com](https://www.jhctal.com).

## Getting started

Requires Node 22.23+ and pnpm.

```sh
pnpm install
pnpm dev
```

The dev server runs at `localhost:4321`.

## Commands

| Command        | Action                                                       |
| :------------- | :----------------------------------------------------------- |
| `pnpm dev`     | Start the dev server                                         |
| `pnpm build`   | Build the site to `dist/`                                    |
| `pnpm preview` | Preview the production build locally                         |
| `pnpm og`      | Regenerate the social preview card (`src/assets/og.png`)     |
| `pnpm icons`   | Regenerate the favicon and app icons from `latch_logo.svg`   |

## Editing content

Most content lives in [`src/consts.ts`](src/consts.ts):

- `PROFILE`: name, role, tagline, location, time zone, status and email
- `PROJECTS`: the "Selected work" list on the homepage
- `NOW`: the "Now" list on the homepage and About page
- `SOCIALS`: links in the contact section and footer

The About page text is in [`src/pages/about.astro`](src/pages/about.astro).

After changing your name, role, tagline or location, run `pnpm og` so the social preview card matches. After changing `public/latch_logo.svg`, run `pnpm icons`.

## Structure

```text
public/
  latch_logo.svg      Logo, used for the favicon and light-mode header (source for `pnpm icons`)
  latch_logo_light.svg  White variant, used in the header in dark mode
  favicon.ico, icon-*.png, apple-touch-icon.png, site.webmanifest   Generated icons
scripts/
  og.mjs              Social preview card generator
  icons.mjs           Icon set generator
src/
  assets/og.png       Generated social preview card
  components/         Header, footer, hero, theme toggle, Now list
  layouts/Base.astro  Page shell shared by every page
  pages/              index (homepage) and about
  styles/global.css   Colour tokens for light/dark mode and shared styles
  consts.ts           Site content
```

## Notes

- **Theme:** light and dark mode follow the system setting until the visitor uses the toggle. The choice is saved in `localStorage`.
- **Hero:** the interactive dot field and the name's weight change are in `src/components/Hero.astro`. Both respect `prefers-reduced-motion`.
- **Fonts:** Geist, Geist Mono and Instrument Serif load through Astro's font API (see `astro.config.mjs`).
