import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FlowerCard(props) {
    return (
        <Card>
            <CardMedia height="250px" component="img" image={props.imUrl} />
            <CardContent sx={{ height: "150px" }}>
                <Typography gutterBottom variant="h5" component="div" >{props.title}</Typography>
                <Typography variant="body2" color="text.secondary" >{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Link to={'/flower-details/' + props.id}>
                    <Button size="small" color="primary">
                        More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
