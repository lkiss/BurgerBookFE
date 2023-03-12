import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from 'react';
import { BurgerReview } from '@/models/burger-review';
import { Rating, Typography } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {
    const [drawerState, setDrawerToggle] = useState({left: false});
    const [burgerReviews, setBurgerReviews] = useState([]);

    const burgerPlace = props.toggledBurgerPlace;
    let newBurgerRewiew: BurgerReview;

    useEffect(() => {
        const fetchBurgerReviews = async () => {
            const response = await fetch('https://burgerbookbe.azurewebsites.net/api/BurgerReview/getbyburgerplaceid/' + burgerPlace.id);
            const burgerReviews = await response.json();
            setBurgerReviews(burgerReviews);
        }

        if (burgerPlace) {
            fetchBurgerReviews();
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

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            { burgerPlace ?
            <>
                <h3>{burgerPlace.name}</h3>
                <Divider />
                {burgerReviews.map((burgerReview: BurgerReview) => {
                    return
                    <>
                        <img src={burgerReview.pictureUrl} width="50" height="50"></img>
                        <Typography component="legend">Overall</Typography>
                        <Rating name="read-only" value={burgerReview.overallRating} readOnly />

                        <Typography component="legend">Texture</Typography>
                        <Rating name="read-only" value={burgerReview.textureRating} readOnly />

                        <Typography component="legend">Taste</Typography>
                        <Rating name="read-only" value={burgerReview.tasteRating} readOnly />

                        <Typography component="legend">Visual</Typography>
                        <Rating name="read-only" value={burgerReview.visualRating} readOnly />
                        <span>{burgerReview.comment}</span>
                    </>
                })}
                <Divider />
                <Button size="small" variant="outlined">Add Review</Button>
            </>
            : <div>Loading...</div>
            }
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <Drawer
                        anchor={anchor}
                        open={drawerState[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}