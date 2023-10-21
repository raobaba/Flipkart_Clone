import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_DETAILS_REQUEST,
  GET_PRODUCTS_DETAILS_SUCCESS,
  GET_PRODUCTS_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_RESET,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./actionTypes.js";

export const getProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return { products: action.payload };
    case GET_PRODUCTS_FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
};
export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_DETAILS_REQUEST:
      return { loading: true };
    case GET_PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case GET_PRODUCTS_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_DETAILS_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const exist = state.cartItems.find((product) => product.id === item.id);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((data) =>
            data.product === exist.product ? item : data
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== action.payload
        ),
      };
      case INCREASE_QUANTITY:
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      case DECREASE_QUANTITY:
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.id === action.payload && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
        };
    default:
      return state;
  }
};
