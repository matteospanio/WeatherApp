import {useState, useEffect} from 'react';
import {getObject, storeObject} from '../lib/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = city => {
    const newArray = [...favorites, city];
    storeObject('@favorites', newArray);
    setFavorites(newArray);
  };

  const removeFromFavorites = city => {
    const newArray = favorites.filter(savedCity => savedCity.name !== city);
    storeObject('@favorites', newArray);
    setFavorites(newArray);
  };

  useEffect(() => {
    async function getFavorites() {
      const savedFavorites = await getObject('@favorites');
      if (savedFavorites) {
        setFavorites(savedFavorites);
      }
    }
    getFavorites();
  }, [favorites]);

  return {favorites, addToFavorites, removeFromFavorites};
};
