import React, { Component, useState } from 'react';
import FlowerCard from './FlowerCard';
import { Grid, Pagination, Box} from '@mui/material';
import FlowerCardSkeleton from './FlowerCardSkeleton';

export class Flowers extends Component {
    static displayName = Flowers.name;

    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            loading: true,
            page: 1
        };
        this.addToCart = this.addToCart.bind(this);
        
    }

    addToCart(id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44326/api/Orders/' + id, {
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
                {/*{flowers.slice((this.state.page - 1) * 9, this.state.page * 9).map(flower => (*/}
                {flowers.slice(0, 9).map(flower => (
                    <Grid item xs={4}>
                        <FlowerCard imUrl={flower.pictureURL} title={flower.name} description={flower.description} id={flower.id} cost={flower.cost} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    static renderSkeletonFlowersTable() {
        return (
            <Grid container spacing={2}>
                {[...Array(9)].map((e, i) => <Grid item xs={4}><FlowerCardSkeleton/></Grid>)}
            </Grid>
        );
    }

    render() {
        let contents = this.state.loading
            ? Flowers.renderSkeletonFlowersTable()
            : Flowers.renderFlowersTable(this.state.flowers);

        return (
            <div>
                <h1 id="tabelLabel" >Flower list</h1>
                {contents}
                <Box alignItems="center" justifyContent="center" display="flex" mt={2} mb={2}>
                    <Pagination count={Math.ceil(this.state.flowers.length / 9)} page={this.state.page} defaultPage={1} onChange={(event, value) => this.setState({ page: value })} />
                </Box>
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
