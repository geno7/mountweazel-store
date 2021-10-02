import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { postRemoveFromCart, postToCart } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        products: state.products,
        cart: state.cart,
    };
};

const mapDispatchToProps = {
    postRemoveFromCart: (itemData, quantitySelect, sizeSelect) => postRemoveFromCart(itemData, quantitySelect, sizeSelect),
    postToCart: (itemData, quantitySelect, sizeSelect) => postToCart(itemData, quantitySelect, sizeSelect),
};

//render individual cart items
function RenderCartItem({ product, cart, postRemoveFromCart, postToCart }) {
    //const cartProduct = cart.find(({ id }) => id === product.id); //get id of object in cart array that represents current object
    return (
        <tr>
            <th>
                <img src={product.itemData.image} alt={product.itemData.name} height="100" />
            </th>
            <th>
                {product.itemData.name} ({product.size})
            </th>
            <th>x{product.quantity.toString()}</th>
            <th>
                <Button onClick={() => postRemoveFromCart(product.itemData, 1, product.size)}>-</Button>
            </th>
            <th>
                <Button onClick={() => postToCart(product.itemData, 1, product.size)}>+</Button>
            </th>
            <th>{(product.itemData.price * product.quantity).toFixed(2)}</th>
        </tr>
    );
}

//render cart items as list
class Cart extends Component {

    render() {
        //take products array and make a new array from it with only the products that match the cart array 
        //const cartData = this.props.products.products.filter((product) => this.props.cart.find( ({id}) => id === product.id))
        const cartData = this.props.cart.map((item) => {
            item.product = this.props.products.products.find(({id}) => id === item.id)
            console.log("current item ", item)
            return item
        })

        //display the cartData as individual items
        const directory = this.props.cart.map((item) => {
            return (
                <div key={item.itemData.id} className="col-md-5 m-1">
                    <RenderCartItem product={item} postRemoveFromCart={this.props.postRemoveFromCart} postToCart={this.props.postToCart} cart={this.props.cart} />
                </div>
            );
        });
        
        let totalPrice = this.props.cart.reduce(function (a, i) {
            let current = a + (i.itemData.price*i.quantity);
            console.log("current ", current, a, cartData, i.itemData.price);
            return a + (i.itemData.price * i.quantity);
        }, 0);

        let totalItems = this.props.cart.reduce(function (a, i) {
            let current = a + i.quantity;
            console.log("current ", current, a, cartData, i.itemData.price);
            return a + i.quantity;
        }, 0);

        console.log("total ", totalPrice)

        console.log("total ", totalItems);

        console.log("cartData ", cartData)
        console.log("cart ", this.props.cart);

        //console.log(this.props.isLoading);
        if (this.props.isLoading) {
            return <Loading />;
        }
        if (this.props.errMess) {
            return <h4>{this.props.errMess}</h4>;
        }
        if (!this.props.cart.length) {
            return (
                <div>
                    <h1>Cart</h1>
                    <h3>Your cart is currently empty.</h3>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div class="col-md-6 col-sm-12">
                        <h1>Cart</h1>
                        <Table>
                            <tbody>{directory}</tbody>
                        </Table>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <h2>
                            Subtotal: {totalPrice.toFixed(2)} ({totalItems} items)
                        </h2>
                        <div class="row">
                            <Button>Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);