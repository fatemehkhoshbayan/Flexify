import {
  createNavItem,
  createFeatureCard,
  createExerciseCard,
  createEmptyState,
  createFilterPill,
} from "./dom-utils.js";
import { getFavorites } from "../storage/storage.favorites.js";

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
  const favorites = getFavorites();
  const filterList = ["beginner", "intermediate", "expert"];
  const filterContainer = document.querySelector(".filters");

  if (!container) return;

  if (filterContainer && filterContainer.innerHTML.trim() === "") {
    filterContainer.innerHTML = filterList.map(createFilterPill).join("");
  }

  const displayList = limit ? exercises?.slice(0, limit) : exercises;

  if (!displayList || displayList.length == 0) {
    container.classList.remove("grid");
    container.classList.add("flex");

    container.innerHTML = createEmptyState(
      "Sorry Something Went wrong, Please try again!",
    );
    return;
  } else {
    container.classList.remove("flex");
    container.classList.add("grid");

    container.innerHTML = displayList
      .map((exercise) => {
        const isFav = favorites.some(
          (f) => f.toLowerCase() === exercise.name.toLowerCase(),
        );
        return createExerciseCard(exercise, isFav);
      })
      .join("");
  }
}
