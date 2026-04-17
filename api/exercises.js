const API_URL = "https://flexify-backend.vercel.app/exercises";

/**
 * Fetches exercises with optional filters
 * @param {Object} filters - { muscle, type, search, limit }
 * @returns {Promise<Array>}
 */
export async function fetchExercises(filters = {}) {
  try {
    const url = new URL(API_URL);

    if (filters.muscle) url.searchParams.append("muscle", filters.muscle);
    if (filters.type) url.searchParams.append("type", filters.type);
    if (filters.search) url.searchParams.append("search", filters.search);
    if (filters.limit) url.searchParams.append("limit", filters.limit);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Could not fetch exercises:", error);
    return [];
  }
}
