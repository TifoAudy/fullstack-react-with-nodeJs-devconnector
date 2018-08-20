import { LOGIN_USER, AUTH_FAILED } from '../action/type';

const INITIAL_STATE = {
  user: null,
  failed: ''
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case LOGIN_USER:
      return {...state, user: action.payload || false };
    case AUTH_FAILED:
      return {...state, user: false, failed: 'gagal login' }
    default:
      return state;
  }
}