import axios from "axios";
import { history } from "../routers/AppRouter";
import {
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  GET_POSTS_PER_USER,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
} from "./types";

/* ACTIVATE LOADING */
export const setPostLoading = () => ({
  type: POST_LOADING
});

/* GET_POST */
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/* GET_POSTS */
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/* GET_POSTS_PER_USER */
export const getPostsPerUser = userId => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_POSTS_PER_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/* ADD_POST */
export const addPost = newPost => dispatch => {
  dispatch(setPostLoading());
  axios
    .post("/api/posts", newPost)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/* DELETE_POST */
export const deletePost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .delete(`/api/posts/${id}`)
    .post("/api/posts", newPost)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
