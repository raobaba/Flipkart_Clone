import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_DETAILS_REQUEST,
    GET_PRODUCTS_DETAILS_SUCCESS,
    GET_PRODUCTS_DETAILS_FAILURE,
    GET_PRODUCT_DETAILS_RESET
} from "./actionTypes.js";

export const getProductReducer = (state = {products: []},action)=>{
      switch(action.type){
        case GET_PRODUCTS_SUCCESS:
            return {products:action.payload};
        case GET_PRODUCTS_FAILURE:
            return {error:action.payload};
        default:
            return state;
      }
}
export const getProductDetailsReducer = (state={product:{}},action)=>{
     switch(action.type){
        case GET_PRODUCTS_DETAILS_REQUEST:
            return {loading:true};
        case GET_PRODUCTS_DETAILS_SUCCESS:
            return {loading:false,product:action.payload};
        case GET_PRODUCTS_DETAILS_FAILURE:
            return {loading:false,error:action.payload};
        case GET_PRODUCT_DETAILS_RESET:
            return {product:{}}
        default:
            return state;
     }
}