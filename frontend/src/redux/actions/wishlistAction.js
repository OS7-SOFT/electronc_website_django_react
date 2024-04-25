import {
  WISHLIST_ADD_ITEM,
  WISHLIST_DELETE_ITEM,
  WISHLIST_CLEAR_ITEMS,
} from "../constants/wishlistConstants";

export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      id: product.id,
      name: product.name,
      image_url: product.image_url,
      new_price: product.new_price,
    },
  });
  //save items in local storage
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

export const deleteItemFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_DELETE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

export const clearWishlist = () => (dispatch) => {
  dispatch({
    type: WISHLIST_CLEAR_ITEMS,
  });
};
