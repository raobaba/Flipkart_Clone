import axios from "axios";
import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from "./actionTypes.js";
const URL = "http://localhost:8000";
export const getProducts = () => async (dispatch) => {
    try {
        let { data } = await axios.get(`${URL}/products`);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
    }
}