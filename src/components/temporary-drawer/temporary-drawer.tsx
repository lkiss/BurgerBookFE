import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import OpeningHours from '../opening-hours/opening-hours';
import AddReview from '../add-review/add-review';
import BurgerMenu from '../burger-menu/burger-menu';
import BurgerReviews from '../burger-reviews/burger-reviews';
import { BurgerPlace } from '@/models/burger-place';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type Props = {
    burgerPlace: BurgerPlace | null
}

export default function TemporaryDrawer({ burgerPlace }: Props) {
    const [drawerState, setDrawerToggle] = useState({ left: false });

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
                        <BurgerReviews burgerPlace={burgerPlace}></BurgerReviews>
                        <Divider />
                        <AddReview burgerPlace={burgerPlace}></AddReview>
                        <Divider />
                        <Button size="small" variant="outlined" onClick={() => setDrawerToggle({ left: false })}>Close</Button>
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