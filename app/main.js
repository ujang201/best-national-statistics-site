// main.js — boots the site: builds the navigation, routes hash changes to
// views.js, and wires every control (year picker, chart toggle, tabs,
// region picker and search) so it re-renders the current page.

import { ROUTES, render, state } from "./views.js";

const nav = document.getElementById("nav");
nav.innerHTML = ROUTES.map(
  (r) => `<a href="#/${r.id}">${r.label}</a>`,
).join("");

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return ROUTES.some((r) => r.id === hash) ? hash : "dashboard";
}

function show() {
  render(currentRoute());
}

window.addEventListener("hashchange", show);

// Every control re-renders through one delegated listener, so controls added
// by a view work without extra wiring.
document.addEventListener("change", (event) => {
  const el = event.target;
  if (el.id === "year-select") {
    state.year = Number(el.value);
    show();
  } else if (el.id === "region-select") {
    state.region = el.value;
    show();
  }
});

document.addEventListener("input", (event) => {
  const el = event.target;
  if (el.id === "region-search") {
    state.query = el.value;
    // Re-render, then keep the caret in the search box.
    show();
    const box = document.getElementById("region-search");
    if (box) {
      box.focus();
      box.setSelectionRange(box.value.length, box.value.length);
    }
  }
});

document.addEventListener("click", (event) => {
  const chartBtn = event.target.closest("[data-chart]");
  if (chartBtn) {
    state.chart = chartBtn.getAttribute("data-chart");
    show();
    return;
  }
  const tabBtn = event.target.closest("[data-tab]");
  if (tabBtn) {
    state.econTab = tabBtn.getAttribute("data-tab");
    show();
  }
});

show();
