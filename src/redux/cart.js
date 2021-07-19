import * as ActionTypes from "./ActionTypes";

//cart reducer

export const Cart = (state = [], action) => {

    let found, newQuantity, objIndex

    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            //var for a product thats already in the cart that matches the one you want to add
            found = state.find(({ id }) => id === action.payload.id);

            if (found) {
                //if the product already exists in the cart
                //console.log(found) //debug

                //add the existing quantity to the quantity you want to add
                newQuantity = (+found.quantity + +action.payload.quantity);
                console.log(newQuantity)

                //set existing object to new quantity value
                objIndex = state.findIndex((obj) => obj.id == found.id);
                state[objIndex].quantity = newQuantity

                return [...state]; //stick product back into cart with new quantity
            }
            return state.concat(action.payload); //if the object isnt already in the cart, return a new state with the added cart item on the end of it

        case ActionTypes.REMOVE_FROM_CART:
            //check if object is in cart
            found = state.find(({ id }) => id === action.payload);

            if (found) {

                newQuantity = (+found.quantity - 1); //subtract 1 from quantity of found obj
                console.log(newQuantity)

                //change quantity of found obj
                objIndex = state.findIndex((obj) => obj.id == found.id);
                state[objIndex].quantity = newQuantity

                if (state[objIndex].quantity === 0) { //if there isnt any more of an object, filter it out of the cart
                    return state.filter((cart) => cart.id !== action.payload);;
                }
                
                return [...state];
            }

        default:
            return state;
    }
};
//current questions - should i make quantity part of the array of products? or should array be strictly a cart thing? what would be easier?
