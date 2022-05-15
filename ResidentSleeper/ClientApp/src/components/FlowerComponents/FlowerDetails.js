import React, { Component } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import './FlowerDetails.css';

class FlowerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            cost: '',
            pictureURL: ''
        }
    }
    addToCart(newItem) {
        fetch('https://localhost:44326/api/OrderDetails', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Category: newItem.flowerId,
                Spent: newItem.quantity,
                OrderID: 1,
            })
        }).then(response => {
            this.props.history.push('/OrderDetails')
        })
    }

    async getFlower() {
        let flowerId = this.props.match.params.id;
        const data = await fetch(`https://localhost:44326/api/Flower/id/${flowerId}`);
        const response = await data.json();
        this.setState({
            id: response.id,
            name: response.name,
            description: response.description,
            cost: response.cost,
            pictureURL: response.pictureURL,
            count: response.count
        }, () => {
        });
    }

    componentWillMount() {
        this.getFlower();
    }

    render() {
        return (
            <body>
                <h1>{this.state.name}</h1>

                <div className="content">
                    <div className="content-info">
                        <img className="image" src={this.state.pictureURL} />
                    </div>
                    <div className="content-info">
                        <p><b>Description:</b> {this.state.description}</p>
                        <p><b>Cost:</b> {this.state.cost}€</p>
                        <p className="content">
                            <span>
                                <TextField
                                    type="number"
                                    style={{ width: 50 }}
                                    InputProps={{ inputProps: { min: 1, max: this.state.count } }}
                                    defaultValue={1}
                                />
                            </span>
                            <span>
                                <Button variant="contained" endIcon={<AddShoppingCartIcon />} margin="normal">
                                    Add to cart
                            </Button>
                            </span>
                        </p>
                    </div>
                </div>
            </body>
        )
    }
}
export default FlowerDetails;