// views.js — renders every page of the site from data.js.
// One job: given a route name, return the page's HTML and draw its charts.
// All state (year, chart type, region, search text) lives in the exported
// `state` object so main.js can re-render on any control change.

import {
  META, POPULATION, AGE_GROUPS, VITAL, ECONOMY, SECTORS, TRADE,
  HEALTH, CAUSES_OF_DEATH, EDUCATION, REGIONS, KEY_INDICATORS, RELEASES,
  byYear, fmt,
} from "./data.js";
import { drawBarChart, drawLineChart, drawShareBar } from "./charts.js";

export const state = {
  year: 2025,
  chart: "bar",
  region: "All regions",
  query: "",
  econTab: "gdp",
};

export const ROUTES = [
  { id: "dashboard", label: "Dashboard" },
  { id: "population", label: "Population" },
  { id: "economy", label: "Economy" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
  { id: "regions", label: "Regions" },
  { id: "methodology", label: "Methodology & Sources" },
];

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function yearOptions() {
  return META.years.map((y) => `<option value="${y}"${y === state.year ? " selected" : ""}>${y}</option>`).join("");
}

function yearPicker(label) {
  return `<label class="picker">${label} <select id="year-select" aria-label="${label}">${yearOptions()}</select></label>`;
}

function chartToggle() {
  return `<span class="toggle" role="group" aria-label="Chart type">
    <button type="button" data-chart="bar"${state.chart === "bar" ? ' class="active" aria-pressed="true"' : ""}>Bars</button>
    <button type="button" data-chart="line"${state.chart === "line" ? ' class="active" aria-pressed="true"' : ""}>Line</button>
  </span>`;
}

function draw(canvasId, points, unit, decimals) {
  const el = document.getElementById(canvasId);
  if (!el) return;
  if (state.chart === "line") drawLineChart(el, points, { unit, decimals });
  else drawBarChart(el, points, { unit, decimals });
}

function kpiCards(cards) {
  return `<div class="kpis">${cards.map((c) => `<article class="kpi">
    <h3>${c.label}</h3><p class="big">${c.value}</p><p class="delta">${c.change}</p>
    <p class="source">${c.source}</p></article>`).join("")}</div>`;
}

function renderDashboard() {
  const pop = byYear(POPULATION, 2025);
  const econ = byYear(ECONOMY, 2025);
  const cards = KEY_INDICATORS.map((k) => ({
    label: k.label, value: k.value, change: k.change, source: k.source,
  }));
  return `<section>
    <h1>Republic of Kalandra — National Statistics</h1>
    <p class="lede">Official statistics from the Kalandra National Statistics Office (KNSO):
    population, the economy, health and education for the Republic of Kalandra,
    published in the Statistical Yearbook 2025.</p>
    ${kpiCards(cards)}
    <div class="grid2">
      <article class="card"><h2>Population, 2019–2025</h2>
        <canvas id="chart-pop" width="640" height="260" aria-label="Population chart"></canvas>
        ${sourceLine("KNSO, Population Estimates 2025. Total resident population, mid-year, millions.")}
        <p><a href="#/population">Explore population in detail →</a></p></article>
      <article class="card"><h2>Real GDP growth, 2019–2025</h2>
        <canvas id="chart-gdp" width="640" height="260" aria-label="GDP growth chart"></canvas>
        ${sourceLine("KNSO, National Accounts 2025. Annual change in real GDP, percent.")}
        <p><a href="#/economy">Explore the economy in detail →</a></p></article>
    </div>
    <article class="card"><h2>Latest releases</h2>
      <ul class="releases">${RELEASES.map((r) => `<li><strong>${r.date}</strong> — ${r.title}<br><span>${r.note}</span></li>`).join("")}</ul>
    </article>
    <article class="card"><h2>Spotlight: Central Kalandra</h2>
      <p>Central Kalandra — home of the capital, Kalandra City — holds
      <strong>6.14 million people</strong>, 31% of the whole country, and the
      highest GDP per capita of any region at <strong>31,220 KCR</strong>.
      Its unemployment rate, 4.3%, is the second lowest in the country.
      The smallest region, the Highlands, has 0.58 million people and the
      lowest density at 18 people per km².</p>
      ${sourceLine("KNSO, Regional Statistics 2025.")}
      <p><a href="#/regions">Compare all six regions →</a></p>
    </article>
    <p class="note">Population ${fmt(pop.total)} million · GDP ${fmt(econ.gdp)} bn KCR · GDP per capita ${fmt(econ.gdpPerCapita, 0)} KCR, all 2025.</p>
  </section>`;
}

function renderPopulation() {
  const row = byYear(POPULATION, state.year);
  const vital = byYear(VITAL, state.year);
  const points = POPULATION.map((r) => ({ label: r.year, value: r.total }));
  const urbanShare = ((row.urban / row.total) * 100).toFixed(1);
  return `<section>
    <h1>Population</h1>
    <p class="lede">How many people live in Kalandra, where they live, and how the
    population is changing. Figures are mid-year estimates from the KNSO.</p>
    <div class="controls">${yearPicker("Year")}${chartToggle()}</div>
    ${kpiCards([
      { label: "Total population, " + state.year, value: fmt(row.total) + " million", change: "Urban share " + urbanShare + "%", source: "KNSO, Population Estimates 2025" },
      { label: "Life expectancy, " + state.year, value: fmt(vital.lifeExpectancy) + " years", change: "Fertility rate " + fmt(vital.fertility, 2), source: "KNSO, Vital Statistics 2025" },
      { label: "Births per 1,000, " + state.year, value: fmt(vital.births), change: "Deaths per 1,000: " + fmt(vital.deaths), source: "KNSO, Vital Statistics 2025" },
    ])}
    <article class="card"><h2>Total population, 2019–2025 (millions)</h2>
      <canvas id="chart-pop-trend" width="640" height="260"></canvas>
      ${sourceLine("KNSO, Population Estimates 2019–2025.")}
    </article>
    <div class="grid2">
      <article class="card"><h2>Age structure, Census 2024</h2>
        <table><thead><tr><th>Age group</th><th>Share</th><th>People (m)</th></tr></thead>
        <tbody>${AGE_GROUPS.map((a) => `<tr><td>${a.group}</td><td>${fmt(a.share)}%</td><td>${fmt(a.count, 2)}</td></tr>`).join("")}</tbody></table>
        ${sourceLine("KNSO, Population and Housing Census 2024.")}
      </article>
      <article class="card"><h2>Urban and rural, ${state.year}</h2>
        <p>Urban: <strong>${fmt(row.urban)} million</strong> (${urbanShare}%)</p>
        <p>Rural: <strong>${fmt(row.rural)} million</strong> (${fmt(100 - Number(urbanShare))}%)</p>
        <canvas id="chart-urban" width="640" height="34" aria-label="Urban rural share bar"></canvas>
        <p>The urban share has risen every year since 2019, when it was 60.0%.</p>
        ${sourceLine("KNSO, Population Estimates 2025.")}
      </article>
    </div>
    <article class="card"><h2>Vital statistics, 2019–2025</h2>
      <table><thead><tr><th>Year</th><th>Births / 1,000</th><th>Deaths / 1,000</th><th>Fertility rate</th><th>Life expectancy</th></tr></thead>
      <tbody>${VITAL.map((v) => `<tr${v.year === state.year ? ' class="hl"' : ""}><td>${v.year}</td><td>${fmt(v.births)}</td><td>${fmt(v.deaths)}</td><td>${fmt(v.fertility, 2)}</td><td>${fmt(v.lifeExpectancy)}</td></tr>`).join("")}</tbody></table>
      ${sourceLine("KNSO, Vital Statistics 2025.")}
    </article>
  </section>`;
}

function renderEconomy() {
  const row = byYear(ECONOMY, state.year);
  const tab = state.econTab;
  const gdpPoints = ECONOMY.map((r) => ({ label: r.year, value: r.gdp }));
  const tradeRow = TRADE.find((t) => t.year === state.year);
  const surplus = tradeRow.exports - tradeRow.imports;
  let tabBody = "";
  if (tab === "gdp") {
    tabBody = `<canvas id="chart-gdp-trend" width="640" height="260"></canvas>
      ${sourceLine("KNSO, National Accounts 2025. GDP in billion KCR, constant 2020 prices.")}`;
  } else if (tab === "sectors") {
    tabBody = `<canvas id="chart-sectors" width="640" height="34"></canvas>
      <table><thead><tr><th>Sector</th><th>Share of value added</th></tr></thead>
      <tbody>${SECTORS.map((s) => `<tr><td>${s.sector}</td><td>${fmt(s.share)}%</td></tr>`).join("")}</tbody></table>
      ${sourceLine("KNSO, National Accounts 2025. Shares for 2025.")}`;
  } else {
    tabBody = `<table><thead><tr><th>Year</th><th>Exports (bn KCR)</th><th>Imports (bn KCR)</th><th>Balance</th></tr></thead>
      <tbody>${TRADE.map((t) => `<tr${t.year === state.year ? ' class="hl"' : ""}><td>${t.year}</td><td>${fmt(t.exports)}</td><td>${fmt(t.imports)}</td><td>${fmt(t.exports - t.imports, 1)}</td></tr>`).join("")}</tbody></table>
      ${sourceLine("KNSO, External Trade Statistics 2025. Current prices, billion KCR.")}`;
  }
  return `<section>
    <h1>Economy</h1>
    <p class="lede">National accounts, prices, the labour market and trade for the
    Republic of Kalandra, as published by the KNSO.</p>
    <div class="controls">${yearPicker("Year")}${chartToggle()}</div>
    ${kpiCards([
      { label: "GDP, " + state.year, value: fmt(row.gdp) + " bn KCR", change: "Growth " + fmt(row.growth) + "%", source: "KNSO, National Accounts 2025" },
      { label: "GDP per capita, " + state.year, value: fmt(row.gdpPerCapita, 0) + " KCR", change: "Constant 2020 prices", source: "KNSO, National Accounts 2025" },
      { label: "Unemployment, " + state.year, value: fmt(row.unemployment) + "%", change: "Inflation (CPI) " + fmt(row.inflation) + "%", source: "KNSO, Labour Force Survey 2025" },
    ])}
    <article class="card"><h2>GDP and trade, ${state.year}</h2>
      <p>Exports <strong>${fmt(tradeRow.exports)} bn KCR</strong>, imports
      <strong>${fmt(tradeRow.imports)} bn KCR</strong>, trade surplus
      <strong>${fmt(surplus)} bn KCR</strong>.</p>
      <div class="tabs" role="tablist">
        <button type="button" role="tab" data-tab="gdp"${tab === "gdp" ? ' class="active" aria-selected="true"' : ""}>GDP trend</button>
        <button type="button" role="tab" data-tab="sectors"${tab === "sectors" ? ' class="active" aria-selected="true"' : ""}>Sectors</button>
        <button type="button" role="tab" data-tab="trade"${tab === "trade" ? ' class="active" aria-selected="true"' : ""}>Trade</button>
      </div>
      ${tabBody}
    </article>
    <article class="card"><h2>Economy, 2019–2025</h2>
      <table><thead><tr><th>Year</th><th>GDP (bn KCR)</th><th>Growth</th><th>Inflation</th><th>Unemployment</th></tr></thead>
      <tbody>${ECONOMY.map((e) => `<tr${e.year === state.year ? ' class="hl"' : ""}><td>${e.year}</td><td>${fmt(e.gdp)}</td><td>${fmt(e.growth)}%</td><td>${fmt(e.inflation)}%</td><td>${fmt(e.unemployment)}%</td></tr>`).join("")}</tbody></table>
      ${sourceLine("KNSO, National Accounts 2025; KNSO, Consumer Prices 2025; KNSO, Labour Force Survey 2025.")}
    </article>
  </section>`;
}

function renderHealth() {
  const row = byYear(HEALTH, state.year);
  const points = HEALTH.map((h) => ({ label: h.year, value: h.doctorsPer10k }));
  return `<section>
    <h1>Health</h1>
    <p class="lede">Doctors, hospital beds, infant mortality and the leading causes
    of death in Kalandra, from KNSO Health Statistics 2025.</p>
    <div class="controls">${yearPicker("Year")}${chartToggle()}</div>
    ${kpiCards([
      { label: "Doctors per 10,000, " + state.year, value: fmt(row.doctorsPer10k), change: "Hospital beds per 10,000: " + fmt(row.bedsPer10k), source: "KNSO, Health Statistics 2025" },
      { label: "Infant mortality, " + state.year, value: fmt(row.infantMortality) + " per 1,000", change: "Down from 9.8 in 2019", source: "KNSO, Health Statistics 2025" },
      { label: "Health spending, " + state.year, value: fmt(row.healthSpendGdp) + "% of GDP", change: "Public and private combined", source: "KNSO, Health Statistics 2025" },
    ])}
    <article class="card"><h2>Doctors per 10,000 people, 2019–2025</h2>
      <canvas id="chart-doctors" width="640" height="260"></canvas>
      ${sourceLine("KNSO, Health Statistics 2025.")}
    </article>
    <div class="grid2">
      <article class="card"><h2>Leading causes of death, 2024</h2>
        <table><thead><tr><th>Cause</th><th>Share of deaths</th></tr></thead>
        <tbody>${CAUSES_OF_DEATH.map((c) => `<tr><td>${c.cause}</td><td>${fmt(c.share)}%</td></tr>`).join("")}</tbody></table>
        ${sourceLine("KNSO, Causes of Death Statistics 2024.")}
      </article>
      <article class="card"><h2>Health system, 2019–2025</h2>
        <table><thead><tr><th>Year</th><th>Doctors / 10k</th><th>Beds / 10k</th><th>Infant mortality</th></tr></thead>
        <tbody>${HEALTH.map((h) => `<tr${h.year === state.year ? ' class="hl"' : ""}><td>${h.year}</td><td>${fmt(h.doctorsPer10k)}</td><td>${fmt(h.bedsPer10k)}</td><td>${fmt(h.infantMortality)}</td></tr>`).join("")}</tbody></table>
        ${sourceLine("KNSO, Health Statistics 2025.")}
      </article>
    </div>
  </section>`;
}

function renderEducation() {
  const row = byYear(EDUCATION, state.year);
  const points = EDUCATION.map((e) => ({ label: e.year, value: e.tertiaryEnrol }));
  return `<section>
    <h1>Education</h1>
    <p class="lede">Literacy, enrolment at every level and education spending in
    Kalandra, from KNSO Education Statistics 2025.</p>
    <div class="controls">${yearPicker("Year")}${chartToggle()}</div>
    ${kpiCards([
      { label: "Literacy rate, " + state.year, value: fmt(row.literacy) + "%", change: "Adults aged 15 and over", source: "KNSO, Education Statistics 2025" },
      { label: "Tertiary enrolment, " + state.year, value: fmt(row.tertiaryEnrol) + "%", change: "Of the 18–24 age group", source: "KNSO, Education Statistics 2025" },
      { label: "Education spending, " + state.year, value: fmt(row.spendGdp) + "% of GDP", change: "Public spending on education", source: "KNSO, Education Statistics 2025" },
    ])}
    <article class="card"><h2>Tertiary enrolment, 2019–2025 (% of 18–24 year olds)</h2>
      <canvas id="chart-edu" width="640" height="260"></canvas>
      ${sourceLine("KNSO, Education Statistics 2025.")}
    </article>
    <article class="card"><h2>Education, 2019–2025</h2>
      <table><thead><tr><th>Year</th><th>Literacy</th><th>Primary enrolment</th><th>Secondary enrolment</th><th>Tertiary enrolment</th></tr></thead>
      <tbody>${EDUCATION.map((e) => `<tr${e.year === state.year ? ' class="hl"' : ""}><td>${e.year}</td><td>${fmt(e.literacy)}%</td><td>${fmt(e.primaryEnrol)}%</td><td>${fmt(e.secondaryEnrol)}%</td><td>${fmt(e.tertiaryEnrol)}%</td></tr>`).join("")}</tbody></table>
      ${sourceLine("KNSO, Education Statistics 2025. Enrolment is net enrolment, percent of the age group.")}
    </article>
    <p class="note">Primary enrolment has held above 99% since 2019; secondary enrolment rose from 91.4% in 2019 to 94.8% in 2025.</p>
  </section>`;
}

function renderRegions() {
  const q = state.query.trim().toLowerCase();
  const list = REGIONS.filter((r) => !q || r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q));
  const selected = REGIONS.find((r) => r.name === state.region) ?? null;
  return `<section>
    <h1>Regions</h1>
    <p class="lede">The six regions of the Republic of Kalandra, compared on
    population, unemployment and GDP per capita for 2025.</p>
    <div class="controls">
      <label class="picker">Region <select id="region-select" aria-label="Region">
        <option${state.region === "All regions" ? " selected" : ""}>All regions</option>
        ${REGIONS.map((r) => `<option${r.name === state.region ? " selected" : ""}>${r.name}</option>`).join("")}
      </select></label>
      <label class="picker">Search <input id="region-search" type="search" placeholder="Region or capital…" value="${state.query.replace(/"/g, "")}" aria-label="Search regions"></label>
    </div>
    ${selected ? `<article class="card"><h2>${selected.name}</h2>
      <p>Capital: <strong>${selected.capital}</strong> · Population:
      <strong>${fmt(selected.population, 2)} million</strong> · Unemployment:
      <strong>${fmt(selected.unemployment)}%</strong> · GDP per capita:
      <strong>${fmt(selected.gdpPerCapita, 0)} KCR</strong> · Density:
      <strong>${selected.density} people per km²</strong>.</p></article>` : ""}
    <article class="card"><h2>All regions, 2025</h2>
      ${list.length ? `<table><thead><tr><th>Region</th><th>Capital</th><th>Population (m)</th><th>Unemployment</th><th>GDP per capita (KCR)</th><th>Density / km²</th></tr></thead>
      <tbody>${list.map((r) => `<tr><td>${r.name}</td><td>${r.capital}</td><td>${fmt(r.population, 2)}</td><td>${fmt(r.unemployment)}%</td><td>${fmt(r.gdpPerCapita, 0)}</td><td>${r.density}</td></tr>`).join("")}</tbody></table>`
      : `<p>No region matches “${state.query}”. Try another name.</p>`}
      ${sourceLine("KNSO, Regional Statistics 2025.")}
    </article>
    <article class="card"><h2>Population by region, 2025 (millions)</h2>
      <canvas id="chart-regions" width="640" height="260"></canvas>
      ${sourceLine("KNSO, Regional Statistics 2025.")}
    </article>
  </section>`;
}

