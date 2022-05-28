import { Button, Grid, Paper, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import React, { Component } from 'react';
import CarouselCard from './Carousel/CarouselCard';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <Grid container style={{ backgroundImage: `url(${"https://travelbristol.org/wp-content/uploads/2022/02/anthony-fomin-h7_SyoBhHF0-unsplash-scaled.jpg"})`, height: "400px", backgroundSize: "cover" }} direction="row" justifyContent="center" alignItems="center">
            <Grid item md={12} container justifyContent="center" direction="column" alignItems="center">
                <Typography variant="h2" color="white" gutterBottom>
                    ResidentSleeper flower shop
                </Typography>
                <Typography variant="body1" color="white" paragraph>
                    Only the freshest and most beautiful flowers you can find
                </Typography>
            </Grid>
        </Grid>
      </div>
    );
  }
}
