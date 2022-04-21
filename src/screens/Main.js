import {
  ActivityIndicator,
  Appearance,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

import {getCurrentWeather, getWeatherBackgroundByCode} from '../lib/weatherApi';
import {storeData} from '../lib/storage';
import {CityContext} from '../hooks/citycontext';
import {FavoritesContext} from '../hooks/favoritescontext';

const isDarkMode = Appearance.getColorScheme() === 'dark';

const Main = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const {cityName, changeCity} = useContext(CityContext);
  const {favorites, addToFavorites, removeFromFavorites} =
    useContext(FavoritesContext);

  useEffect(() => {
    async function getData() {
      if (cityName === '') {
        changeCity('Rome');
      }
      try {
        const weatherData = await getCurrentWeather(cityName);
        setCurrentWeather(weatherData);
        storeData('@lastCity', cityName);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    }

    getData();
  }, [cityName]);

  return (
    <ImageBackground
      source={getWeatherBackgroundByCode(
        loading ? 1000 : currentWeather.current.condition.code,
        loading ? true : currentWeather.current.is_day === 1,
      )}
      style={styles.mainContainer}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View>
            <ActivityIndicator size={'large'} />
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={styles.topIconContainer}
                onPress={() => navigation.navigate('Find')}>
                <MatIcon
                  name="search"
                  color={'white'}
                  size={30}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.details}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>
                  {currentWeather.location.name},{' '}
                  {currentWeather.location.country}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      favorites.some(
                        favorite =>
                          favorite.name === currentWeather.location.name &&
                          favorite.region === currentWeather.location.region &&
                          favorite.country === currentWeather.location.country,
                      )
                    ) {
                      removeFromFavorites(currentWeather.location.name);
                    } else {
                      addToFavorites({
                        name: currentWeather.location.name,
                        region: currentWeather.location.region,
                        country: currentWeather.location.country,
                      });
                    }
                  }}>
                  <MatIcon
                    name={
                      favorites.some(
                        favorite =>
                          favorite.name === currentWeather.location.name &&
                          favorite.region === currentWeather.location.region &&
                          favorite.country === currentWeather.location.country,
                      )
                        ? 'favorite'
                        : 'favorite-border'
                    }
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Image
                  source={{
                    uri: `https:${currentWeather.current.condition.icon}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    {currentWeather.current.condition.text}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Icon name="thermometer" size={24} />
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    Temperatura: {currentWeather.current.temp_c}° C
                  </Text>
                  <Text style={styles.detailsText}>
                    Percepita: {currentWeather.current.feelslike_c}° C
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Icon name="weather-windy" size={24} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    Wind: {currentWeather.current.wind_kph} km/h
                  </Text>
                  <Text style={styles.detailsText}>
                    Direction: {currentWeather.current.wind_dir}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Icon name="water-outline" size={24} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    Humidity: {currentWeather.current.humidity}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  details: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: isDarkMode ? '#17212b' : '#fff',
    height: '60%',
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  detailsContainer: {
    width: 200,
  },
  detailsText: {
    fontSize: 20,
  },
  error: {backgroundColor: isDarkMode ? '#17212b' : '#fff'},
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 15,
    marginRight: 10,
  },
  headerContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {width: 72, height: 72},
  mainContainer: {flex: 1},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    marginBottom: 10,
  },
  searchIcon: {
    backgroundColor: '#33333370',
    padding: 5,
    borderRadius: 25,
  },
  topIconContainer: {
    width: '90%',
    margin: 10,
    alignItems: 'flex-end',
  },
});
