import * as ActionTypes from "./ActionTypes";

//cart reducer

export const Cart = (state = [], action) => {

    let sameSize, found, newQuantity, objIndex

    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            //var for a product thats already in the cart that matches the one you want to add
            found = state.filter(({ itemData }) => itemData === action.payload.itemData);

            if (found) { //if the product already exists in the cart
                console.log("found ", found) //debug

                //list product as a separate item if it's a different size
                sameSize = found.find(({size}) => size === action.payload.size)

                console.log("sameSize ", sameSize)

                if (sameSize) {
                //add the existing quantity to the quantity you want to add
                newQuantity = (+sameSize.quantity + +action.payload.quantity);
                console.log("newQuantity ", newQuantity)

                //set existing object to new quantity value
                objIndex = state.findIndex((obj) => obj == sameSize);
                console.log("objIndex ",objIndex)
                state[objIndex].quantity = +newQuantity

                console.log("state[objIndex] ", state[objIndex])

                return [...state]; //stick product back into cart with new quantity
                }
            }
            return state.concat(action.payload); //if the object isnt already in the cart, return a new state with the added cart item on the end of it

        case ActionTypes.REMOVE_FROM_CART:
            //check if object is in cart
            found = state.filter(({ itemData }) => itemData === action.payload.itemData);

            if (found) {
                
                console.log("found ", found) //debug

                sameSize = found.find(({ size }) => size === action.payload.size);

                newQuantity = (+sameSize.quantity - +action.payload.quantity); //subtract 1 from quantity of found obj
                console.log("newQuantity ", newQuantity)

                //change quantity of found obj
                objIndex = state.findIndex((obj) => obj == sameSize);
                state[objIndex].quantity = +newQuantity

                if (state[objIndex].quantity === 0) { //if there isnt any more of an object, filter it out of the cart
                    return state.filter((cart) => cart.itemData !== action.payload);;
                }
                
                return [...state];
            }

        default:
            return state;
    }
};
//current questions - should i make quantity part of the array of products? or should array be strictly a cart thing? what would be easier?
