import * as ReduxActions from '../actions/index'

const API_KEY = '73a2f4a5254e97adabb2160caa6234a8';

const refreshGeolocation = () => {
  return (dispatch) => {
    let requestCreator = 'GeolocationWeather'
    dispatch(ReduxActions.requestForGeolocation(requestCreator));
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure, {enableHighAccuracy: true});

    function geolocationSuccess(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let requestStr = `lat=${latitude}&lon=${longitude}`;
      return dispatch(weatherSearch(requestStr, requestCreator));
    }

    function geolocationFailure(error) {
      let defaultCity = 'Saint Petersburg';
      let requestStr = `q=${defaultCity}`;
      return dispatch(weatherSearch(requestStr, requestCreator));
    }
  }
}

const weatherSearch = (requestStr, requestCreator) => {
  return (dispatch) => {
    dispatch(ReduxActions.requestWeather(requestCreator));
    let link = `https://api.openweathermap.org/data/2.5/weather?${requestStr}&units=metric&appid=${API_KEY}`;
    fetch(link)
      .then(res => res.json())
      .then(
        data => dispatch(ReduxActions.requestWeatherSuccess(apiResultParser(data), requestCreator)),
        err => dispatch(ReduxActions.requestWeatherError(requestCreator))
      )
  }
}

const apiResultParser = (data) => {
  if (data.cod === 200) {
    return {
      cod: data.cod,
      city: data.name,
      temp: Math.round(parseFloat(data.main.temp)),
      pressure: Math.round(parseInt(data.main.pressure) * 0.75),
      humidity: data.main.humidity,
      weather: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
      icon: data.weather[0].icon,
      wind: data.wind.speed,
      coords: [data.coord.lat, data.coord.lon]
    };
  } else {
    return { cod: data.cod }
  }
}

export {refreshGeolocation, weatherSearch};
