import { Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import FeaturedCard from './Featured/FeaturedCard';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowers: [],
      loading: true,
      index: 0,
      fade: true
    };
  }

  componentDidMount() {
    this.populateFlower();
  }

  static displayName = Home.name;

  static renderCarousel(flowers, index, fade) {
    return (
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pt: 2 }}>
        <Grid item xs={12}><Typography variant="h5">This month's featured items:</Typography></Grid>
        <Grid item xs={4}>
          <FeaturedCard imUrl={flowers[index].pictureURL} title={flowers[index].name} cost={flowers[index].cost} fadeIn={fade} />
        </Grid>
        <Grid item xs={4}>
          <FeaturedCard imUrl={flowers[index + 1].pictureURL} title={flowers[index + 1].name} cost={flowers[index + 1].cost} fadeIn={fade} />
        </Grid>
        <Grid item xs={4}>
          <FeaturedCard imUrl={flowers[index + 2].pictureURL} title={flowers[index + 2].name} cost={flowers[index + 2].cost} fadeIn={fade} />
        </Grid>
      </Grid>
    );
  }

  render() {
    let contents = this.state.loading
      ? ""
      : Home.renderCarousel(this.state.flowers, this.state.index, this.state.fade);
    return (
      <div>
        <Grid container style={{ backgroundImage: `url(${"https://travelbristol.org/wp-content/uploads/2022/02/anthony-fomin-h7_SyoBhHF0-unsplash-scaled.jpg"})`, height: "400px", backgroundSize: "cover" }} direction="row" justifyContent="center" alignItems="center">
          <Grid item md={12} container justifyContent="center" direction="column" alignItems="center">
            <Typography variant="h2" color="white" gutterBottom>ResidentSleeper flower shop</Typography>
            <Typography variant="body1" color="white" paragraph>Only the freshest and most beautiful flowers you can find</Typography>
          </Grid>
        </Grid>
        {contents}
      </div>
    );
  }

  async populateFlower() {
    const response = await fetch('api/Flower');
    const data = await response.json();
    console.log(data);
    this.setState({ flowers: data, loading: false, index: Math.floor(Math.random() * data.length) });
    setInterval(() => {
      this.setState({ fade: false });
      setTimeout(() => { this.setState({ index: Math.floor(Math.random() * (data.length - 2)), loading: true }) }, 1000);
      setTimeout(() => { this.setState({ fade: true, loading: false }) }, 1000);
    }, 10000);
  }
}
