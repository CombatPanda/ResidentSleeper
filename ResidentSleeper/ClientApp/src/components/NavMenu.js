import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import ShoppingCartIconas from '../icons/shopping-cart.png';
import ShoppingCartIconActive from '../icons/shopping-cart-active.png';
import AccountIcon from '../icons/account.png';
import { IconButton } from '@mui/material';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state = {
        collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
        collapsed: !this.state.collapsed,
        cartActive: true
    });
   }

    getImage = (cartActive) => {
        if (cartActive == false)
            return ShoppingCartIconas;
        if (cartActive == true)
            return ShoppingCartIconActive;
        else return ShoppingCartIconas;
    }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">ResidentSleeper</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/shopping-cart"><img src={this.getImage(this.state.cartActive)} width="40" height="40"></img></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/sign-up"><img src={AccountIcon} width="40" height="40"></img></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/log-in">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/flower-list">Flowers</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
