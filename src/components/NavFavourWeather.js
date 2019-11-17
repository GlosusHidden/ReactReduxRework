import React from 'react'
import {connect} from 'react-redux'

import {weatherSearch} from '../scripts/main';

class NavFavourWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  clearInput(){
    this.setState({value: ''});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.weatherSearch(`q=${this.state.value}`, `${this.state.value}`);
    let newCityList = [ this.state.value ];
    let cities = JSON.parse(localStorage.getItem('cities'));
    if (cities != null) {
      for (let city of cities) {
        if (!newCityList.includes(city)) {
          newCityList.push(city);
        }
      }
    }
    localStorage.setItem('cities', JSON.stringify(newCityList))
    this.clearInput()
  }

  render(){
    return (
      <div id="nav_favour_weather">
        <div className="text">Favourites</div>
        <form id="add_favour_form" onSubmit={this.handleSubmit}>
          <input className="input_text" name='city_name' type="text" placeholder="Add new city" required value={this.state.value} onChange={this.handleChange} />
          <input className="img_button" type="image" name="submit" alt="add" src="img/add.png" value="Submit"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    weatherSearch: (city, title) => {
      dispatch(weatherSearch(city, title));
    }
  }
}

export default connect(null, mapDispatchToProps)(NavFavourWeather);
