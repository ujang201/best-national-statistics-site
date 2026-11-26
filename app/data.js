// Kalandra National Statistics Office — official figures, Statistical Yearbook 2025.
// All figures below are the published values of the Kalandra National Statistics
// Office (KNSO). Every figure shown on the site cites its source and year in text.
// Data are stored as plain objects so every view renders from this one file.

export const META = {
  country: "Republic of Kalandra",
  office: "Kalandra National Statistics Office",
  officeShort: "KNSO",
  yearbook: "Statistical Yearbook 2025",
  census: "Population and Housing Census 2024",
  survey: "Kalandra Household Survey 2025",
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
};

// Total resident population, mid-year estimate, millions.
export const POPULATION = [
  { year: 2019, total: 18.42, urban: 11.05, rural: 7.37 },
  { year: 2020, total: 18.61, urban: 11.31, rural: 7.30 },
  { year: 2021, total: 18.79, urban: 11.58, rural: 7.21 },
  { year: 2022, total: 18.98, urban: 11.86, rural: 7.12 },
  { year: 2023, total: 19.17, urban: 12.14, rural: 7.03 },
  { year: 2024, total: 19.36, urban: 12.43, rural: 6.93 },
  { year: 2025, total: 19.55, urban: 12.71, rural: 6.84 },
];

// Age structure of the resident population, Census 2024, percent.
export const AGE_GROUPS = [
  { group: "0–14 years", share: 24.1, count: 4.67 },
  { group: "15–24 years", share: 17.3, count: 3.35 },
  { group: "25–54 years", share: 40.2, count: 7.78 },
  { group: "55–64 years", share: 9.8, count: 1.90 },
  { group: "65 years and over", share: 8.6, count: 1.66 },
];

// Vital statistics, per 1,000 population unless noted.
export const VITAL = [
  { year: 2019, births: 16.8, deaths: 7.1, fertility: 2.21, lifeExpectancy: 74.6 },
  { year: 2020, births: 16.4, deaths: 7.6, fertility: 2.14, lifeExpectancy: 74.1 },
  { year: 2021, births: 16.1, deaths: 7.9, fertility: 2.08, lifeExpectancy: 73.8 },
  { year: 2022, births: 15.9, deaths: 7.4, fertility: 2.03, lifeExpectancy: 74.4 },
  { year: 2023, births: 15.7, deaths: 7.2, fertility: 1.99, lifeExpectancy: 74.9 },
  { year: 2024, births: 15.5, deaths: 7.0, fertility: 1.96, lifeExpectancy: 75.2 },
  { year: 2025, births: 15.3, deaths: 6.9, fertility: 1.93, lifeExpectancy: 75.5 },
];

// Economy: GDP in billion kalandra crowns (KCR), constant 2020 prices.
export const ECONOMY = [
  { year: 2019, gdp: 412.6, growth: 3.1, gdpPerCapita: 22401, inflation: 2.4, unemployment: 5.8 },
  { year: 2020, gdp: 398.4, growth: -3.4, gdpPerCapita: 21408, inflation: 1.8, unemployment: 7.2 },
  { year: 2021, gdp: 417.9, growth: 4.9, gdpPerCapita: 22241, inflation: 2.9, unemployment: 6.4 },
  { year: 2022, gdp: 436.2, growth: 4.4, gdpPerCapita: 22982, inflation: 5.1, unemployment: 5.6 },
  { year: 2023, gdp: 449.8, growth: 3.1, gdpPerCapita: 23466, inflation: 3.6, unemployment: 5.1 },
  { year: 2024, gdp: 465.3, growth: 3.4, gdpPerCapita: 24036, inflation: 2.8, unemployment: 4.8 },
  { year: 2025, gdp: 481.9, growth: 3.6, gdpPerCapita: 24652, inflation: 2.5, unemployment: 4.6 },
];

// GDP by sector, share of gross value added, percent, 2025.
export const SECTORS = [
  { sector: "Services", share: 58.4 },
  { sector: "Industry", share: 24.7 },
  { sector: "Agriculture, forestry and fishing", share: 9.3 },
  { sector: "Construction", share: 7.6 },
];

// Trade, billion KCR, current prices.
export const TRADE = [
  { year: 2019, exports: 148.2, imports: 141.7 },
  { year: 2020, exports: 132.5, imports: 128.9 },
  { year: 2021, exports: 156.8, imports: 149.3 },
  { year: 2022, exports: 174.6, imports: 168.2 },
  { year: 2023, exports: 182.4, imports: 176.1 },
  { year: 2024, exports: 193.7, imports: 185.9 },
  { year: 2025, exports: 205.3, imports: 196.8 },
];

// Health indicators, KNSO Health Statistics 2025.
export const HEALTH = [
  { year: 2019, doctorsPer10k: 28.4, bedsPer10k: 41.2, infantMortality: 9.8, healthSpendGdp: 6.9 },
  { year: 2020, doctorsPer10k: 29.1, bedsPer10k: 42.0, infantMortality: 9.4, healthSpendGdp: 7.6 },
  { year: 2021, doctorsPer10k: 29.8, bedsPer10k: 42.6, infantMortality: 9.0, healthSpendGdp: 7.8 },
  { year: 2022, doctorsPer10k: 30.6, bedsPer10k: 43.1, infantMortality: 8.6, healthSpendGdp: 7.4 },
  { year: 2023, doctorsPer10k: 31.4, bedsPer10k: 43.8, infantMortality: 8.2, healthSpendGdp: 7.3 },
  { year: 2024, doctorsPer10k: 32.2, bedsPer10k: 44.3, infantMortality: 7.9, healthSpendGdp: 7.2 },
  { year: 2025, doctorsPer10k: 33.1, bedsPer10k: 44.9, infantMortality: 7.5, healthSpendGdp: 7.1 },
];

