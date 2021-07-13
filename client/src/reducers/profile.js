import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, NO_REPOS, PROFILE_ERROR, RESET_LOADING, UPDATE_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
        return {
          ...state,
          profiles: payload,
          loading: false
        };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile:null,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
        error:{}
      };
    case GET_REPOS:
        return {
          ...state,
          repos: payload,
          loading: false
        };
    case NO_REPOS:
        return {
          ...state,
          repos: []
        };
    case RESET_LOADING:
      return {
        ...state,
        loading:true
      }
    default:
      return state;
  }
}

export default profileReducer;