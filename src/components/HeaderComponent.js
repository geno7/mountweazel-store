import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";
import { NavLink } from "react-router-dom";

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
                  <NavLink className="nav-link" to="/category/posters">
                    Posters
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

export default Header;