// Leading causes of death, share of all deaths, percent, 2024.
export const CAUSES_OF_DEATH = [
  { cause: "Cardiovascular diseases", share: 31.2 },
  { cause: "Cancers", share: 22.8 },
  { cause: "Respiratory diseases", share: 9.4 },
  { cause: "External causes (accidents, injuries)", share: 7.1 },
  { cause: "Diabetes and metabolic disorders", share: 5.6 },
  { cause: "All other causes", share: 23.9 },
];

// Education indicators, KNSO Education Statistics 2025.
export const EDUCATION = [
  { year: 2019, literacy: 96.8, primaryEnrol: 99.1, secondaryEnrol: 91.4, tertiaryEnrol: 42.3, spendGdp: 4.8 },
  { year: 2020, literacy: 97.0, primaryEnrol: 99.2, secondaryEnrol: 92.0, tertiaryEnrol: 43.8, spendGdp: 5.1 },
  { year: 2021, literacy: 97.2, primaryEnrol: 99.3, secondaryEnrol: 92.6, tertiaryEnrol: 45.1, spendGdp: 5.0 },
  { year: 2022, literacy: 97.4, primaryEnrol: 99.4, secondaryEnrol: 93.2, tertiaryEnrol: 46.7, spendGdp: 5.0 },
  { year: 2023, literacy: 97.6, primaryEnrol: 99.4, secondaryEnrol: 93.8, tertiaryEnrol: 48.2, spendGdp: 5.2 },
  { year: 2024, literacy: 97.8, primaryEnrol: 99.5, secondaryEnrol: 94.3, tertiaryEnrol: 49.6, spendGdp: 5.3 },
  { year: 2025, literacy: 98.0, primaryEnrol: 99.5, secondaryEnrol: 94.8, tertiaryEnrol: 51.0, spendGdp: 5.4 },
];

// Regions: population 2025 (millions), unemployment 2025 (%), GDP per capita 2025 (KCR).
export const REGIONS = [
  { name: "North Kalandra", capital: "Vostok", population: 4.82, unemployment: 4.1, gdpPerCapita: 26840, density: 61 },
  { name: "Central Kalandra", capital: "Kalandra City", population: 6.14, unemployment: 4.3, gdpPerCapita: 31220, density: 148 },
  { name: "South Kalandra", capital: "Marenport", population: 3.57, unemployment: 5.2, gdpPerCapita: 21930, density: 84 },
  { name: "East Kalandra", capital: "Tarnova", population: 2.48, unemployment: 5.0, gdpPerCapita: 20750, density: 52 },
  { name: "West Kalandra", capital: "Halden", population: 1.96, unemployment: 4.9, gdpPerCapita: 19860, density: 47 },
  { name: "Highlands", capital: "Ostberg", population: 0.58, unemployment: 5.8, gdpPerCapita: 17420, density: 18 },
];

// Key indicators shown on the dashboard, all for the latest year, 2025.
export const KEY_INDICATORS = [
  { label: "Population", value: "19.55 million", change: "+1.0% on 2024", source: "KNSO, Population Estimates 2025" },
  { label: "GDP", value: "481.9 bn KCR", change: "+3.6% real growth", source: "KNSO, National Accounts 2025" },
  { label: "Unemployment rate", value: "4.6%", change: "−0.2 pp on 2024", source: "KNSO, Labour Force Survey 2025" },
  { label: "Inflation (CPI)", value: "2.5%", change: "−0.3 pp on 2024", source: "KNSO, Consumer Prices 2025" },
  { label: "Life expectancy", value: "75.5 years", change: "+0.3 years on 2024", source: "KNSO, Vital Statistics 2025" },
  { label: "Literacy rate", value: "98.0%", change: "+0.2 pp on 2024", source: "KNSO, Education Statistics 2025" },
];

// Latest releases, as published by the office.
export const RELEASES = [
  { date: "12 Nov 2025", title: "Consumer Price Index, October 2025", note: "Annual inflation 2.5%." },
  { date: "28 Oct 2025", title: "Labour Force Survey, Q3 2025", note: "Unemployment 4.6%, employment up 1.8% year on year." },
  { date: "15 Oct 2025", title: "National Accounts, Q2 2025", note: "GDP grew 3.6% in real terms year on year." },
  { date: "30 Sep 2025", title: "Statistical Yearbook 2025", note: "The full yearbook: 412 tables across 14 chapters." },
  { date: "18 Sep 2025", title: "Population Estimates 2025", note: "Resident population 19.55 million at mid-year." },
];

export function byYear(table, year) {
  return table.find((row) => row.year === year) ?? table[table.length - 1];
}

export function fmt(n, digits = 1) {
  return Number(n).toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
