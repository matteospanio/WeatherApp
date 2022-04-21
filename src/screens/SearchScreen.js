import {
  ActivityIndicator,
  Appearance,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {CityContext} from '../hooks/citycontext';
import {getSearchOptions} from '../lib/weatherApi';
import {useNavigation} from '@react-navigation/native';

const isDarkMode = Appearance.getColorScheme() === 'dark';

const Search = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {changeCity} = useContext(CityContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function find() {
      if (value.trim() !== '') {
        setLoading(true);
        try {
          const actualOptions = await getSearchOptions(value);
          setOptions(actualOptions);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }
    }

    find();
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={24} />
        <TextInput
          placeholder="Insert city name..."
          onChangeText={text => {
            setValue(text);
          }}
          style={styles.textInput}
          value={value}
        />
        {value !== '' && (
          <TouchableOpacity
            onPress={() => {
              setValue('');
            }}>
            <Icon name="cancel" size={20} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={{flex: 1, width: '100%', marginTop: 15}}
        contentContainerStyle={{alignItems: 'center'}}>
        {error !== '' && <Text>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" />
        ) : options.length === 0 && value.trim() !== '' ? (
          <Text>No results matching key "{value}"</Text>
        ) : (
          options.map(option => (
            <TouchableOpacity
              style={{
                width: '80%',
                marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={option.id}
              onPress={() => {
                changeCity(option.name);
                navigation.navigate('Main');
              }}>
              <IconCommunity
                name="map-marker"
                size={24}
                style={{marginHorizontal: 30}}
              />
              <View>
                <Text style={{fontSize: 20}}>{option.name}</Text>
                <Text style={{fontSize: 16}}>
                  {option.region}, {option.country}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#17212b' : '#fff',
  },
  inputContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: isDarkMode ? '#0e1621' : '#fff',
    elevation: 25,
    marginTop: 15,
  },
  textInput: {
    width: '85%',
  },
});