function renderMethodology() {
  return `<section>
    <h1>Methodology &amp; Sources</h1>
    <p class="lede">How the Kalandra National Statistics Office produces these
    figures, and where every number on this site comes from.</p>
    <article class="card"><h2>Sources</h2>
      <ul>
        <li><strong>Population Estimates 2025</strong> — mid-year resident population by age, sex and region, based on the Population and Housing Census 2024 and the civil register.</li>
        <li><strong>National Accounts 2025</strong> — GDP, growth and sector shares, current and constant 2020 prices.</li>
        <li><strong>Consumer Prices 2025</strong> — the consumer price index, basket updated in January 2024.</li>
        <li><strong>Labour Force Survey 2025</strong> — quarterly survey of 24,000 households; unemployment by the standard definition.</li>
        <li><strong>Vital Statistics 2025</strong> — births, deaths, fertility and life expectancy from the civil register.</li>
        <li><strong>Health Statistics 2025</strong> — doctors, beds, infant mortality and causes of death.</li>
        <li><strong>Education Statistics 2025</strong> — literacy and enrolment from the annual school census and the Household Survey 2025.</li>
        <li><strong>Regional Statistics 2025</strong> — population, unemployment and GDP per capita for the six regions.</li>
        <li><strong>External Trade Statistics 2025</strong> — exports and imports, current prices.</li>
      </ul>
    </article>
    <article class="card"><h2>Methods in brief</h2>
      <ul>
        <li>Population figures are mid-year estimates; the 2024 census counted 19.36 million residents.</li>
        <li>GDP is shown in constant 2020 prices unless a table says current prices.</li>
        <li>Unemployment follows the standard definition: without work, available to start within two weeks, and actively seeking work in the last four weeks.</li>
        <li>Life expectancy is period life expectancy at birth from the 2024 life table.</li>
        <li>Figures are revised with each release; the latest release is the authoritative one.</li>
      </ul>
    </article>
    <article class="card"><h2>About the office</h2>
      <p>The Kalandra National Statistics Office (KNSO) is the independent producer of
      official statistics for the Republic of Kalandra. It publishes the Statistical
      Yearbook every September and releases new indicators through the year. Contact:
      KNSO, Statistics House, 14 Census Square, Kalandra City.</p>
      <p>All figures on this site are published KNSO figures with their source and year
      shown beside them. This site works fully offline: it loads no data from any
      other origin.</p>
    </article>
  </section>`;
}

