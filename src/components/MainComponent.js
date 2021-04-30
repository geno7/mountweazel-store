import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import ProductCards from "./ProductCardsComponent";
import DisplayProduct from "./DisplayProductComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { fetchProducts } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  fetchProducts: () => fetchProducts(),
  resetApparelForm: () => actions.reset("apparelForm"),
};

// class component extending from parent "Component" class
class Main extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const ProductWithId = ({ match }) => {
      return (
        <DisplayProduct
          product={
            this.props.products.products.filter(
              (product) => product.id === +match.params.productId
            )[0]
          }
          resetApparelForm={this.props.resetApparelForm}
          // server stuff
          isLoading={this.props.products.isLoading}
          errMess={this.props.products.errMess}
        />
      );
    };

    return (
      <>
        <Header />
        <Switch>
          {/* route nav paths */}
          <Route path="/home" component={Home} />
          <Route
            exact
            path="/category/:category"
            render={(props) => (
              <ProductCards
                products={this.props.products.products.filter(
                  (product) => product.category === props.match.params.category
                )}
                {...props}
                isLoading={this.props.products.isLoading}
                errMess={this.props.products.errMess}
              />
            )}
          />
          {/* route path for individual product pages */}
          <Route path="/products/:productId" component={ProductWithId} />

          {/* else redirect to home page */}
          <Redirect to="/home"></Redirect>
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
