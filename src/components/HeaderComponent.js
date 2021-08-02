import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Card, CardImg, CardText, CardTitle, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import { findRenderedComponentWithType } from "react-dom/test-utils";

const mapStateToProps = (state) => {
    return {
        products: state.products,
        cart: state.cart,
    };
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    render() {
        let cartTotal = this.props.cart.length
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-center">
                            <NavLink className="nav-link" to="/home">
                                <h1>Storefront</h1>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavLink className="nav-link" to="/cart">
                            <span class="text-white">
                                <i className="fa fa-shopping-cart fa-lg" /> 
                                ({cartTotal})
                            </span>
                        </NavLink>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="center-navbar">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        Featured
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/category/apparel">
                                        Apparel
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/category/ducks">
                                        Ducks
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/category/music">
                                        Music
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(Header);
