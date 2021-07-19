import React, { Component, useState } from "react";
import { Table, Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { removeFromCart, postToCart } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        products: state.products,
        cart: state.cart,
    };
};

const mapDispatchToProps = {
    removeFromCart: (productId) => removeFromCart(productId),
    postToCart: (productId, quantitySelect, sizeSelect) => postToCart(productId, quantitySelect, sizeSelect),
};

//render individual cart items
function RenderCartItem({ product, cart, removeFromCart, postToCart }) {
    const cartProduct = cart.find(({ id }) => id === product.id); //get id of object in cart array that represents current object
    return (
        <tr>
            <th>
                <img src={product.image} alt={product.name} height="100" />
            </th>
            <th>
                {product.name} ({cartProduct.size})
            </th>
            <th>x{cartProduct.quantity.toString()}</th>
            <th>
                <Button onClick={() => removeFromCart(product.id)}>-</Button>
            </th>
            <th>
                <Button onClick={() => postToCart(product.id, 1, cartProduct.size)}>+</Button>
            </th>
            <th>{(product.price * cartProduct.quantity).toFixed(2)}</th>
        </tr>
    );
}

//render cart items as list
class Cart extends Component {

    constructor(props) {
        super(props);
    }

    handleAddItem() {
        
    }

    render() {
        //take products array and make a new array from it with only the products that match the cart array 
        const cartData = this.props.products.products.filter((product) => this.props.cart.find( ({id}) => id === product.id))

        //display the cartData as individual items
        const directory = cartData.map((product) => {
            return (
                <div key={product.id} className="col-md-5 m-1">
                    <RenderCartItem product={product} removeFromCart={this.props.removeFromCart} postToCart={this.props.postToCart} cart={this.props.cart} />
                </div>
            );
        });
        console.log(this.props.isLoading);
        if (this.props.isLoading) {
            return <Loading />;
        }
        if (this.props.errMess) {
            return <h4>{this.props.errMess}</h4>;
        }
        return (
            <div className="container">
                <div className="row">
                    <Table>
                        <tbody>{directory}</tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
