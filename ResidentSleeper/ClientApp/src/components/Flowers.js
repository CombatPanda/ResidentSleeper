import React, { Component } from 'react';
import FlowerCard from './FlowerCard';
import { Grid } from '@mui/material';

export class Flowers extends Component {
    static displayName = Flowers.name;

    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            loading: true
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:5001/api/Orders/' + id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            window.location.reload();
        }
    }

    componentDidMount() {
        this.populateFlower();
    }

    static renderFlowersTable(flowers) {
        return (
            <Grid container spacing={2}>
                {flowers.map(flower => (
                    <Grid item xs={4}>
                        <FlowerCard imUrl={flower.pictureURL} title={flower.name} description={flower.description} id={flower.id} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Flowers.renderFlowersTable(this.state.flowers);

        return (
            <div>
                <h1 id="tabelLabel" >Flower list</h1>
                {contents}
            </div>
        );
    }

    async populateFlower() {
        const response = await fetch('api/Flower');
        const data = await response.json();
        console.log(data);
        this.setState({ flowers: data, loading: false });
    }
}
