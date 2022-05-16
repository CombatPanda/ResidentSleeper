import React, { Component } from 'react';
import FlowerCard from './FlowerCard';
import { Grid, IconButton, Button } from '@mui/material';
import FlowerCardSkeleton from './FlowerCardSkeleton';
import { Route } from 'react-router-dom';
export class Flowers extends Component {
    static displayName = Flowers.name;

    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            id: '',
            isAdmin:'',
            loading: true
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
        this.getUser();
    }

    static renderFlowersTable(flowers) {
        return (
            <Grid container spacing={2}>
                {flowers.map(flower => (
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
                <Route render={({ history }) => (
                    <IconButton aria-label="Add" hidden={this.state.isAdmin === false} onClick={() => { history.push(`/flower-add`) }} >
                        Add flower
                    </IconButton>
                )}/>
             
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

    async getUser() {
        const data = await fetch(`api/User/1`);
        const response = await data.json();
        console.log(response.data.id);
        this.setState({
            id: response.data.id,
            isAdmin: response.data.isAdmin,
           
        }, () => {
        });
        
    }
}
