import React, { Component } from 'react';
import './FlowerCard.css';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

export default function FlowerCard(props) {
    return (
        <Card>
            <CardMedia height="250px" component="img" image={props.imUrl} />
            <CardContent sx={{ height: "150px"}}>
                <Typography gutterBottom variant="h5" component="div" >{props.title}</Typography>
                <Typography variant="body2" color="text.secondary" >{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    More
                </Button>
            </CardActions>
        </Card>
    );
}
