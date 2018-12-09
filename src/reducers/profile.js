import {
  Get_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  CREATE_PROFILE,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  ADD_EDUCATION
} from "../actions/types";

import isEmpty from "../validation/is-empty";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    case Get_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case ADD_EXPERIENCE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case DELETE_EXPERIENCE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case ADD_EDUCATION:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
