import React from 'react'
import {connect} from 'react-redux'

import NavRefreshGeolocation from './NavRefreshGeolocation'
import WeatherBlock from './WeatherBlock'
import NavFavourWeather from './NavFavourWeather'
import FavourWeatherContainer from './FavourWeatherContainer'

import {weatherSearch, refreshGeolocation} from '../scripts/main'

class  MainComponent extends React.Component {
  componentDidMount(){
    this.props.geoRefresh();
    let cities = JSON.parse(localStorage.getItem('cities'));
    if (cities !== null){
      for (let city of cities.reverse()) {
        this.props.weatherSearch(`q=${city}`, `${city}`);
      }
    }
  }
  render(){
    return (
      <div className='MainComponent'>
        <NavRefreshGeolocation geoRefreshFunc={this.props.geoRefresh} />
        <WeatherBlock data={this.props.geoWeather.data} displayStyle='Geo' id={null} removable={false}/>
        <NavFavourWeather />
        <FavourWeatherContainer data={this.props.favourWeather} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  let newProps = {
    favourWeather : [],
    geoWeather : { key: 'Geo', data: {}} 
  }
  if (state.action !== null){
    for (let key in state.action) {
      if (key !== 'GeolocationWeather'){
        (newProps.favourWeather).unshift({key: key, data: state.action[key]});
      } else {
        newProps.geoWeather = {key: key, data: state.action[key]};
      }
    }
  }
  return newProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    weatherSearch: (city, title) => {
      dispatch(weatherSearch(city, title));
    },
    geoRefresh: () => {
      dispatch(refreshGeolocation());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
