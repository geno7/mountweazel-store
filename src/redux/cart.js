import * as ActionTypes from "./ActionTypes";

export const Cart = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            if (state.includes(action.payload)) {
                return state;
                //find a way to add to an existing product's quantity here. this bit rn basically checks if theres already a product and if there is it doesnt add it.
            }
            return state.concat(action.payload); //return a new state with the added cart item on the end of it

        case ActionTypes.REMOVE_FROM_CART:
            //add a check here to see if the state includes action.payload, and if it does, subtract from that payload's quantity
            return state.filter((cart) => cart !== action.payload); //filter out the removed item

        default:
            return state;
    }
};
//current questions - should i make quantity part of the array of products? or should array be strictly a cart thing? what would be easier?
