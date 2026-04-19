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

export function renderDetails(details) {
  const container = document.querySelector(".details");
  const favorites = getFavorites();
  const isFav = favorites.some(
    (f) => f.toLowerCase() === details.name.toLowerCase(),
  );

  if (!container || !details) return;

  container.innerHTML = `
    <article class="details-card">
      <figure>
        <img src="/media/images/exercises/${details.muscle}.png" class="exercise-image"/>
      </figure>
      <section class="details-content">
        <div class="title">
          <h2>${details.name}</h2>
          <i class="fa-solid fa-heart fa-large ${isFav ? "active" : ""} btn-favorite" data-name="${details.name}"></i>
        </div>
        <p><strong>Muscle:</strong> ${details.muscle}</p>
        <p><strong>Type:</strong> ${details.type}</p>
        <p><strong>Difficulty:</strong> ${details.difficulty}</p>
        <p><strong>Instructions:</strong> ${details.instructions}</p>
        <p><strong>Safety Information:</strong> ${details.safety_info}</p>
        <p><strong>Equipments:</strong></p>
        <ul class="equipment-list">
          ${details.equipments.map((equ) => `<li>${equ}</li>`).join("")}
        </ul>
      </section>
    </article>
  `;
}
