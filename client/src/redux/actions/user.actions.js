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
    console.log("Registering user...");
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
    console.log("Registration successful:", data);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    console.log("Logging in user...");
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
    console.log("Login successful. Token:", token);
    Cookies.set("token", token, { expires: 60 });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.error("Login failed:", error);
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    console.log("Fetching user details...");
    dispatch({ type: USER_DETAILS_REQUEST });
    const token = Cookies.get("token");
    console.log("Token:", token);
    const { data } = await axios.get("http://localhost:8000/api/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    console.log("User Details:", data);
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
    console.log("Logging out user...");
    const response = await axios.get("http://localhost:8000/api/v1/logout");
    console.log("Logout successful.");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    console.error("Logout failed:", error);
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  console.log("Clearing errors...");
  dispatch({ type: CLEAR_ERRORS });
};
