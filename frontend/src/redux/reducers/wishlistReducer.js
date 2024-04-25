import {
  WISHLIST_ADD_ITEM,
  WISHLIST_DELETE_ITEM,
  WISHLIST_CLEAR_ITEMS,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const item = action.payload;
      const isExist = state.wishlistItems.find((x) => x.id === item.id);
      return isExist
        ? {
            ...state,
            wishlistItems: state.wishlistItems.map((x) =>
              x.id === isExist.id ? item : x
            ),
          }
        : { ...state, wishlistItems: [...state.wishlistItems, item] };
    case WISHLIST_DELETE_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    case WISHLIST_CLEAR_ITEMS:
      return {
        ...state,
        wishlistItems: [],
      };
    default:
      return state;
  }
};
