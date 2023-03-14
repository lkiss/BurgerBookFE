import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import { BurgerPlace } from '@/models/burger-place';

type Props = {
    burgerPlace: BurgerPlace
}

export default function BurgerMenu({ burgerPlace }: Props) {

    const generateBurgerMenu = () =>
        burgerPlace.menu.burgers.map(burgerMenuItem =>
            <ListItem key={burgerMenuItem.name}>
                <ListItemText primary={burgerMenuItem.name} secondary={burgerMenuItem.price} />
            </ListItem>
        )

    return (
        <>
            <Accordion sx={{alignSelf: 'stretch'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Burger Menu</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {generateBurgerMenu()}
                    </List>
                </AccordionDetails>
            </Accordion>
        </>
    );
}