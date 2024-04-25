import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const addToCart = (product, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: product.id,
      name: product.name,
      image_url: product.image_url,
      new_price: product.new_price,
      qty: qty,
    },
  });
  //save items in local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const deleteItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_DELETE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
  });
  localStorage.removeItem("cartItems");
};
