import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import resources from './resources';
import {routerReducer} from 'react-router-redux';


export default combineReducers({
  form: formReducer,
  resources,
  routing: routerReducer
});
