import {Appearance, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import PlaceItem from '../components/PlaceItem';
import {FavoritesContext} from '../hooks/favoritescontext';

const isDarkMode = Appearance.getColorScheme() === 'dark';

const Places = () => {
  const {favorites: places} = useContext(FavoritesContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {places.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>No favorite places found</Text>
          </View>
        ) : (
          places.map((place, index) => (
            <PlaceItem
              key={index}
              name={place.name}
              region={place.region}
              country={place.country}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Places;

const styles = StyleSheet.create({
  container: {
    backgroundColor: isDarkMode ? '#17212b' : '#fff',
    flex: 1,
  },
});
