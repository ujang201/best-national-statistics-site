// charts.js — draws every chart on the site with plain canvas 2D.
// One job: turn a series of {label, value} points into a bar chart or a line
// chart, with axes, gridlines and value labels, and nothing else.

const PALETTE = {
  bar: "#0e6b6b",
  barAlt: "#e8a13a",
  line: "#0e6b6b",
  grid: "#dfe6e6",
  axis: "#5b6b6b",
  text: "#24343a",
};

function setupCanvas(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 640;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return { ctx, width, height };
}

function niceMax(values) {
  const max = Math.max(...values);
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / pow) * pow;
}

function drawAxes(ctx, pad, width, height, max, unit) {
  ctx.strokeStyle = PALETTE.grid;
  ctx.fillStyle = PALETTE.axis;
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.lineWidth = 1;
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = (max / steps) * i;
    const y = pad.top + (height - pad.top - pad.bottom) * (1 - i / steps);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(unit ? v.toFixed(0) + " " + unit : v.toFixed(0), pad.left - 6, y + 4);
  }
}

// Draw a vertical bar chart. points: [{label, value}], highlight: index to colour amber.
export function drawBarChart(canvas, points, options = {}) {
  const height = options.height || 260;
  const { ctx, width } = setupCanvas(canvas, height);
  const pad = { top: 18, right: 12, bottom: 30, left: 56 };
  const values = points.map((p) => p.value);
  const max = niceMax(values);
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  drawAxes(ctx, pad, width, height, max, options.unit || "");
  const slot = plotW / points.length;
  const barW = Math.min(46, slot * 0.62);
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "center";
  points.forEach((p, i) => {
    const x = pad.left + slot * i + (slot - barW) / 2;
    const h = (p.value / max) * plotH;
    const y = pad.top + plotH - h;
    ctx.fillStyle = i === options.highlight ? PALETTE.barAlt : PALETTE.bar;
    ctx.fillRect(x, y, barW, h);
    ctx.fillStyle = PALETTE.text;
    ctx.fillText(formatValue(p.value, options.decimals), x + barW / 2, y - 5);
    ctx.fillStyle = PALETTE.axis;
    ctx.fillText(String(p.label), x + barW / 2, height - 10);
  });
}

// Draw a line chart with markers. points: [{label, value}].
export function drawLineChart(canvas, points, options = {}) {
  const height = options.height || 260;
  const { ctx, width } = setupCanvas(canvas, height);
  const pad = { top: 18, right: 16, bottom: 30, left: 56 };
  const values = points.map((p) => p.value);
  const max = niceMax(values);
  const min = Math.min(0, ...values);
  const range = max - min || 1;
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  drawAxes(ctx, pad, width, height, max, options.unit || "");
  const xAt = (i) => pad.left + (plotW * i) / (points.length - 1);
  const yAt = (v) => pad.top + plotH * (1 - (v - min) / range);
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.stroke();
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "center";
  points.forEach((p, i) => {
    ctx.fillStyle = PALETTE.line;
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = PALETTE.text;
    ctx.fillText(formatValue(p.value, options.decimals), xAt(i), yAt(p.value) - 10);
    ctx.fillStyle = PALETTE.axis;
    ctx.fillText(String(p.label), xAt(i), height - 10);
  });
}

// Draw a horizontal share bar (100% stacked, one segment per entry).
export function drawShareBar(canvas, parts) {
  const height = 34;
  const { ctx, width } = setupCanvas(canvas, height);
  let x = 0;
  const colors = ["#0e6b6b", "#2a9d8f", "#e8a13a", "#c96f2e", "#7a9e7e", "#54707a"];
  parts.forEach((p, i) => {
    const w = (p.share / 100) * width;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, 0, w, height);
    x += w;
  });
}

function formatValue(v, decimals = 1) {
  return Number(v).toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
