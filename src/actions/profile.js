import axios from "axios";
import { history } from "../routers/AppRouter";
import {
  Get_PROFILE,
  PROFILE_LOADING,
  CREATE_PROFILE,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";
import CreateProfile from "../components/create-profile/CreateProfile";

/* GET CURRENT PROFILE */
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: Get_PROFILE,
        payload: res.data,
        loading: false
      })
    )
    .catch(err =>
      dispatch({
        type: Get_PROFILE,
        payload: {},
        loading: false
      })
    );
};

/* PROFILE LOADING */
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

/* CLEAR PROFILE */
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

/* CREATE PROFILE */
export const createProfile = profileData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profile", profileData)
    .then(res => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
        loading: false
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
