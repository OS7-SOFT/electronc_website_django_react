import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { brandListReducer } from "./reducers/brandReducer";
import { cartReducer } from "./reducers/cartReducer";
import { categoryListReducer } from "./reducers/categoryReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducers";
import {
  productListReducer,
  productDetailsReducer,
  productNewReducer,
  productTopReducer,
  productBadReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  notifyListReducer,
  relatedProductsReducer,
} from "./reducers/productReducers";
import {
  messageListReducer,
  orderCreatReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./reducers/orderReducers";
const reduceres = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  categoryList: categoryListReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  brandList: brandListReducer,
  orderCreate: orderCreatReducer,
  orderDelete: orderDeleteReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliverReducer,
  messageList: messageListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productTop: productTopReducer,
  productNew: productNewReducer,
  productBad: productBadReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  relatedProducts: relatedProductsReducer,
  notifyList: notifyListReducer,
});

const cartItemsStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const wishlistItemsStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];

const shippingAddressStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsStorage,
    shippingAddress: shippingAddressStorage,
  },
  wishlist: { wishlistItems: wishlistItemsStorage },
  userLogin: { userInfo: userInfoStorage },
};

const middleware = [thunk];

const store = createStore(
  reduceres,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
