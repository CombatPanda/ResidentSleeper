import React from 'react';
import { Card, Fade, Typography } from '@mui/material';
import { Grid } from '@material-ui/core';

export default function FeaturedCard(props) {
  return (
    <Fade in={props.fadeIn}>
      <Card>
        <Grid height="500px" style={{ backgroundImage: `url(${props.imUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} container direction="column" alignItems="center" justifyContent="center">
          <Grid item>
            <Typography align="center" gutterBottom variant="h4" component="div" color="white">{props.title}</Typography>
            <Typography align="center" gutterBottom variant="h4" component="div" color="white">{props.cost}€</Typography>
          </Grid>
        </Grid>
      </Card>
    </Fade>
  );
}