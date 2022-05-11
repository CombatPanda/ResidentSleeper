import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import ShoppingCartIcon from '../icons/shopping-cart.png';
import ShoppingCartIconActive from '../icons/shopping-cart-active.png';
import AccountIcon from '../icons/account.png';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state = {
        collapsed: true,
        cartActive: false
    };
  }

  toggleNavbar () {
    this.setState({
        collapsed: !this.state.collapsed,
        cartActive: false
    });
   }

    getImage = (cartActive) => {
        if (cartActive == false)
            return ShoppingCartIcon;
        if (cartActive == true)
            return ShoppingCartIconActive;
        else return ShoppingCartIcon;
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
                                <NavLink tag={Link} className="text-dark" to="/shopping-cart"><img src={ShoppingCartIconActive} width="40" height="40"></img></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter"><img src={AccountIcon} width="40" height="40"></img></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
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
