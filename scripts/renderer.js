import {
  createNavItem,
  createFeatureCard,
  createExerciseCard,
  createEmptyState,
  createFilterPill,
} from "./dom-utils.js";

/* --- Logic / Render Functions --- */

const navContainer = document.querySelector("#nav-container ul");

export function renderNavbar(items) {
  if (navContainer) {
    navContainer.innerHTML = items.map(createNavItem).join("");
  }
}

export function renderFeatures(items) {
  const container = document.querySelector(".features-container");
  if (container) {
    container.innerHTML = items.map(createFeatureCard).join("");
  }
}

export function renderExercises(exercises, limit = null) {
  const container = document.querySelector(".exercises-container");
  const filterList = ["beginner", "intermediate", "expert"];
  const filterContainer = document.querySelector(".filters");

  if (!container) return;

  if (filterContainer && filterContainer.innerHTML.trim() === "") {
    filterContainer.innerHTML = filterList.map(createFilterPill).join("");
  }

  if (!exercises || !Array.isArray(exercises)) {
    container.innerHTML = createEmptyState(
      exercises,
      "Sorry Something Went wrong, Please try again!",
    );
    return;
  }
  const displayList = limit ? exercises.slice(0, limit) : exercises;
  container.innerHTML = displayList.map(createExerciseCard).join("");
}
