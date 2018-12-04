import axios from "axios";
import {
  Get_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";

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
