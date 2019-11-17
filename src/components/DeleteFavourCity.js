import React from 'react'
import {connect} from 'react-redux'
import * as ReduxActions from '../actions/index'

class DeleteFavourCity extends React.Component {
  render(){
    return (
        <input className="img_button" type="image" name="submit" alt="delete" onClick={() => this.props.deleteFavour(this.props.id)} src="img/del.png" />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFavour: (key) => {
      dispatch(deleteFavour(key));
    }
  }
}

const deleteFavour = (key) => {
  localStorage.removeItem(key);
  let cities = JSON.parse(localStorage.getItem('cities'));
  cities.splice(cities.indexOf(key), 1)
  localStorage.setItem('cities', JSON.stringify(cities))
  return (dispatch) => {
    dispatch(ReduxActions.deleteFavour(key));
  }
}



export default connect(null, mapDispatchToProps)(DeleteFavourCity);
