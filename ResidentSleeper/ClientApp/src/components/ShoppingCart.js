import React, { Component } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import './FlowerComponents/FlowerDetails.css';

export class ShoppingCart extends Component {

    static displayName = ShoppingCart.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true, userOrderId: 0};
    }

    componentDidMount() {
        this.populateOrderData();
    }

    static renderOrders(order) {
        return (
            <div>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>FlowerID</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {order.details.map(o =>
                        <tr key={o.id}>
                            <td>{o.flowerID}</td>
                            <td>{o.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
                <span>Status: {order.order.status}</span>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ShoppingCart.renderOrders(this.state.orders);

        return (
            <div>
                <h1 id="tabelLabel" >Order #{this.state.userOrderId}</h1>
                {contents}
            </div>
        );
    }
    async populateOrderData() {

        const data = await fetch(`api/User/1`);
        const response = await data.json();
        this.setState({userOrderId: response.data.currentOrderId});

        const response1 = await fetch('api/order/id/' + this.state.userOrderId);
        const data1 = await response1.json();
        this.setState({ orders: data1, loading: false });
        console.log(data1)
    }

}