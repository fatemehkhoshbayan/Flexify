import { createLoadingState, createEmptyState } from "./dom-utils.js";
import { fetchExercises } from "./api.js";
import { renderExercises } from "./renderer.js";
import { debounce } from "../utils/debounce.js";
import { toggleFavorite } from "../storage/favorites.js";

const activeFilters = {
  search: "",
  difficulty: "",
};

/* --- Search and filter functionality --- */

async function updateExerciseDisplay() {
  const container = document.querySelector(".exercises-container");
  if (!container) return;

  container.innerHTML = createLoadingState();

  const exercises = await fetchExercises({
    search: activeFilters.search,
    difficulty: activeFilters.difficulty,
  });

  if (!exercises || exercises.length === 0) {
    container.classList.remove("grid");
    container.classList.add("flex");
    container.innerHTML = createEmptyState(
      "Sorry Something Went wrong, Please try again!",
    );
  } else {
    container.classList.remove("flex");
    container.classList.add("grid");
    renderExercises(exercises);
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

  setupFavoriteListener();
}
