# Kalandra National Statistics — best-national-statistics-site

[![badge](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ujang201/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ujang201/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original national statistics site for the fictional **Republic of Kalandra**,
published by the fictional **Kalandra National Statistics Office (KNSO)**.
It shows the figures a visitor exploring a country's statistics needs —
population, economy, health, education and the six regions — with every figure
citing its source and year, and every control doing what it says.

## What it covers

- **Dashboard** — key indicators for 2025 (population 19.55 million, GDP 481.9 bn KCR,
  unemployment 4.6%, inflation 2.5%, life expectancy 75.5 years, literacy 98.0%),
  population and GDP-growth charts, and the latest KNSO releases.
- **Population** — year picker (2019–2025), bar/line chart toggle, age structure
  from the Census 2024, urban/rural split, and vital statistics.
- **Economy** — year picker, chart toggle, GDP/trade/sectors tabs, and a full
  2019–2025 table of GDP, growth, inflation and unemployment.
- **Health** — doctors and beds per 10,000 people, infant mortality, health
  spending, and the leading causes of death for 2024.
- **Education** — literacy and enrolment at primary, secondary and tertiary level,
  2019–2025, plus education spending.
- **Regions** — region picker and live search across the six regions of Kalandra,
  compared on population, unemployment, GDP per capita and density.
- **Methodology & Sources** — every source publication and the methods behind
  the figures.

All data are the fictional KNSO's own published figures, held in `app/data.js`.
Nothing is copied from any real statistics office.

## How to run

Serve `app/` with any static HTTP server and open `index.html`:

```sh
cd app
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a desktop browser or on a phone.
The site is fully static and works with no network request: every script,
stylesheet and figure is a file under `app/`.

## Files

- `app/index.html` — the page shell: header, navigation, footer.
- `app/style.css` — the site's own design (deep teal + warm amber).
- `app/data.js` — all KNSO figures: population, economy, health, education, regions.
- `app/charts.js` — vanilla canvas bar charts, line charts and share bars.
- `app/views.js` — renders each hash-route page and draws its charts.
- `app/main.js` — router and control wiring (year picker, chart toggle, tabs, search).
- `main.ts` — the entry program: copies `app/` and `screenshots/` to `/output`
  and writes `/output/dossier.json` with `buildDossier` from
  `vendor/makefun-frontend.ts`.
- `screenshots/` — real renders of the site in a browser (cover first by name).

## Screenshots

Four screenshots, all real renders of this site in headless Chromium:

1. `1-overview.png` — the dashboard on desktop (1280×950).
2. `2-economy.png` — the economy page on desktop (1280×800).
3. `3-regions.png` — the regions page on desktop (1280×800).
4. `4-phone.png` — the population page on a phone (390×844).

## License

MIT — see [LICENSE](LICENSE).

---

https://make.fun/r/wfjv7kgb
