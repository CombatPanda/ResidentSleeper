import React, { Component } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import './FlowerComponents/FlowerDetails.css';
import { Table, TableBody, TableHead } from '@mui/material';
import { TableCell, TableRow } from '@material-ui/core';

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
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {order.details.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell><img src={row.pictureUrl} width="100%" height="100px" style={{ objectFit: 'cover' }} /></TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.cost}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.quantity * row.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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