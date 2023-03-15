import { API_HOST } from '@/constants';
import { BurgerPlace } from '@/models/burger-place';
import { BurgerReview } from '@/models/burger-review';
import { BurgerReviewImageResponse } from '@/models/burger-review-image-response';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Rating, TextField, Typography } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Resizer from "react-image-file-resizer";

type Props = {
    burgerPlace: BurgerPlace;
    burgerReviewResponse: BurgerReview;
    setNewBurgerReviewImage: Dispatch<SetStateAction<BurgerReviewImageResponse>>;
    setBurgerReviewResponse: Dispatch<SetStateAction<BurgerReview>>;
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

export default function AddReview({ burgerPlace, burgerReviewResponse, setNewBurgerReviewImage, setBurgerReviewResponse }: Props) {
    const [imagePreview, setImagePreview] = useState<string>("");
    const [newBurgerReview, setNewBurgerReview] = useState<BurgerReview>(initialBurgerReview);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const postBurgerReview = async () => {
            if (newBurgerReview.burgerPlaceId) {
                const response = await fetch(
                    `${API_HOST}/BurgerReview`,
                    { method: "POST", body: JSON.stringify(newBurgerReview), headers: { "content-type": "application/json" } });
                const burgerReviewResponse = await response.json();

                setBurgerReviewResponse(burgerReviewResponse);
            }
        };

        postBurgerReview();

    }, [newBurgerReview.burgerPlaceId, newBurgerReview.id]);

    useEffect(() => {
        const postBurgerReviewImage = async () => {
            if (burgerReviewResponse.id && imageFile?.size) {
                const queryParams = new URLSearchParams({ "burgerReviewId": burgerReviewResponse.id, "burgerPlaceId": burgerReviewResponse.burgerPlaceId });
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
                const burgerImageUpladResponse: BurgerReviewImageResponse = await response.json();
                setNewBurgerReview(initialBurgerReview);
                setImagePreview("");
                setImageFile(null);
                setNewBurgerReviewImage(burgerImageUpladResponse);
                imageFormData.delete("file");
            }
            else {
                setNewBurgerReview(initialBurgerReview);
                setNewBurgerReviewImage({} as BurgerReviewImageResponse);
            }
        }

        postBurgerReviewImage();

    }, [burgerReviewResponse.id]);

    const resizeImage = (file: File) => new Promise<File>((resolve) => {
        Resizer.imageFileResizer(
            file,
            100,
            100,
            "WEBP",
            100,
            0,
            (uri) => {
                resolve(uri as File);
            },
            "file"
        );
    });

    const handleAddReview = () => {
        imageFile?.size
            ? setNewBurgerReview({ ...newBurgerReview, burgerPlaceId: burgerPlace.id, pictureUrl: imageFile.type })
            : setNewBurgerReview({ ...newBurgerReview, burgerPlaceId: burgerPlace.id })
    }

    const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.value) {
            const imageFile = event.target.files[0];
            const imageObjectUrl = URL.createObjectURL(imageFile);
            const resizedFile = await resizeImage(imageFile);

            setImagePreview(imageObjectUrl);
            setImageFile(resizedFile);
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
                            setNewBurgerReview({ ...newBurgerReview, textureRating: newValue || 0 });
                        }}
                    />
                    <Typography component="legend">Taste</Typography>
                    <Rating
                        name="simple-controlled"
                        value={newBurgerReview.tasteRating}
                        onChange={(event, newValue) => {
                            setNewBurgerReview({ ...newBurgerReview, tasteRating: newValue || 0 });
                        }}
                    />
                    <Typography component="legend">Visual</Typography>
                    <Rating
                        name="simple-controlled"
                        value={newBurgerReview.visualRating}
                        onChange={(event, newValue) => {
                            setNewBurgerReview({ ...newBurgerReview, visualRating: newValue || 0 });
                        }}
                    />
                    <Typography component="legend">Comment</Typography>
                    <TextField fullWidth={true} id="outlined-controlled" variant="outlined" value={newBurgerReview.comment} onChange={(event) => setNewBurgerReview({ ...newBurgerReview, comment: event.target.value })} />
                    <Button sx={{ alignSelf: 'stretch', marginTop: '10px' }} variant="contained" component="label">
                        Upload Image
                        <input hidden accept="image/*" multiple type="file" onChange={handleImage} />
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