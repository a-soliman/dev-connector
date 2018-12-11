import {
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  GET_POSTS_PER_USER,
  ADD_POST,
  DELETE_POST,
  ADD_LIKE,
  UN_LIKE
} from "../actions/types";

import isEmpty from "../validation/is-empty";

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_POST:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case GET_POSTS_PER_USER:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };

    case ADD_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id !== action.payload._id ? post : action.payload
        ),
        loading: false
      };

    case UN_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id !== action.payload._id ? post : action.payload
        ),
        loading: false
      };

    default:
      return state;
  }
};
