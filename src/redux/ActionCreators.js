import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading());

    return fetch(baseUrl + "products")
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then((response) => response.json())
        .then((products) => dispatch(addProducts(products)))
        .catch((error) => dispatch(productsFailed(error.message)));
};

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING,
});

export const productsFailed = (errMess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMess,
});

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products,
});

export const addToCart = product => ({
    type: ActionTypes.ADD_TO_CART,
    payload: product,
});

export const postToCart = (id,quantity,size) => (dispatch) => {

    const newItem = {
        id,
        quantity,
        size
    };
    
    setTimeout(() => {
        dispatch(addToCart(newItem));
    }, 2000);
};

export const removeFromCart = (productId) => ({
    type: ActionTypes.REMOVE_FROM_CART,
    payload: productId,
});
