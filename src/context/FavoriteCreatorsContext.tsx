import { createContext, useContext, useState } from 'react';
import { getAllFavorites, toggleCreatorFavorite } from 'utils/MemoryFavorites';

const favoritesList = getAllFavorites();

const FavoriteCreatorsContext = createContext(favoritesList);
export function useGetFavoriteCollections() {
  return useContext(FavoriteCreatorsContext);
}

const UpdateFavoriteCreatorsContext = createContext<(creatorID: string) => void>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
);
export function useUpdateFavoriteCreators() {
  return useContext(UpdateFavoriteCreatorsContext);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FavoriteCreatorsProvider(props: any) {
  const [favorites, setFavorites] = useState(favoritesList);

  function toggleFavoriteCreator(creatorID: string) {
    const isFav = favorites.creators.find((fav) => fav.id === creatorID) !== undefined;
    toggleCreatorFavorite(creatorID);
    if (!isFav) {
      const now = new Date().getTime();
      favorites.creators.push({ id: creatorID, timestamp: now });
    } else {
      const index = favorites.creators.findIndex((fav) => fav.id === creatorID);
      favorites.creators.splice(index, 1);
    }
    setFavorites(favorites);
  }

  return (
    <FavoriteCreatorsContext.Provider value={favorites}>
      <UpdateFavoriteCreatorsContext.Provider value={toggleFavoriteCreator}>
        {props.children}
      </UpdateFavoriteCreatorsContext.Provider>
    </FavoriteCreatorsContext.Provider>
  );
}
