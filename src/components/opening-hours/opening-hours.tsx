import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import { BurgerPlace } from '@/models/burger-place';

type Props = {
    burgerPlace: BurgerPlace
}

export default function OpeningHours({ burgerPlace }: Props) {
    const convertOpeningHours = ({ startTime, endTime }: { startTime: string, endTime: string }) => {
        return new Date(startTime).toLocaleTimeString() + " - " + new Date(endTime).toLocaleTimeString();
    }

    return (
        <>
            <Accordion sx={{ alignSelf: 'stretch' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Opening Hours</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <nav aria-label="Monday Tuesday Wednesday Thursday Friday Saturday Sunday">
                        <List>
                            <ListItem disablePadding>
                                <ListItemText primary="Monday" secondary={convertOpeningHours(burgerPlace.openingHours.Monday)} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Tuesday" secondary={convertOpeningHours(burgerPlace.openingHours.Tuesday)} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Wednesday" secondary={convertOpeningHours(burgerPlace.openingHours.Wednesday)} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Thursday" secondary={convertOpeningHours(burgerPlace.openingHours.Thursday)} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Friday" secondary={convertOpeningHours(burgerPlace.openingHours.Friday)} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Saturday" secondary={convertOpeningHours(burgerPlace.openingHours.Saturday)} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Sunday" secondary={convertOpeningHours(burgerPlace.openingHours.Sunday)} />
                            </ListItem>
                        </List>
                    </nav>
                </AccordionDetails>
            </Accordion>
        </>
    );
}