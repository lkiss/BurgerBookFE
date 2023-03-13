import { BurgerReview } from '@/models/burger-review';
import { PhotoCamera } from '@mui/icons-material';
import { Button, Divider, IconButton, Rating, TextField, Typography } from '@mui/material';
import * as React from 'react';

export default function AddReview(props: any) {
    const newBurgerReview: BurgerReview = props.newBurgerRewiew;

    return (
        <>
            <Typography component="legend">Texture</Typography>
            <Rating
                name="simple-controlled"
                value={newBurgerReview.textureRating}
                onChange={(event, newValue) => {
                    newBurgerReview.textureRating = newValue || 0;
                }}
            />
            <Typography component="legend">Taste</Typography>
            <Rating
                name="simple-controlled"
                value={newBurgerReview.tasteRating}
                onChange={(event, newValue) => {
                    newBurgerReview.tasteRating = newValue || 0;
                }}
            />
            <Typography component="legend">Visual</Typography>
            <Rating
                name="simple-controlled"
                value={newBurgerReview.visualRating}
                onChange={(event, newValue) => {
                    newBurgerReview.visualRating = newValue || 0;
                }}
            />
            <Typography component="legend">Comment</Typography>
            <TextField fullWidth={true} id="outlined-basic" label="Outlined" variant="outlined" />

            <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
            </IconButton>

            <Divider />
            <Button size="small" variant="outlined">Add Review</Button>
        </>
    );
}