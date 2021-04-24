import * as ActionTypes from './ActionTypes';

export const Cart = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        case ActionTypes.REMOVE_FROM_CART:
            return state.filter(cart => cart !== action.payload)

        default:
            return state;
        }
    }