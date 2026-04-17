import { fetchExercises } from "./api.js";
import { fetchExercises } from "./api.js";
import { landingView } from "../views/landing.js";
import { exercisesView } from "../views/exercises.js";
import { featureItems } from "../asset/features.js";
import { navItems } from "../asset/navItems.js";
import { createLoadingState } from "./dom-utils.js";
import { renderNavbar, renderFeatures, renderExercises } from "./renderer.js";
import {
  setupExercisesPageListener,
  setupFavoriteListener,
} from "./event-handlers.js";

let cachedExercises = null;

/* --- Configuration & Elements --- */

const appShell = document.querySelector("#app-shell");
const currentYearSpan = document.querySelector("#current-year");
const header = document.querySelector("header");

/* --- Router Logic --- */

/**
 * Switches the content of the app-shell based on the viewId
 * @param {string} viewId - Matches the data-link attribute
 */
async function navigateTo(viewId, appendHistory = true) {
  // Fetch exercises only when needed and only if we don't have them yet
  if (!cachedExercises && (viewId === "home" || viewId === "exercises")) {
    appShell.innerHTML = createLoadingState(viewId, "Loading Exercises!");
    cachedExercises = await fetchExercises();
  }

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
      renderExercises(cachedExercises, 3);
      break;

    case "exercises":
      appShell.innerHTML = exercisesView;
      header.classList.add("shadow-header");
      renderExercises(cachedExercises);
      setupExercisesPageListener();
      break;

    default:
      navigateTo("home");
  }
}

/* --- The Backbone Listeners --- */
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
    const viewId = e.state?.viewId ?? "home";

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

  renderNavbar(navItems);
  setupEventListeners();

  const path = window.location.pathname.split("/").pop() || "home";
  const cleanPath = path === "index.html" ? "home" : path;
  const validViews = ["home", "exercises"];
  const startView = validViews.includes(cleanPath) ? cleanPath : "home";

  navigateTo(startView);
}

// Start the engine
init();
