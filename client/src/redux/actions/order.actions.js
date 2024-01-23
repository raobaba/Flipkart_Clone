import axios from "axios";
import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  PAYMENT_STATUS_FAIL,
  PAYMENT_STATUS_REQUEST,
  PAYMENT_STATUS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../actionTypes/order.actionTypes";
import Cookies from "js-cookie";

// New Order
export const newOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ORDER_REQUEST });

    const token = Cookies.get("token");

    const response = await axios.post(
      "http://localhost:8000/api/v1/order/new",
      order,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({
      type: NEW_ORDER_SUCCESS,
      payload: response.data,
    });

    console.log("newOrder API response:", response);
  } catch (error) {
    console.error("Error in newOrder API request:", error);

    dispatch({
      type: NEW_ORDER_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Internal Server Error",
    });
  }
};

// Get User Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const token = Cookies.get("token");
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/orders/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = Cookies.get("token");
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/order/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Payment Status
export const getPaymentStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_STATUS_REQUEST });
    const token = Cookies.get("token");
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/payment/status/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    dispatch({
      type: PAYMENT_STATUS_SUCCESS,
      payload: data.txn,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders ---ADMIN
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const token = Cookies.get("token");
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/admin/orders",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order ---ADMIN
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const token = Cookies.get("token");
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/admin/order/${id}`,
      order,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order ---ADMIN
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const token = Cookies.get("token");
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/admin/order/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear All Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
