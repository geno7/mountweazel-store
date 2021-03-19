import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,
 Button, Modal, ModalHeader, ModalBody,
 Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <NavLink className="nav-link" to="/home">
                                <h1>Teena</h1>
                                <h3>by Hilda Terry</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                <Navbar dark sticky="top" expand="md">
                    <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/characters">
                                    <i className="fa fa-list fa-lg" /> Characters
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/archive">
                                    <i className="fa fa-info fa-lg" /> Archive
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

export default Header;