import React, { Component, useState } from 'react';
import FlowerCard from './FlowerCard';
import { Grid, Pagination, Box, IconButton, Button } from '@mui/material';
import FlowerCardSkeleton from './FlowerCardSkeleton';
import { Route } from 'react-router-dom';
export class Flowers extends Component {
    static displayName = Flowers.name;

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            flowers: [],
            loading: true,
            page: 1,
            id: '',
            deleteId: '',
            isAdmin:''
        };
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitDeleteForm = this.submitDeleteForm.bind(this);
        
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submitDeleteForm(e) {
        e.preventDefault();
        this.state.deleteId = this.refs.id.value;
        this.deleteFlower(this.state.deleteId);
            let fields = {};
            fields["id"] = "";
            this.setState({ fields: fields });
        

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

    deleteFlower (id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44326/api/Flower/' + id, {
                method: 'DELETE',
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

    static renderFlowersTable(flowers, page) {
        return (
            <Grid container spacing={2}>
                {flowers.slice((page - 1) * 9, page * 9).map(flower => (
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
            : Flowers.renderFlowersTable(this.state.flowers, this.state.page);

        return (
            <div>

                <h1 id="tabelLabel" >Flower list</h1>

                <h3>Delete flower</h3>

                <form onSubmit={this.submitDeleteForm} hidden={this.state.isAdmin === false}>
                    <div className="imput-field">
                        <label htmlFor="id">ID</label>
                        <input type="text" name="id" ref="id" value={this.state.fields.id} onChange={this.handleChange} />
                    </div>
                    <input type="submit" value="Save" className="btn" />
                </form>

                <Route render={({ history }) => (
                    <IconButton aria-label="Add" hidden={this.state.isAdmin === false} onClick={() => { history.push(`/flower-add`) }} >
                        Add flower
                    </IconButton>
                )}/>
             
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
        console.log(this.state.page);
        this.setState({ flowers: data, loading: false, page: 1});
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
