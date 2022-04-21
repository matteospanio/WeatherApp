import {
  ActivityIndicator,
  Appearance,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {CityContext} from '../hooks/citycontext';
import {getForecast, getWeatherBackgroundByCode} from '../lib/weatherApi';

const isDarkMode = Appearance.getColorScheme() === 'dark';

const Forecast = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  const {cityName} = useContext(CityContext);

  useEffect(() => {
    async function init() {
      const actualforecast = await getForecast(cityName, 2);
      setForecast(actualforecast);
      setLoading(false);
    }
    init();
  }, [cityName]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ImageBackground
            source={getWeatherBackgroundByCode(1000, false)}
            resizeMode="cover">
            <View style={{padding: 15, alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 25}}>{cityName}</Text>
            </View>
            <View
              style={{
                backgroundColor: isDarkMode ? '#17212b' : '#fff',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                paddingTop: 15,
              }}>
              {forecast.forecast.forecastday[0].hour.map((forecasta, index) => (
                <View key={index} style={styles.row}>
                  <Text style={{marginRight: 30}}>
                    {forecasta.time.split(' ')[1]}
                  </Text>
                  <Image
                    source={{
                      uri: `http:${forecasta.condition.icon}`,
                    }}
                    style={[styles.image]}
                  />

                  <Text style={{marginRight: 30, width: 100}}>
                    {forecasta.condition.text}
                  </Text>
                  <Text>{forecasta.temp_c}° C</Text>
                </View>
              ))}
            </View>
          </ImageBackground>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    backgroundColor: isDarkMode ? '#17212b' : '#fff',
    flex: 1,
  },
  image: {
    height: 64,
    width: 64,
    marginRight: 30,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
  },
});
