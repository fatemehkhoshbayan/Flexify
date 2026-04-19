import {
  createNavItem,
  createFeatureCard,
  createExerciseCard,
  createEmptyState,
  createFilterPill,
} from "./dom-utils.js";
import { getFavorites } from "../storage/storage.favorites.js";
import { featureItems } from "../asset/features.js";
import { motivationalQuote } from "../asset/motivational-quote.js";

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

export function renderBanner(title, needSearch = true) {
  const quote =
    motivationalQuote[Math.floor(Math.random() * motivationalQuote.length)];

  return `
    <div>
      <h1>${title}</h1>
      <p>${quote}</p>
      ${
        needSearch
          ? `
        <div class="search-field">
          <i class="fa-solid fa-magnifying-glass fa-xl search-icon"></i>
          <input
          type="search"
          id="search"
          placeholder="Search exercises..."
          class="search-input"
          />
        </div>
      `
          : ""
      }
    </div>
    `;
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
  const bannerContainer = document.querySelector(".banner");
  if (bannerContainer) {
    bannerContainer.innerHTML = renderBanner("Exercises");
  }
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
  const bannerContainer = document.querySelector(".banner");
  if (bannerContainer) {
    bannerContainer.innerHTML = renderBanner("Favorites");
  }

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
  const bannerContainer = document.querySelector(".banner");
  if (bannerContainer) {
    bannerContainer.innerHTML = renderBanner("Exercise Details", false);
  }
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
      <div class="details-content">
        <div class="title">
          <h2>${details.name}</h2>
          <i class="fa-solid fa-heart fa-large ${isFav ? "active" : ""} btn-favorite" data-name="${details.name}"></i>
        </div>
        <dl class="details-meta">
          <dt>Muscle</dt>
          <dd>${details.muscle}</dd>
          <dt>Type</dt>
          <dd>${details.type}</dd>
          <dt>Difficulty</dt>
          <dd>${details.difficulty}</dd>
          <dt>Instructions</dt>
          <dd>${details.instructions}</dd>
          <dt>Safety information</dt>
          <dd>${details.safety_info}</dd>
          <dt>Equipment</dt>
          <dd>
            <ul class="equipment-list">
              ${details.equipments.map((equ) => `<li>${equ}</li>`).join("")}
            </ul>
          </dd>
        </dl>
      </div>
    </article>
  `;
}

export function renderGetPlan() {
  const bannerContainer = document.querySelector(".banner");
  if (bannerContainer) {
    bannerContainer.innerHTML = renderBanner("Get Your Plan", false);
  }
}
