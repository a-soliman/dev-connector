// import { firebase, googleAuthProvider } from '../firebase/firebase';
import Axios from "axios";
import { GET_ERRORS } from './types';
import { history } from "../routers/AppRouter";

export const register = (userData) => (dispatch) => {

  /* SEND TO THE API */
  Axios.post("/api/users/register", userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
