/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';
import {CityContext} from './src/hooks/citycontext';
import {useCity} from './src/hooks/usecity';
import {FavoritesContext} from './src/hooks/favoritescontext';
import {useFavorites} from './src/hooks/usefavorites';

const App = () => {
  const cityState = useCity();
  const favorites = useFavorites();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CityContext.Provider value={cityState}>
          <FavoritesContext.Provider value={favorites}>
            <TabNavigator />
          </FavoritesContext.Provider>
        </CityContext.Provider>
      </NavigationContainer>
      <StatusBar barStyle="default" />
    </SafeAreaProvider>
  );
};

export default App;
