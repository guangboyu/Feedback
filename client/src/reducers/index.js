import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as form } from 'redux-form';
import surveysReducer from './surveysReducer'

export default combineReducers({
  auth: authReducer,
  form,
  surveys: surveysReducer
})
