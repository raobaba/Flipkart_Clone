import axios from "axios";
import Cookies from "js-cookie";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CLEAR_ERRORS,
} from "../actionTypes/user.actionTypes";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/register",
      userData,
      config
    );
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/login",
      { email, password },
      config
    );
    Cookies.set("userId", data.user._id);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`http://localhost:8000/api/v1/${userId}`);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
    Cookies.remove("userData");
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
