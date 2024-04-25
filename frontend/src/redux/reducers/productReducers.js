import axios from "axios";

import {
  RELATED_PRODUCTS_SUCCESS,
  RELATED_PRODUCTS_FAIL,
  RELATED_PRODUCTS_REQUEST,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_BAD_REQUEST,
  PRODUCT_BAD_SUCCESS,
  PRODUCT_BAD_FAIL,
  PRODUCT_NEW_REQUEST,
  PRODUCT_NEW_SUCCESS,
  PRODUCT_NEW_FAIL,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pageNumber: action.payload.page_number,
        nextPage: action.payload.next,
        pageCount: action.payload.count,
        previousPage: action.payload.previous,
        productsCount: action.payload.products_count,
      };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productNewReducer = (state = { newProducts: [] }, action) => {
  switch (action.type) {
    case PRODUCT_NEW_REQUEST:
      return { newLoading: true, newProducts: [] };

    case PRODUCT_NEW_SUCCESS:
      return { newLoading: false, newProducts: action.payload };

    case PRODUCT_NEW_FAIL:
      return { newLoading: false, newError: action.payload };

    default:
      return state;
  }
};

export const productBadReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_BAD_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_BAD_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_BAD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const notifyListReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case NOTIFICATION_LIST_REQUEST:
      return { loading: true, notifications: [] };

    case NOTIFICATION_LIST_SUCCESS:
      return {
        loading: false,
        notifications: action.payload,
      };

    case NOTIFICATION_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const relatedProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case RELATED_PRODUCTS_REQUEST:
      return { loading: true, products: [] };

    case RELATED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case RELATED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
