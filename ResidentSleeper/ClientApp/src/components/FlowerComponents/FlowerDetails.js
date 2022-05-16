﻿import React, { Component } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import './FlowerDetails.css';
import FlowerRecommendations from './FlowerDetailsRecommendations.js';
import { Grid } from '@mui/material';
import { useEffect } from 'react';

class FlowerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            cost: '',
            pictureURL: '',
        }
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
            count: response.count,
            type: parseInt(response.flowerType),
            flowerId: parseInt(this.props.match.params.id),
        }, () => {
        });
    }
    componentDidMount() {
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
                            {this.state.count != 0 &&
                                <span >
                                    <TextField disabled={this.state.count == 0}
                                        type="number"
                                        style={{ width: 50 }}
                                        InputProps={{ inputProps: { min: this.state.count == 0 ? 0 : 1, max: this.state.count } }}
                                        value={this.state.count == 0 ? 0 : 1}
                                    />
                                </span>
                            }
                            <span>
                                <Button variant="contained" endIcon={<AddShoppingCartIcon />} margin="normal" disabled={this.state.count == 0}>
                                    Add to cart
                                </Button>
                            </span>
                            
                        </p>
                        {this.state.count == 0 && <p>Out of stock</p>}
                    </div>
                    
                </div>
                <div className="content-recommendations">{this.state.type !== undefined && this.state.flowerId !== undefined &&
                    <FlowerRecommendations flowerType={this.state.type} flowerId={this.state.flowerId} />}
                </div>
            </body>
        )
    }
}
export default FlowerDetails;