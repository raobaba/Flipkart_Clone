import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE} from "./actionTypes.js";

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