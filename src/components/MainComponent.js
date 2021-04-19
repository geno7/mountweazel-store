import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import ProductCards from './ProductCardsComponent';
import DisplayProduct from './DisplayProductComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

// class component extending from parent "Component" class
class Main extends Component {

    render() {

        const ProductWithId = ({match}) => {
            return (
                <DisplayProduct
                    product={this.props.products.filter(product => product.id === +match.params.productId)[0]}
                />
            );
        }; 

        return(
            <>
            <Header />
            <Switch>
                {/* route nav paths */}
                <Route path='/home' component={Home} />
                <Route exact path='/apparel' render={() => <ProductCards products={this.props.products.filter(product => product.category === "apparel")} />} />
                <Route exact path='/posters' render={() => <ProductCards products={this.props.products.filter(product => product.category === "posters")} /> } />
                <Route exact path='/music' render={() => <ProductCards products={this.props.products.filter(product => product.category === "music")} /> } />

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

export default connect(mapStateToProps)(Main);
