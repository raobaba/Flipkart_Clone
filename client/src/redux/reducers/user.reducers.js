import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  SET_AUTHENTICATED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CLEAR_ERRORS,
} from "../actionTypes/user.actionTypes";
import Cookies from "js-cookie";

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      Cookies.set("userData", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
        error: null,
      };
      case LOGOUT_USER_SUCCESS:
        console.log("State before logout:", state);
        Cookies.remove("userData");
        console.log("Logout Data:", payload);
        const newState = {
          ...state,
          loading: false,
          user: {},
          isAuthenticated: false,
          error: null,
        };
        console.log("State after logout:", newState);
        return newState;
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_AUTHENTICATED:
      Cookies.set("userData", JSON.stringify(payload));
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        error: null,
      };
    default:
      return state;
  }
};
