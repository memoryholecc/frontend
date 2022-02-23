export type FavoriteItem = {
  id: string;
  timestamp: number;
};

export type FavoriteStorage = {
  creators: FavoriteItem[];
};

/**
 * Returns the raw FavoriteStorage object from LocalStorage.
 * @returns FavoriteStorage
 */
export function getAllFavorites(): FavoriteStorage {
  const storage = localStorage.getItem('favorites');
  if (storage) {
    const favorites: FavoriteStorage = JSON.parse(storage);
    favorites.creators.sort((a, b) => a.timestamp - b.timestamp);
    return favorites;
  } else {
    return { creators: [] };
  }
}

/**
 *
 * @returns All favorite Creator IDs ordered by date favorited (ascending).
 */
export function getFavoriteCreatorIds(): string[] {
  return getAllFavorites().creators.map((x) => {
    return x.id;
  });
}

/**
 * Determines if the given Creator ID is a favorite.
 * @param id Creator ID
 * @returns True if the given ID is a favorite, false if not.
 */
export function isCreatorFavorite(id: string): boolean {
  return getFavoriteCreatorIds().indexOf(id) !== -1;
}

/**
 * Adds/removes a Creator ID from the favorites list based off if it is already a favorite or not.
 * @param id Creator ID
 * @returns Boolean representing the Creator ID's new favorite state.
 */
export function toggleCreatorFavorite(id: string): boolean {
  isCreatorFavorite(id) ? removeCreatorFavorite(id) : addCreatorFavorite(id);
  return isCreatorFavorite(id);
}

/**
 * Adds a Creator ID to the favorites list.
 * @param id Creator ID
 * @returns True if the ID was added. False if it was already a favorite.
 */
export function addCreatorFavorite(id: string): boolean {
  if (!isCreatorFavorite(id)) {
    const favorites = getAllFavorites();
    favorites.creators.push({ id, timestamp: new Date().getTime() });
    updateLocalStorage(favorites);
    return true;
  }
  return false;
}

/**
 * Removes a Creator ID from the favorites list.
 * @param id Creator ID
 * @returns True if the creator was removed. False if it was not a favorite.
 */
export function removeCreatorFavorite(id: string): boolean {
  const index = getFavoriteCreatorIds().indexOf(id);
  if (index !== -1) {
    const favorites = getAllFavorites();
    favorites.creators.splice(index, 1);
    updateLocalStorage(favorites);
    return true;
  }
  return false;
}

/**
 * Updates localStorage with the data given.
 * @param newFavorites
 */
function updateLocalStorage(favorites: FavoriteStorage): void {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
