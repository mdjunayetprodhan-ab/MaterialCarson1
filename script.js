"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initRipple();
  initChaosScroll();
  initMaterialLab();
  initTokensA11y();
  initTokensInteractive();
  initCarsonExtras();
});

/* ---------- Ripple ---------- */
function initRipple() {
  document.querySelectorAll(".ripple").forEach((el) => {
    el.addEventListener("click", (e) => {
      const rect = el.getBoundingClientRect();
      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      const size = Math.max(rect.width, rect.height);
      wave.style.width = `${size}px`;
      wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - rect.left - size / 2}px`;
      wave.style.top = `${e.clientY - rect.top - size / 2}px`;
      el.appendChild(wave);
      setTimeout(() => wave.remove(), 620);
    });
  });
}

/* ---------- Carson horizontal scroll ---------- */
function initChaosScroll() {
  const main = document.querySelector("main");
  const carson = document.getElementById("carson");
  const track = document.getElementById("chaosTrack");
  if (!main || !carson || !track) return;

  let progress = 0;       // current 0..1
  let target = 0;         // target 0..1
  let rafId = 0;

  const SPEED = 0.00035;  // было слишком быстро
  const LERP = 0.12;      // плавность

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function maxX() {
    return Math.max(track.scrollWidth - window.innerWidth, 0);
  }

  function render() {
    track.style.transform = `translate3d(${-maxX() * progress}px,0,0)`;
  }

  function isCarsonActive() {
    const r = carson.getBoundingClientRect();
    const vh = window.innerHeight;
    return r.top < vh * 0.6 && r.bottom > vh * 0.4;
  }

  function animate() {
    progress += (target - progress) * LERP;
    if (Math.abs(target - progress) < 0.0005) progress = target;
    render();
    rafId = requestAnimationFrame(animate);
  }

  function onWheel(e) {
    if (!isCarsonActive()) return;

    const canMoveInside =
      (e.deltaY > 0 && target < 1) ||
      (e.deltaY < 0 && target > 0);

    if (!canMoveInside) return;

    target = clamp(target + e.deltaY * SPEED, 0, 1);
    e.preventDefault(); // не перескакиваем секцию
  }

  // Use capture phase on window so preventDefault() fires before the
  // scroll-snap mechanism on `main` can consume the event.
  window.addEventListener("wheel", onWheel, { passive: false, capture: true });
  window.addEventListener("resize", render);

  cancelAnimationFrame(rafId);
  animate();
}

/* ---------- Material UI Lab ---------- */
function initMaterialLab() {
  const stateSwitch = document.getElementById("stateSwitch");
  const labPreview = document.getElementById("labPreview");
  const elevationRange = document.getElementById("elevationRange");
  const elevationValue = document.getElementById("elevationValue");

  if (stateSwitch && labPreview) {
    stateSwitch.addEventListener("click", (e) => {
      const btn = e.target.closest(".seg-btn");
      if (!btn) return;
      stateSwitch.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      labPreview.dataset.state = btn.dataset.state || "default";
    });
  }

  const shadows = [
    "none",
    "0 1px 3px rgba(0,0,0,.10)",
    "0 4px 12px rgba(0,0,0,.12)",
    "0 8px 20px rgba(0,0,0,.14)",
    "0 12px 28px rgba(0,0,0,.16)",
    "0 16px 36px rgba(0,0,0,.20)"
  ];

  function applyElevation(v) {
    if (!labPreview) return;
    const idx = Math.max(0, Math.min(5, Number(v) || 0));
    labPreview.style.boxShadow = shadows[idx];
    if (elevationValue) elevationValue.textContent = String(idx);
  }

  if (elevationRange) {
    elevationRange.addEventListener("input", (e) => applyElevation(e.target.value));
    applyElevation(elevationRange.value);
  }
}

/* ---------- Motion patterns ---------- */
function initMotion() {
  const controls = document.getElementById("motionControls");
  const phone = document.getElementById("motionPhone");
  const explain = document.getElementById("motionExplain");
  if (!controls || !phone) return;

  const buttons = controls.querySelectorAll(".motion-btn");
  if (!buttons.length) return;

  const text = {
    container: "Container Transform: карточка разворачивается в detail-экран.",
    shared: "Shared Axis (X): список уходит влево, detail входит справа.",
    fade: "Fade Through: мягкая смена контента через прозрачность."
  };

  let mode = "container";
  let timer = null;

  function setActive(next) {
    buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.motion === next));
  }

  function replay(nextMode) {
    mode = nextMode;
    setActive(mode);

    phone.classList.remove("is-open", "mode-container", "mode-shared", "mode-fade");
    void phone.offsetWidth;
    phone.classList.add(`mode-${mode}`);

    clearTimeout(timer);
    timer = setTimeout(() => phone.classList.add("is-open"), 20);

    if (explain) explain.textContent = text[mode];
  }

  controls.addEventListener("click", (e) => {
    const btn = e.target.closest(".motion-btn");
    if (!btn) return;
    replay(btn.dataset.motion || "container");
  });

  phone.addEventListener("click", () => replay(mode));
  replay("container");
}

/* ---------- Tokens + A11y ---------- */
function initTokensA11y() {
  const fgSelect = document.getElementById("fgSelect");
  const bgSelect = document.getElementById("bgSelect");
  const fontScale = document.getElementById("fontScale");
  const contrastOut = document.getElementById("contrastOut");
  const a11yPreview = document.getElementById("a11yPreview");

  function hexToRgb(hex) {
    const raw = String(hex).replace("#", "");
    const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
    const n = parseInt(full, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function luminance({ r, g, b }) {
    const c = [r, g, b].map((v) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function contrastRatio(fg, bg) {
    const L1 = luminance(hexToRgb(fg));
    const L2 = luminance(hexToRgb(bg));
    const light = Math.max(L1, L2);
    const dark = Math.min(L1, L2);
    return (light + 0.05) / (dark + 0.05);
  }

  function updateA11y() {
    if (!fgSelect || !bgSelect || !contrastOut || !a11yPreview) return;
    const fg = fgSelect.value;
    const bg = bgSelect.value;
    const ratio = contrastRatio(fg, bg);

    a11yPreview.style.color = fg;
    a11yPreview.style.background = bg;
    if (fontScale) a11yPreview.style.fontSize = `${fontScale.value}px`;

    contrastOut.textContent = `Contrast: ${ratio.toFixed(2)} (${ratio >= 4.5 ? "AA: pass" : "AA: fail"})`;
  }

  [fgSelect, bgSelect, fontScale].forEach((el) => {
    if (el) el.addEventListener("input", updateA11y);
  });
  updateA11y();
}

/* ---------- Tokens interaction ---------- */
function initTokensInteractive() {
  const tokensCard = document.getElementById("tokensCard");
  const tokenPreview = document.getElementById("tokenPreview");
  const previewBlock = tokenPreview?.querySelector(".preview-block");
  const previewBtn = tokenPreview?.querySelector(".preview-btn");
  const customColor = document.getElementById("customColor");
  const tokenOutput = document.getElementById("tokenOutput");
  const tokenButtons = document.querySelectorAll("#tokensCard .token-btn");

  if (!tokenPreview || !customColor || !tokenOutput) return;

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function luminance({ r, g, b }) {
    const c = [r, g, b].map((v) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function shade(hex, amount) {
    const { r, g, b } = hexToRgb(hex);
    const f = (v) => Math.max(0, Math.min(255, v + amount));
    const toHex = (v) => v.toString(16).padStart(2, "0");
    return `#${toHex(f(r))}${toHex(f(g))}${toHex(f(b))}`;
  }

  function applyColor(hex) {
    const isLight = luminance(hexToRgb(hex)) > 0.6;
    const text = isLight ? "#0f172a" : "#ffffff";
    const panelBg = isLight ? "rgba(255,255,255,.88)" : "rgba(15,23,42,.40)";
    const btnBg = isLight ? "#0f172a" : "#ffffff";
    const btnText = isLight ? "#ffffff" : "#0f172a";
    const grad2 = shade(hex, isLight ? -24 : 24);

    tokenOutput.textContent = hex.toUpperCase();

    // фон контейнера preview
    tokenPreview?.style.setProperty("background", `linear-gradient(135deg, ${hex}, ${grad2})`, "important");

    // читаемая подложка и текст
    if (previewBlock) {
      previewBlock.style.setProperty("background", panelBg, "important");
      previewBlock.style.setProperty("color", text, "important");
      previewBlock.querySelectorAll("h4,p,span,small").forEach((el) => {
        el.style.setProperty("color", text, "important");
      });
    }

    // кнопка
    if (previewBtn) {
      previewBtn.style.setProperty("background", btnBg, "important");
      previewBtn.style.setProperty("color", btnText, "important");
      previewBtn.style.setProperty("border", "0", "important");
    }
  }

  tokenButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const hex = btn.dataset.hex;
      if (!hex) return;
      customColor.value = hex;
      tokenButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyColor(hex);
    });
  });

  customColor.addEventListener("input", (e) => {
    tokenButtons.forEach((b) => b.classList.remove("is-active"));
    applyColor(e.target.value);
  });

  applyColor(customColor.value || "#1a73e8");
}

/* ---------- Carson extras ---------- */
function initCarsonExtras() {
  const btn = document.getElementById("chaosShuffle");
  const panels = document.querySelectorAll("#chaosTrack .panel");
  if (!btn || !panels.length) return;

  btn.addEventListener("click", () => {
    panels.forEach((p) => {
      const deg = (Math.random() * 10 - 5).toFixed(2);   // -5..5
      const y = (Math.random() * 12 - 6).toFixed(0);     // -6..6 px
      p.classList.add("is-shuffled");
      p.style.transform = `rotate(${deg}deg) translateY(${y}px)`;
    });
  });
}