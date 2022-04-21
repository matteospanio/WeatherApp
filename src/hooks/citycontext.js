import {createContext} from 'react';

export const CityContext = createContext({
  cityName: '',
  changeCity: city => {},
});
