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

  if (!filterContainer || !clearBtn) return;

  const handleSearch = debounce((value) => {
    if (value.length >= 3 || value.length === 0) {
      activeFilters.search = value;
      updateExerciseDisplay();
    }
  }, 400);

  // Search Functionality (3-letter rule)
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSearch(e.target.value.trim());
    });
  }

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
  const container = document.querySelector("#get-plan");
  if (!container) return;

  const form = container.querySelector("form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const nameError = form.querySelector(".name-error");
  const emailInput = form.querySelector("#email");
  const emailError = form.querySelector(".email-error");
  const weightInput = form.querySelector("#weight");
  const heightInput = form.querySelector("#height");
  const noteInput = form.querySelector("#note");

  if (
    !nameInput ||
    !nameError ||
    !emailInput ||
    !emailError ||
    !weightInput ||
    !heightInput ||
    !noteInput
  ) {
    return;
  }

  const validateName = () => {
    const value = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (value === "") {
      nameInput.setCustomValidity("Name is required!");
    } else if (!nameRegex.test(value)) {
      nameInput.setCustomValidity(
        "Names cannot contain numbers or special characters.",
      );
    } else {
      nameInput.setCustomValidity("");
    }
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      emailInput.setCustomValidity("");
    } else if (!emailPattern.test(value)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }
  };

  const validateWeight = () => {
    const value = weightInput.value.trim();
    if (value === "") {
      weightInput.setCustomValidity("");
    } else if (!/^\d+(\.\d+)?$/.test(value)) {
      weightInput.setCustomValidity("Weight must be a valid number.");
    } else if (Number(value) <= 0) {
      weightInput.setCustomValidity("Weight must be greater than zero.");
    } else {
      weightInput.setCustomValidity("");
    }
  };

  const validateHeight = () => {
    const value = heightInput.value.trim();
    if (value === "") {
      heightInput.setCustomValidity("");
    } else if (!/^\d+(\.\d+)?$/.test(value)) {
      heightInput.setCustomValidity("Height must be a valid number.");
    } else if (Number(value) <= 0) {
      heightInput.setCustomValidity("Height must be greater than zero.");
    } else {
      heightInput.setCustomValidity("");
    }
  };

  const validateNote = () => {
    if (noteInput.value.length <= 100) {
      noteInput.setCustomValidity("Note must be at least 100 characters.");
    } else {
      noteInput.setCustomValidity("");
    }
  };

  const showOrClearFieldError = (field) => {
    const errorEl = field
      .closest(".form-group")
      ?.querySelector(".error-message");
    if (!errorEl) return;

    if (field.validity.valid) {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    } else {
      errorEl.textContent = field.validationMessage;
      errorEl.style.display = "flex";
    }
  };

  form.addEventListener(
    "invalid",
    (e) => {
      e.preventDefault();
      showOrClearFieldError(e.target);
    },
    true,
  );

  form.addEventListener("input", (e) => {
    if (e.target === nameInput) validateName();
    if (e.target === emailInput) validateEmail();
    if (e.target === weightInput) validateWeight();
    if (e.target === heightInput) validateHeight();
    if (e.target === noteInput) validateNote();

    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      showOrClearFieldError(e.target);
    }
  });

  form.addEventListener("submit", (e) => {
    validateName();
    validateEmail();
    validateWeight();
    validateHeight();
    validateNote();

    if (!form.checkValidity()) {
      e.preventDefault();
      form.querySelectorAll("input, select, textarea").forEach((el) => {
        showOrClearFieldError(el);
      });
      return;
    }

    e.preventDefault();
    const formData = new FormData(form);
    console.log("Plan Request:", Object.fromEntries(formData.entries()));

    showToast("Success! Your fitness plan is being prepared.");

    form.reset();
    form.querySelectorAll(".error-message").forEach((msg) => {
      msg.style.display = "none";
      msg.textContent = "";
    });
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
