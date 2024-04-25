import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const isExist = state.cartItems.find((x) => x.id === item.id);
      return isExist
        ? {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.id === isExist.id ? item : x
            ),
          }
        : { ...state, cartItems: [...state.cartItems, item] };
    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
