import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import ProductCards from './ProductCardsComponent';
import DisplayProduct from './DisplayProductComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

// import products data
import { PRODUCTS } from '../shared/products'

// class component extending from parent "Component" class
class Main extends Component {
        constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS
        };
    }

    render() {

        const ProductWithId = ({match}) => {
            return (
                <DisplayProduct
                    // problem - its filtering the state of the current component, when it should filter state from whatever ProductCards product is currently onscreen
                    product={this.state.products.filter(product => product.id === +match.params.productId)[0]}
                />
            );
        }; 

        return(
            <>
            <Header />
            <Switch>
                {/* route nav paths */}
                <Route path='/home' component={Home} />
                <Route exact path='/apparel' render={() => <ProductCards products={this.state.products.filter(product => product.category === "apparel")} />} />
                <Route exact path='/posters' render={() => <ProductCards products={this.state.products.filter(product => product.category === "posters")} /> } />
                <Route exact path='/music' render={() => <ProductCards products={this.state.products.filter(product => product.category === "music")} /> } />

                {/* route path for individual product pages */}
                <Route path='/products/:productId' component={ProductWithId} />

                {/* else redirect to home page */}
                <Redirect to='/home'></Redirect>
            </Switch>
            <Footer />
            </>
        );
    }
}

export default Main;
