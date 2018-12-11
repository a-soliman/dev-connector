import axios from "axios";
import { history } from "../routers/AppRouter";
import {
  Get_PROFILE,
  Get_PROFILES,
  PROFILE_LOADING,
  CREATE_PROFILE,
  EDIT_PROFILE,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_EDUCATION,
  GET_PROFILES
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

/* GET PROFILES ARRAY */
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: Get_PROFILES,
        payload: res.data,
        loading: false
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: [],
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
/* EDIT PROFILE */
export const editProfile = profileData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profile", profileData)
    .then(res => {
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data,
        loading: false
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

/* GET CURRENT PROFILE */
export const getProfileByHabdle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: Get_PROFILE,
        payload: res.data,
        loading: false
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
        loading: false
      });
      history.push("/not-found");
    });
};

/* DELETE ACCOUNT */
export const deleteAccount = () => dispatch => {
  if (!window.confirm("Are you sure? This can not be undone!")) {
    return;
  }
  dispatch(setProfileLoading());
  axios
    .delete("/api/profile")
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/* ADD_EXPERIENCE */
export const addExperience = newExperience => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("api/profile/experience", newExperience)
    .then(res => {
      dispatch({
        type: ADD_EXPERIENCE,
        payload: res.data
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

/* DELETE_EXPERIENCE */
export const deleteExperience = id => dispatch => {
  if (!window.confirm("Are you sure? this can NOT be undone!")) return;

  dispatch(setProfileLoading());
  axios
    .delete(`api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EXPERIENCE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/* ADD_EDUCATION */
export const addEducation = newEducation => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("api/profile/education", newEducation)
    .then(res => {
      dispatch({
        type: ADD_EDUCATION,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

/* DELETE_EDUCATION */
export const deleteEducation = id => dispatch => {
  if (!window.confirm("Are you sure? this can NOT be undone!")) return;

  dispatch(setProfileLoading());
  axios
    .delete(`api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EDUCATION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
