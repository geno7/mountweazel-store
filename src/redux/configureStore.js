import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { Cart } from './cart'
import { Products } from './products'
import { InitApparel } from './forms'
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            cart: Cart,
            products: Products,
            ...createForms({
                apparelForm: InitApparel
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};