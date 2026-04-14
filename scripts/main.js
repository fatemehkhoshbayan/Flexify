import { featureItems } from "../asset/features.js";
import { navItems } from "../asset/navItems.js";
import { createNavItem, createFeatureCard } from "./dom-utils.js";

/* --- Elements --- */
const header = document.querySelector("header");
const featuresContainer = document.querySelector(".features-container");
const navContainer = document.querySelector("#nav-container ul");
const currentYearSpan = document.querySelector("#current-year");

/* --- Initialization --- */
function init() {
  renderNavbar(navItems);
  renderFeatures(featureItems);
  setupScrollEffect();

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}

/* --- Logic --- */
function renderNavbar(items) {
  navContainer.innerHTML = items.map(createNavItem).join("");
}

function renderFeatures(items) {
  featuresContainer.innerHTML = items.map(createFeatureCard).join("");
}

function setupScrollEffect() {
  const tooltips = document.querySelectorAll(".tooltip");

  window.addEventListener(
    "scroll",
    () => {
      const isScrolled = window.scrollY > 50;
      header.classList.toggle("scrolled", isScrolled);
      tooltips.forEach((tip) => tip.classList.toggle("scrolled", isScrolled));
    },
    { passive: true },
  );
}

// Run the app
init();
