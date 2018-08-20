import { FETCH_POST, NEW_POST, NEW_COMMENT, ADD_COMMENT, GET_POSTS } from '../action/type';

const INITIAL_STATE = {
  posts: [],
  post: {},
  loading: false
}

export default function(state = INITIAL_STATE ,action){
  switch(action.type){
    case FETCH_POST:
    console.log('fetching')
      return {...state, loading: true };
    case GET_POSTS:
      return {...state, posts: action.payload, loading: false }
    case NEW_POST:
      return {...state, posts:[action.payload,...state.posts], loading: false }
    case ADD_COMMENT:
      return {...state, loading: true };
    case NEW_COMMENT:
      const { comments } = action.payload
      return {...state, post: comments[comments.length-1] } 
    default:
      return state;
  }
};