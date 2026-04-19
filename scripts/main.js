import { fetchExercises } from "./api.js";
import { landingView } from "../views/landing.js";
import { exercisesView } from "../views/exercises.js";
import { favoritesView } from "../views/favorites.js";
import { exerciseDetailsView } from "../views/exerciseDetails.js";
import { getPlanView } from "../views/getPlan.js";
import { navItems } from "../asset/navItems.js";
import { createLoadingState } from "./dom-utils.js";
import {
  renderNavbar,
  renderLanding,
  renderExercises,
  renderFavorites,
  renderDetails,
  renderGetPlan,
} from "./renderer.js";
import {
  setupExercisesPageListener,
  setupFavoriteListener,
  setupGetPlanSubmission,
} from "./event-handlers.js";
import { slugify } from "../utils/slugify.js";

/* --- State & Config --- */
let cachedExercises = null;
const appShell = document.querySelector("#app-shell");
const header = document.querySelector("header");

/**
 * Route Configuration Object
 * Each key represents a viewId.
 * 'init' handles specific UI state, 'render' handles the visual output.
 */
const ROUTES = {
  home: {
    path: "/",
    render: (data) => {
      appShell.innerHTML = landingView;
      header.classList.remove("shadow-header");
      renderLanding(data);
    },
  },
  exercises: {
    path: "/exercises",
    render: (data) => {
      appShell.innerHTML = exercisesView;
      header.classList.add("shadow-header");
      renderExercises(data);
      setupExercisesPageListener();
    },
  },
  favorites: {
    path: "/favorites",
    render: (data) => {
      appShell.innerHTML = favoritesView;
      header.classList.add("shadow-header");
      renderFavorites(data);
      setupExercisesPageListener();
    },
  },
  details: {
    path: (data) => `/details/${slugify(data?.name)}`,
    render: (exercises, data) => {
      appShell.innerHTML = exerciseDetailsView;
      header.classList.add("shadow-header");
      const selected = exercises.find(
        (ex) => slugify(ex.name) === slugify(data?.name),
      );
      renderDetails(selected);
    },
  },
  "get-plan": {
    path: "/get-plan",
    render: () => {
      appShell.innerHTML = getPlanView;
      header.classList.add("shadow-header");
      renderGetPlan();
      setupGetPlanSubmission();
    },
  },
};

/* --- Core Functions --- */

/**
 * Ensures data is available before navigation
 */
async function ensureData(viewId) {
  const needsData = [
    "home",
    "exercises",
    "favorites",
    "details",
    "get-plan",
  ].includes(viewId);
  if (needsData && !cachedExercises) {
    appShell.innerHTML = createLoadingState(viewId, "Loading Exercises...");
    cachedExercises = await fetchExercises();
  }
  return cachedExercises;
}

/**
 * Primary Navigation Engine
 */
async function navigateTo(viewId, appendHistory = true, data = null) {
  const route = ROUTES[viewId] || ROUTES.home;
  const exercises = await ensureData(viewId);

  if (appendHistory) {
    const url =
      typeof route.path === "function" ? route.path(data) : route.path;
    window.history.pushState({ viewId, data }, "", url);
  }

  window.scrollTo(0, 0);
  route.render(exercises, data);
}

/* --- Event Handlers --- */

function setupEventListeners() {
  const navMenu = document.querySelector("#nav-container");
  const burgerBtn = document.querySelector("#burger-menu");
  const closeBtn = document.querySelector("#close-menu");

  const closeMobileMenu = () => {
    navMenu?.classList.remove("active");
    document.body.style.overflow = "";
  };

  burgerBtn?.addEventListener("click", () => {
    navMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn?.addEventListener("click", closeMobileMenu);

  // Global Click Delegator
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    closeMobileMenu();

    const viewId = link.getAttribute("data-link");
    const extraData = viewId === "details" ? { name: link.dataset.name } : null;

    navigateTo(viewId, true, extraData);
  });

  window.addEventListener("popstate", (e) => {
    const viewId = e.state?.viewId ?? "home";
    const data = e.state?.data ?? null;
    navigateTo(viewId, false, data);
  });

  window.addEventListener("favoritesUpdated", () => {
    if (window.history.state?.viewId === "favorites") {
      navigateTo("favorites", false);
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true },
  );
}

/* --- Initialization --- */

function init() {
  const currentYearSpan = document.querySelector("#current-year");
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

  renderNavbar(navItems);
  setupEventListeners();
  setupFavoriteListener();

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  let startView = "home";
  let startData = null;

  if (pathParts[0] === "details" && pathParts[1]) {
    startView = "details";
    startData = { name: pathParts[1] };
  } else if (ROUTES[pathParts[0]]) {
    startView = pathParts[0];
  }

  navigateTo(startView, false, startData);
}

init();
