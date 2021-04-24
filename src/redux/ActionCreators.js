import * as ActionTypes from './ActionTypes';
import { PRODUCTS } from '../shared/products'

export const fetchProducts = () => dispatch => {

    dispatch(productsLoading());

    setTimeout(() => {
        dispatch(addProducts(PRODUCTS));
    }, 2000);
};

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = errMess => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMess
});

export const addProducts = products => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});