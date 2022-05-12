import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ShoppingCart } from './components/ShoppingCart';
import { Flowers } from './components/Flowers';
import { Flowers2 } from './components/Flowers2';
import  Login  from './components/LoginSignupComponents/Login';
import  SignUp from './components/LoginSignupComponents/Signup';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/shopping-cart' component={ShoppingCart} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/flower-list' component={Flowers} />
        <Route path='/log-in' component={Login} />
        <Route path='/sign-up' component={SignUp} />
      </Layout>
    );
  }
}
