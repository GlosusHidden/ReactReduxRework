import {combineReducers} from 'redux';
import Actions from './actions';

const allReducers = combineReducers ({
  action: Actions
});

export default allReducers;

// const weatherByGeolocation = () => {
//   return {
//     data: {
//       city: undefined,
//       temp: undefined,
//       pressure: undefined,
//       humidity: undefined,
//       weather: undefined,
//       wind: undefined,
//       icon: undefined
//     },
//     loading: false,
//     error: false
//   }
// }
