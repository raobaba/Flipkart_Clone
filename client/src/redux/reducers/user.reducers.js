import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CLEAR_ERRORS,
} from "../actionTypes/user.actionTypes";

const initialState = {
  user: {},
  isAuthenticated: JSON.parse(localStorage.getItem("isAuth")) || false,
  loading: false,
  isRegistered: false,
  error: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case USER_DETAILS_REQUEST:
      // console.log("Requesting...");
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      // console.log("Success:", payload);
      return {
        ...state,
        loading: false,
        isRegistered: true,
        user: payload,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      // console.log("Success:", payload);
      localStorage.setItem("isAuth", true);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
        error: null,
      };
    case LOGOUT_USER_SUCCESS:
      // console.log("Logout Success");
      localStorage.setItem("isAuth", false);
      return {
        ...state,
        loading: false,
        user: {},
        isAuthenticated: false,
        isRegistered: false,
        error: null,
      };
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
    case USER_DETAILS_FAIL:
    case LOGOUT_USER_FAIL:
      // console.error("Error:", payload);
      localStorage.setItem("isAuth", false);
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        error: payload,
      };
    case USER_DETAILS_SUCCESS:
      // console.log("User Details:", payload);
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case CLEAR_ERRORS:
      // console.log("Clearing Errors");
      return {
        ...state,
        isRegistered: false,
        error: null,
      };
    default:
      return state;
  }
};
