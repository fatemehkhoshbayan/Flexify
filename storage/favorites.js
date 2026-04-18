const KEY = "favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) ?? [];
}

export function toggleFavorite(name) {
  const favorites = getFavorites();

  const exists = favorites.includes(name);

  const updated = exists
    ? favorites.filter((item) => item !== name)
    : [...favorites, name];

  localStorage.setItem(KEY, JSON.stringify(updated));

  return updated;
}
