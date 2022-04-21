import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getImageFromString} from '../lib/pexelsImage';
import {CityContext} from '../hooks/citycontext';

const PlaceItem = ({name, region, country}) => {
  const [display, setDisplay] = useState(true);
  const [image, setImage] = useState(
    'https://lp-cms-production.imgix.net/2021-06/shutterstockRF_679580596.jpg?auto=format&fit=crop&ixlib=react-8.6.4&h=72&w=72&q=50&dpr=2',
    //'https://images.fineartamerica.com/images-medium-large-5/1-the-abbey-cloister-mont-saint-michel-russ-bishop.jpg',
  );

  const navigation = useNavigation();
  const {changeCity} = useContext(CityContext);

  useEffect(() => {
    async function init() {
      const actualImage = await getImageFromString(name);
      if (actualImage !== null) {
        setImage(actualImage);
      }
    }
    init();
    return () => {
      setDisplay(false);
    };
  }, [name]);

  return (
    <View style={styles.placeItem}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          changeCity(name);
          navigation.navigate('Main');
        }}>
        {display && <Image source={{uri: image}} style={styles.avatar} />}
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text>
            {region}, {country}
          </Text>
        </View>
        <Icon name="chevron-right" size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  placeItem: {
    width: '100%',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  row: {
    maxWidth: 756,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  text: {
    fontSize: 18,
  },
});
