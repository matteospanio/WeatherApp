import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`An error occurred while saving string ${value}`);
    throw Error(e.message);
  }
};

/**
 * @param key string to retrieve the value
 * @param value data (=object) you're storing
 * @throws error if could not store the (K, V) pair
 */
export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`An error occurred while saving object ${value}`);
    throw Error(e.message);
  }
};

/**
 * @param key string to retrieve the value
 * @returns a string containing the associated value to the input key
 * @throws error if could not store the (K, V) pair
 */
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('An error occurred while reading the string');
    throw Error(e.message);
  }
};

export const getObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('An error occurred while reading the object');
    throw Error(e.message);
  }
};
