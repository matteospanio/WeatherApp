import {API_KEY, WEATHER_API} from '@env';

export async function getCurrentWeather(location) {
  try {
    const rawFetch = await fetch(
      `${WEATHER_API}?key=${API_KEY}&q=${location}&aqi=no`,
    );
    const result = await rawFetch.json();

    return result;
  } catch (e) {
    throw Error(e.message);
  }
}

export async function getForecast(location, days) {
  try {
    const rawFetch = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=no&alerts=no`,
    );
    const result = await rawFetch.json();

    return result;
  } catch (e) {
    throw Error(e.message);
  }
}

export async function getSearchOptions(cityName) {
  try {
    const rawFetch = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityName}`,
    );
    const result = await rawFetch.json();

    return result;
  } catch (e) {
    throw Error(e.message);
  }
}

export function getWeatherBackgroundByCode(code, isDay) {
  switch (code) {
    case 1000:
      return isDay
        ? require('../../assets/bright_sky.jpg')
        : require('../../assets/moon_no_clouds.jpg');
    case 1003:
      return isDay
        ? require('../../assets/pic_1522753709_1.jpg')
        : require('../../assets/night.jpg');
    case 1006:
      return;
    case 1009:
      return;
    case 1030:
      return;
    case 1063:
      return;
    case 1066:
      return;
    case 1069:
      return;
    case 1072:
      return;
    case 1087:
      return;
    case 1114:
      return;
    case 1117:
      return;
    case 1135:
      return;
    case 1147:
      return;
    case 1150:
      return;
    case 1153:
      return;
    case 1168:
      return;
    case 1171:
      return;
    case 1180:
      return;
    case 1183:
      return;
    case 1186:
      return;
    case 1189:
      return;
    case 1192:
      return;
    case 1195:
      return;
    case 1198:
      return;
    case 1201:
      return;
    case 1204:
      return;
    case 1207:
      return;
    case 1210:
      return;
    case 1213:
      return;
    case 1216:
      return;
    case 1219:
      return;
    case 1222:
      return;
    case 1225:
      return;
    case 1237:
      return;
    case 1240:
      return;
    case 1243:
      return;
    case 1246:
      return;
    case 1249:
      return;
    case 1252:
      return;
    case 1255:
      return;
    case 1258:
      return;
    case 1261:
      return;
    case 1264:
      return;
    case 1273:
      return;
    case 1276:
      return;
    case 1279:
      return;
    case 1282:
      return;
    default:
      break;
  }
}
