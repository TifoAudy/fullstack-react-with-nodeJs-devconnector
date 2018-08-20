import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { 
  LOGIN_USER, 
  AUTH_FAILED, 
  FETCH_PROFILE,
  FETCH_POST,
  NEW_POST,
  NEW_COMMENT,
  ADD_COMMENT,
  GET_POSTS,
  TOGGLE_LIKE
} from './type'

export const loginUser = (userData, history) => async dispatch => {
  const res = await axios.post('/api/login', userData);
  if (res.data.token === undefined) {
    dispatch({
      type: AUTH_FAILED,
      payload: res.data.password
    })
  } else {
    //get the token
    const { token } = res.data;
    //set token to localStorage
    localStorage.setItem('jwtToken', token);
    //set token to auth header for doing protected request
    setAuthToken(token);
    //decode the token
    const decoded = jwt_decode(token);
    //dispatch to authReducer
    dispatch({
      type: LOGIN_USER,
      payload: decoded
    });
    history.push('/user');
  }
};


export const fetchUser = () => async dispatch => {
  if (localStorage.jwtToken) {
    const res = await axios.get('/api/current_user');
    dispatch({ type: LOGIN_USER, payload: res.data })
  }else{
    dispatch({ type: LOGIN_USER, payload: "" });
  }
};


export const logoutUser = () => async dispatch => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove the auth header
  setAuthToken(false);
  //set user to empty object
  dispatch({
    type: LOGIN_USER,
    payload: {}
  });
}

export const editProfile = (value,history) => async dispatch => {
  const res = await axios.post('/api/profile', value);
  dispatch({ type: FETCH_PROFILE, payload: res.data });

  history.push('/user');
}

export const fetchProfile = () => async dispatch => {
  const res = await axios.get('/api/profile');
  dispatch({ type: FETCH_PROFILE, payload: res.data });
}

export const fetchPost = () => async dispatch => {
  dispatch({ type: FETCH_POST })
  const res = await axios.get('api/post');

  dispatch({ type: GET_POSTS, payload : res.data });
}

export const addPost = (value) => async dispatch => {
  const res = await axios.post('api/post', value);

  dispatch({ type: NEW_POST, payload: res.data });
}

export const toggleLike = (postID) => async dispatch => {
  const res = await axios.post(`/api/post/like/${postID}`);

  console.log('hahaha');
  
  dispatch(fetchPost());
}

export const postComment = (value,id) => async dispatch => {
  dispatch({ type: ADD_COMMENT });
  const res = await axios.post(`/api/post/comment/${id}`, value);
  console.log(res.data)
  dispatch({ type: NEW_COMMENT, payload: res.data });
}