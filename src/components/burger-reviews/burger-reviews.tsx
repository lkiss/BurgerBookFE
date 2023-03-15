import { BurgerPlace } from '@/models/burger-place';
import { BurgerReview } from '@/models/burger-review';
import { Accordion, AccordionDetails, AccordionSummary, Badge, List, ListItem, ListItemText, Rating, TextField, Typography } from '@mui/material';
import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CSSProperties, useEffect, useState } from 'react';
import { API_HOST } from '@/constants';
import { BurgerReviewImageResponse } from '@/models/burger-review-image-response';

type Props = {
    burgerPlace: BurgerPlace;
    newBurgerReviewResponse: BurgerReview;
    newBurgerReviewImageResponse: BurgerReviewImageResponse;
}

const reviewListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
}

export default function BurgerReviews({ burgerPlace, newBurgerReviewResponse, newBurgerReviewImageResponse }: Props) {
    const [burgerReviews, setBurgerReviews] = useState<BurgerReview[]>([]);

    useEffect(() => {
        const fetchBurgerReviews = async () => {
            const response = await fetch(`${API_HOST}/BurgerReview/getbyburgerplaceid/${burgerPlace.id}`);
            const burgerReviews = await response.json();
            setBurgerReviews(burgerReviews);
        }

        if (burgerPlace) {
            fetchBurgerReviews();
        }

    }, [burgerPlace, newBurgerReviewImageResponse]);

    const calculateOverallRating = (burgerReview: BurgerReview) => {
        const ratingSum = burgerReview.tasteRating + burgerReview.textureRating + burgerReview.visualRating;

        return ratingSum / 3;
    };

    return (
        <>
            <Accordion sx={{ alignSelf: 'stretch' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Badge badgeContent={burgerReviews.length} color="info">
                        <Typography>Burger Reviews</Typography>
                    </Badge>
                </AccordionSummary>
                <AccordionDetails>
                    {burgerReviews.map(burgerReview =>
                        <div key={burgerReview.id} style={reviewListStyle}>

                            <img src={burgerReview.pictureUrl} width="100" height="100" key={burgerReview.pictureUrl}></img>

                            <Typography component="legend">Overall</Typography>
                            <Rating name="read-only" value={calculateOverallRating(burgerReview)} readOnly />

                            <Typography component="legend">Texture</Typography>
                            <Rating name="read-only" value={burgerReview.textureRating} readOnly />

                            <Typography component="legend">Taste</Typography>
                            <Rating name="read-only" value={burgerReview.tasteRating} readOnly />

                            <Typography component="legend">Visual</Typography>
                            <Rating name="read-only" value={burgerReview.visualRating} readOnly />

                            <Typography component="legend">Comment</Typography>
                            <TextField disabled={true} fullWidth={true} value={burgerReview.comment} id="outlined-controlled" variant="outlined" />

                        </div>
                    )}
                </AccordionDetails>
            </Accordion>


        </>
    );
}