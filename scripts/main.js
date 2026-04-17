import { landingView } from "../views/landing.js";
import { featureItems } from "../asset/features.js";
import { navItems } from "../asset/navItems.js";
import { exercises } from "../asset/exercises.js";
import {
  createNavItem,
  createFeatureCard,
  createExerciseCard,
} from "./dom-utils.js";

/* --- Configuration & Elements --- */

const appShell = document.querySelector("#app-shell");
const navContainer = document.querySelector("#nav-container ul");
const currentYearSpan = document.querySelector("#current-year");
const header = document.querySelector("header");

/* --- Router Logic --- */

/**
 * Switches the content of the app-shell based on the viewId
 * @param {string} viewId - Matches the data-link attribute
 */
async function navigateTo(viewId, appendHistory = true) {
  if (appendHistory) {
    const url = viewId === "home" ? "/" : `/${viewId}`;
    window.history.pushState({ viewId }, "", url);
  }

  window.scrollTo(0, 0);

  switch (viewId) {
    case "home":
      appShell.innerHTML = landingView;
      header.classList.remove("shadow-header");
      renderFeatures(featureItems);
      renderExercises(exercises, 4);
      break;

    default:
      appShell.innerHTML = landingView;
      renderFeatures(featureItems);
      renderExercises(exercises, 4);
  }
}

/* --- Logic / Render Functions --- */

function renderNavbar(items) {
  if (navContainer) {
    navContainer.innerHTML = items.map(createNavItem).join("");
  }
}

function renderFeatures(items) {
  const container = document.querySelector(".features-container");
  if (container) {
    container.innerHTML = items.map(createFeatureCard).join("");
  }
}

function renderExercises(exercises, limit = null) {
  const container = document.querySelector(".exercises-container");
  if (!container) return;

  if (!exercises || !Array.isArray(exercises)) {
    container.innerHTML = exercisesEmptyView;
    return;
  }

  const displayList = limit ? exercises.slice(0, limit) : exercises;
  container.innerHTML = displayList.map(createExerciseCard).join("");
}

function setupEventListeners() {
  const burgerBtn = document.querySelector("#burger-menu");
  const closeBtn = document.querySelector("#close-menu");
  const navMenu = document.querySelector("#nav-container");

  burgerBtn?.addEventListener("click", () => {
    navMenu.classList.add("active");
  });

  closeBtn?.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();

      navMenu.classList.remove("active");
      const viewId = link.getAttribute("data-link");
      navigateTo(viewId);
    }
  });

  // This listens for the browser's Back and Forward buttons
  window.addEventListener("popstate", (e) => {
    const viewId = e.state?.viewId || "home";

    navigateTo(viewId, false);
  });

  // Scroll effect for header
  window.addEventListener(
    "scroll",
    () => {
      const isScrolled = window.scrollY > 10;
      header.classList.toggle("scrolled", isScrolled);
    },
    { passive: true },
  );
}

/* --- Initialization --- */

function init() {
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Build the permanent UI
  renderNavbar(navItems);

  // Set up click/scroll handlers
  setupEventListeners();

  // Load the initial view
  const path = window.location.pathname.replace("/", "") || "home";
  const validViews = ["home",];
  const startView = validViews.includes(path) ? path : "home";

  navigateTo(startView);
}

// Start the engine
init();
