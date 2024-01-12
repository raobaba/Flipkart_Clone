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
    const token = data.token;
    console.log("Login Data", data);
    Cookies.set("token", token, { expires: 60 });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const token = Cookies.get("token");
    console.log("token", token);
    const { data } = await axios.get("http://localhost:8000/api/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    console.log("User Details data:", data);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response ? error.response.data.message : "Unknown error",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
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
