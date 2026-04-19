import {
  createNavItem,
  createFeatureCard,
  createExerciseCard,
  createEmptyState,
  createFilterPill,
} from "./dom-utils.js";
import { getFavorites } from "../storage/storage.favorites.js";
import { featureItems } from "../asset/features.js";

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

export function renderExerciseList(exercises, limit = 0, emptyTxt) {
  const container = document.querySelector(".exercises-container");
  const favorites = getFavorites();

  if (!container) return;

  const displayList = limit ? exercises?.slice(0, limit) : exercises;

  if (!displayList || displayList.length == 0) {
    container.classList.remove("grid");
    container.classList.add("flex");

    container.innerHTML = createEmptyState(emptyTxt);
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

export function renderLanding(exercises) {
  renderFeatures(featureItems);
  renderExerciseList(
    exercises,
    3,
    "Sorry Something Went wrong, Please try again!",
  );
}

export function renderExercises(exercises) {
  const container = document.querySelector(".exercises-container");
  const filterList = ["beginner", "intermediate", "expert"];
  const filterContainer = document.querySelector(".filters");

  if (!container) return;

  if (filterContainer && filterContainer.innerHTML.trim() === "") {
    filterContainer.innerHTML = filterList.map(createFilterPill).join("");
  }

  renderExerciseList(
    exercises,
    0,
    "Sorry Something Went wrong, Please try again!",
  );
}

export function renderFavorites(cachedExercises) {
  const filterList = ["beginner", "intermediate", "expert"];
  const filterContainer = document.querySelector(".filters");

  const favoriteNames = getFavorites();
  const favoriteObjects = cachedExercises.filter((exercise) =>
    favoriteNames.includes(exercise.name),
  );

  if (filterContainer && filterContainer.innerHTML.trim() === "") {
    filterContainer.innerHTML = filterList.map(createFilterPill).join("");
  }

  renderExerciseList(
    favoriteObjects,
    0,
    "No exercises has been added to Favorites!",
  );
}
