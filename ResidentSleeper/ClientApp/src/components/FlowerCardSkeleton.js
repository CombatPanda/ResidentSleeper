import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FlowerCardSkeleton() {
    return (
        <Card>
            <Skeleton variant="rectangular" height="250px" />
            <CardContent sx={{ height: "150px" }}>
                <Typography gutterBottom variant="h5" component="div" ><Skeleton /></Typography>
                <Typography variant="body2" color="text.secondary" ><Skeleton /></Typography>
                <Typography variant="body2" color="text.secondary" ><Skeleton /></Typography>
                <Typography variant="body2" color="text.secondary" ><Skeleton /></Typography>
                <Typography variant="body2" color="text.secondary" ><Skeleton /></Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <Skeleton width="50px" />
                </Button>
            </CardActions>
        </Card>
    );
}