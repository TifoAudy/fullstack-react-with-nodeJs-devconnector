import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  user: authReducer,
  form: formReducer,
  profile: profileReducer,
  post: postReducer
});