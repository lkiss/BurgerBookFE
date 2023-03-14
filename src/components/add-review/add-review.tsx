import { API_HOST } from '@/constants';
import { BurgerPlace } from '@/models/burger-place';
import { BurgerReview } from '@/models/burger-review';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Rating, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
    burgerPlace: BurgerPlace;
}

const initialBurgerReview: BurgerReview = {
    id: "",
    burgerPlaceId: "",
    overallRating: 0,
    textureRating: 0,
    tasteRating: 0,
    visualRating: 0,
    comment: "",
    pictureUrl: ""
};

export default function AddReview({ burgerPlace }: Props) {
    const [newBurgerReview, setBurgerReview] = useState<BurgerReview>(initialBurgerReview);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const postBurgerReview = async () => {
            const response = await fetch(
                `${API_HOST}/BurgerReview`,
                { method: "POST", body: JSON.stringify(newBurgerReview), headers: { "content-type": "application/json" } });
            const burgerReviewResponse = await response.json();
            setBurgerReview({ ...newBurgerReview, id: burgerReviewResponse.id });
        };

        if (newBurgerReview.burgerPlaceId) {
            postBurgerReview();
        }

    }, [newBurgerReview.burgerPlaceId]);

    useEffect(() => {
        const postBurgerReviewImage = async () => {
            if (imageFile?.size) {
                const queryParams = new URLSearchParams({ "reviewId": newBurgerReview.id, "placeId": newBurgerReview.burgerPlaceId });
                const endpoint = `${API_HOST}/BurgerReview/uploadreviewimage`;
                const imageFormData = new FormData();
                imageFormData.append("file", imageFile);

                const response =
                    await fetch(endpoint + "?" + queryParams,
                        {
                            method: "POST",
                            body: imageFormData,
                            headers: {
                                'content-length': `${imageFile.size}`
                            }
                        });
                const burgerImageUpladResponse = await response.json();
                return burgerImageUpladResponse;
            }
        }

        if (newBurgerReview.id) {
            postBurgerReviewImage();
        }

    }, [newBurgerReview.id]);

    const handleAddReview = () => {
        setBurgerReview({ ...newBurgerReview, burgerPlaceId: burgerPlace.id, pictureUrl: "true" });
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.value) {
            const imageFile = event.target.files[0];
            const imageObjectUrl = URL.createObjectURL(imageFile);

            setImagePreview(imageObjectUrl);
            setImageFile(imageFile);
        }
    }

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Add Review</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {imagePreview ? <img src={imagePreview} width="100" height="100"></img> : <div></div>}

                    <Typography component="legend">Texture</Typography>
                    <Rating
                        name="simple-controlled"
                        value={newBurgerReview.textureRating}
                        onChange={(event, newValue) => {
                            setBurgerReview({ ...newBurgerReview, textureRating: newValue || 0 });
                        }}
                    />
                    <Typography component="legend">Taste</Typography>
                    <Rating
                        name="simple-controlled"
                        value={newBurgerReview.tasteRating}
                        onChange={(event, newValue) => {
                            setBurgerReview({ ...newBurgerReview, tasteRating: newValue || 0 });
                        }}
                    />
                    <Typography component="legend">Visual</Typography>
                    <Rating
                        name="simple-controlled"
                        value={newBurgerReview.visualRating}
                        onChange={(event, newValue) => {
                            setBurgerReview({ ...newBurgerReview, visualRating: newValue || 0 });
                        }}
                    />
                    <Typography component="legend">Comment</Typography>
                    <TextField fullWidth={true} id="outlined-controlled" variant="outlined" onChange={(event) => setBurgerReview({ ...newBurgerReview, comment: event.target.value })} />
                    <Button sx={{ alignSelf: 'stretch', marginTop: '10px' }} variant="contained" component="label">
                        Upload Image
                        <input hidden accept="image/jpeg" multiple type="file" onChange={handleImage} />
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleAddReview}
                        sx={{ alignSelf: 'stretch', marginTop: '10px' }}>
                        Add Review
                    </Button>
                </AccordionDetails>
            </Accordion>
        </>
    );
}