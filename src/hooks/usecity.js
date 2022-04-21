import {useState, useEffect} from 'react';
import {getData, storeData} from '../lib/storage';

export const useCity = () => {
  const [cityName, setCityName] = useState('');

  const changeCity = newName => {
    storeData('@lastCity', newName);
    setCityName(newName);
  };

  useEffect(() => {
    async function getCityName() {
      const lastCityName = await getData('@lastCity');
      //console.log(lastCityName);
      if (lastCityName) {
        setCityName(lastCityName);
      }
    }
    getCityName();
  }, [cityName]);

  return {cityName, changeCity};
};
