import {createContext} from 'react';

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: ({name, region, country}) => {},
  removeFromFavorites: city => {},
});
