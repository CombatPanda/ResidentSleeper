import React, { Component } from 'react';
import './FlowerDetails.css';
import FlowerCard from '../FlowerCard';
import { Grid } from '@mui/material';


class FlowerDetailsRecommendations extends Component {

    constructor(props) {
        super(props);
        this.props = props
        console.log(this.props)
        this.state = {
            flowers: [],
            laoding: true,
        }
    }

    async getFlowerRecommendations(flowerType, flowerId) {
        //console.log(flowerType)
        const response = await fetch(`api/Flower/type/${flowerType}`);
        const data = await response.json();

        //if (data == null) return

        var index = data.map(x => {
            return x.id;
        }).indexOf(flowerId);

        data.splice(index, 1);
        this.setState({ flowers: data, loading: false });
    }

    componentWillMount() {
        this.getFlowerRecommendations(this.props.flowerType, this.props.flowerId);
    }

    static renderFlowersTable(flowers) {
        return (
            <Grid container spacing={2}>

                {flowers !== undefined && flowers.map((flower, key) => (
                    <Grid item xs={3}>
                        <FlowerCard imUrl={flower.pictureURL} title={flower.name} description={flower.description} id={flower.id} cost={flower.cost} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FlowerDetailsRecommendations.renderFlowersTable(this.state.flowers);
        console.log(contents)
        return (
            
            <div>
                <br/>
                {contents.props.children.length == 0 && <p><b>No recommendations</b></p>}

                {contents.props.children.length != 0 && <div> <p><b>Similar flowers</b></p> {contents} </div>}
            </div>
        );
    }
}
export default FlowerDetailsRecommendations;