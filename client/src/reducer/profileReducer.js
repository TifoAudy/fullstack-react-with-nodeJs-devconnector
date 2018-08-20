import { FETCH_PROFILE } from '../action/type';

export default function(state = null, action){
  switch(action.type){
    case FETCH_PROFILE:
      return action.payload || false;
    default:
      return state;
  }
}