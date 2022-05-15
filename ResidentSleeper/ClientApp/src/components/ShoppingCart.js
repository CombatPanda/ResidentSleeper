import React, { Component } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import './FlowerComponents/FlowerDetails.css';

export class ShoppingCart extends Component {

    static displayName = ShoppingCart.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true };
    }

    componentDidMount() {
        this.populateOrderData();
    }

    static renderOrders(orders) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Status</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>
                        <tr key={order.id}>
                            <td>{order.userId}</td>
                            <td>{order.status}</td>
                            <td>{order.cost}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ShoppingCart.renderOrders(this.state.orders);

        return (
            <div>
                <h1 id="tabelLabel" >Orders</h1>
                {contents}
            </div>
        );
    }

    async populateOrderData() {
        const response = await fetch('api/order');
        const data = await response.json();
        this.setState({ orders: data, loading: false });
    }
}