export function render(route) {
  const id = ROUTES.some((r) => r.id === route) ? route : "dashboard";
  const main = document.getElementById("page");
  if (id === "dashboard") main.innerHTML = renderDashboard();
  else if (id === "population") main.innerHTML = renderPopulation();
  else if (id === "economy") main.innerHTML = renderEconomy();
  else if (id === "health") main.innerHTML = renderHealth();
  else if (id === "education") main.innerHTML = renderEducation();
  else if (id === "regions") main.innerHTML = renderRegions();
  else main.innerHTML = renderMethodology();

  document.querySelectorAll("nav a").forEach((a) => {
    const on = a.getAttribute("href") === "#/" + id;
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  // Draw this page's charts after the HTML is in place.
  if (id === "dashboard") {
    draw("chart-pop", POPULATION.map((r) => ({ label: r.year, value: r.total })), "m");
    draw("chart-gdp", ECONOMY.map((r) => ({ label: r.year, value: r.growth })), "%");
  } else if (id === "population") {
    draw("chart-pop-trend", POPULATION.map((r) => ({ label: r.year, value: r.total })), "m");
    const row = byYear(POPULATION, state.year);
    const urban = document.getElementById("chart-urban");
    if (urban) drawShareBar(urban, [
      { share: (row.urban / row.total) * 100 },
      { share: (row.rural / row.total) * 100 },
    ]);
  } else if (id === "economy") {
    draw("chart-gdp-trend", ECONOMY.map((r) => ({ label: r.year, value: r.gdp })), "bn");
    const sec = document.getElementById("chart-sectors");
    if (sec) drawShareBar(sec, SECTORS.map((s) => ({ share: s.share })));
  } else if (id === "health") {
    draw("chart-doctors", HEALTH.map((h) => ({ label: h.year, value: h.doctorsPer10k })), "");
  } else if (id === "education") {
    draw("chart-edu", EDUCATION.map((e) => ({ label: e.year, value: e.tertiaryEnrol })), "%");
  } else if (id === "regions") {
    draw("chart-regions", REGIONS.map((r) => ({ label: r.name.replace(" Kalandra", ""), value: r.population })), "m", 2);
  }
  window.scrollTo(0, 0);
}
