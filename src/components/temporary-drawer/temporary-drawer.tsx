import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OpeningHours from '../opening-hours/opening-hours';
import AddReview from '../add-review/add-review';
import BurgerMenu from '../burger-menu/burger-menu';
import BurgerReviews from '../burger-reviews/burger-reviews';
import { BurgerPlace } from '@/models/burger-place';
import { BurgerReview } from '@/models/burger-review';
import { BurgerReviewImageResponse } from '@/models/burger-review-image-response';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type Props = {
    burgerPlace: BurgerPlace | null;
    toggleDrawerWithBurgerPlace: Dispatch<SetStateAction<BurgerPlace | null>>;
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

const initialBurgerReviewImageResponse: BurgerReviewImageResponse = {
    burgerPlaceId: "",
    burgerReviewId: "",
    size: 0
};

const initialBurgerReviewResponse: BurgerReview = {
    id: "",
    burgerPlaceId: "",
    overallRating: 0,
    textureRating: 0,
    tasteRating: 0,
    visualRating: 0,
    comment: "",
    pictureUrl: ""
};

export default function TemporaryDrawer({ burgerPlace, toggleDrawerWithBurgerPlace }: Props) {
    const [drawerState, setDrawerToggle] = useState({ left: false });
    const [newBurgerReviewImageResponse, setNewBurgerReviewImageResponse] = useState<BurgerReviewImageResponse>(initialBurgerReviewImageResponse);
    const [newBurgerReviewResponse, setBurgerReviewResponse] = useState<BurgerReview>(initialBurgerReviewResponse);

    useEffect(() => {
        if (burgerPlace) {
            setDrawerToggle({ ...StaticRange, ["left"]: true });
        }
    }, [burgerPlace]);

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setDrawerToggle({ ...drawerState, [anchor]: open });
            };

    const handleClose = () => {
        setDrawerToggle({ left: false });
        toggleDrawerWithBurgerPlace(null);
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            role="presentation"
        >
            {burgerPlace ?
                <>
                    <h3>{burgerPlace.name}</h3>
                    <>
                        <OpeningHours burgerPlace={burgerPlace}></OpeningHours>
                        <Divider />
                        <BurgerMenu burgerPlace={burgerPlace}></BurgerMenu>
                        <Divider />
                        <BurgerReviews burgerPlace={burgerPlace} newBurgerReviewResponse={newBurgerReviewResponse} newBurgerReviewImageResponse={newBurgerReviewImageResponse} ></BurgerReviews>
                        <Divider />
                        <AddReview burgerPlace={burgerPlace} burgerReviewResponse={newBurgerReviewResponse} setBurgerReviewResponse={setBurgerReviewResponse} setNewBurgerReviewImage={setNewBurgerReviewImageResponse}></AddReview>
                        <Divider />
                        <Button sx={{marginTop: '10px'}} size="small" fullWidth={true} variant="outlined" onClick={handleClose}>Close</Button>
                    </>
                </>
                : <div>Loading...</div>
            }
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={drawerState[anchor]}
                        onClose={toggleDrawer(anchor, true)}
                        variant={"temporary"}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}