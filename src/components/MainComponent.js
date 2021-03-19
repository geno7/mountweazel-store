import React, { Component } from 'react';
import HelloWorld from './HelloWorld';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Archive from './ArchiveComponent';
import Characters from './CharactersComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class Main extends Component {
    render() {

        return(
            <>
            <Header />
            <Switch>
                <Route path='/home' component={Home} />
                <Route exact path='/archive' component={Archive} />
                <Route exact path='/characters' component={Characters} />
                <Redirect to='/home'></Redirect>
            </Switch>
            <Footer />
            </>
        );
    }
}

export default Main;
