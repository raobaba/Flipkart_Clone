import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/user.reducers";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/product.reducers";
import { wishlistReducer } from "./reducers/wishlist.reducers";
import { cartReducer } from "./reducers/cart.reducers";
import { saveForLaterReducer } from "./reducers/saveForLater.reducers";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
  paymentStatusReducer,
} from "./reducers/order.reducers";

const reducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  reviews: productReviewsReducer,
  review: reviewReducer,
  cart: cartReducer,
  saveForLater: saveForLaterReducer,
  wishlist: wishlistReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
