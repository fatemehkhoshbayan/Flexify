import { createLoadingState, createEmptyState } from "./dom-utils.js";
import { fetchExercises } from "./api.js";
import { renderExerciseList } from "./renderer.js";
import { debounce } from "../utils/debounce.js";
import { toggleFavorite } from "../storage/storage.favorites.js";
import { getFavorites } from "../storage/storage.favorites.js";

const activeFilters = {
  search: "",
  difficulty: "",
};

/* --- Search and filter functionality --- */

async function updateExerciseDisplay() {
  const container = document.querySelector(".exercises-container");
  if (!container) return;

  // Identify where we are
  const currentView = window.history.state?.viewId || "exercises";

  container.innerHTML = createLoadingState();

  // 1. Fetch data based on search/difficulty filters
  let exercises = await fetchExercises({
    search: activeFilters.search,
    difficulty: activeFilters.difficulty,
  });

  // 2. If we are on the favorites page, narrow results to ONLY favorites
  if (currentView === "favorites") {
    const favoriteNames = getFavorites();
    exercises = exercises.filter((ex) => favoriteNames.includes(ex.name));
  }

  // 3. Render logic
  if (!exercises || exercises.length === 0) {
    container.classList.remove("grid");
    container.classList.add("flex");

    const message =
      currentView === "favorites"
        ? "No favorites match your search!"
        : "Sorry, no search results!";

    container.innerHTML = createEmptyState(message);
  } else {
    container.classList.remove("flex");
    container.classList.add("grid");

    // Use the generic list renderer to avoid re-triggering filter creation
    renderExerciseList(exercises, 0, "No results found");
  }
}

export function setupFavoriteListener() {
  document.addEventListener("click", (e) => {
    const favoriteBtn = e.target.closest(".btn-favorite");
    if (!favoriteBtn) return;

    const name = favoriteBtn.dataset.name;
    const updatedFav = toggleFavorite(name);
    const isActive = updatedFav.includes(name);

    favoriteBtn.classList.toggle("active", isActive);
    const event = new CustomEvent("favoritesUpdated", { detail: { name } });
    window.dispatchEvent(event);
  });
}

export function setupExercisesPageListener() {
  const searchInput = document.querySelector("#search");
  const filterContainer = document.querySelector(".filters");
  const clearBtn = document.querySelector("#btn-clear");

  const handleSearch = debounce((value) => {
    if (value.length >= 3 || value.length === 0) {
      activeFilters.search = value;
      updateExerciseDisplay();
    }
  }, 400);

  // Search Functionality (3-letter rule)
  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value.trim());
  });

  // Filter Functionality
  filterContainer.addEventListener("click", async (e) => {
    const pill = e.target.closest(".btn-filter");
    if (!pill) return;

    document.querySelectorAll(".btn-filter").forEach((btn) => {
      btn.classList.remove("btn-filter-active");
    });
    pill.classList.add("btn-filter-active");

    activeFilters.difficulty = pill.dataset.value;
    updateExerciseDisplay();
  });

  clearBtn.addEventListener("click", async () => {
    document.querySelectorAll(".btn-filter").forEach((btn) => {
      btn.classList.remove("btn-filter-active");
    });

    activeFilters.difficulty = "";

    updateExerciseDisplay();
  });
}

export function setupGetPlanSubmission() {
  const form = document.querySelector("#get-plan form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Plan Request:", data);

    showToast("Success! Your fitness plan is being generated.");

    form.reset();
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}
