import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
  } from "../actionTypes/user.actionTypes";
  import axios from "axios";
  
  // Login User
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
  
  // Register User
  export const registerUser = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("userData", userData);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/register",
        userData,
        config
      );
      console.log("data", data);
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
  
  // Load User
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get("http://localhost:8000/api/v1/me");
      console.log("user data", data); // Log the data received from the API
  
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Logout User
export const logoutUser = () => async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/api/v1/logout");
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

  