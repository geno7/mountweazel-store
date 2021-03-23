import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { APPAREL } from '../shared/data_apparel';
import ProductCards from './ProductCardsComponent';
import Media from './MediaComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { POSTERS } from '../shared/data_posters';


class Main extends Component {
        constructor(props) {
        super(props);
        this.state = {
            products: APPAREL,
            products2: POSTERS
        };
    }

    render() {

        return(
            <>
            <Header />
            <ProductCards products={this.state.products} />
            <ProductCards products={this.state.products2} />
            {/* <Switch>
                <Route path='/home' component={Home} />
                <Route exact path='/apparel' component={Apparel} />
                <Route exact path='/media' component={Media} />
                <Redirect to='/home'></Redirect>
            </Switch> */}
            <Footer />
            </>
        );
    }
}

export default Main;
