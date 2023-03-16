import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import OpeningHours from '../../components/opening-hours/opening-hours';
import { BurgerPlace } from '@/models/burger-place';
import { Address } from '@/models/address';
import { BurgerMenu } from '@/models/burger-menu';
import { Location } from '@/models/location';

const burgerPlace: BurgerPlace = {
    id: "12345",
    name: "Test",
    address: {} as Address,
    menu: {} as BurgerMenu,
    location: {} as Location,
    openingHours: {
        "Monday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
        "Tuesday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
        "Wednesday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
        "Thursday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
        "Friday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
        "Saturday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
        "Sunday": {
            startTime: "2023-03-12T08:00:00Z",
            endTime: "2023-03-12T16:00:00.00Z"
        },
    }
}

describe("OpeningHours specs", () => {

    describe("given openinghours data from api", () => {
        describe("when data is received in correct format", () => {
            it('should render Monday list item with Monday and time text', () => {
                render(<OpeningHours burgerPlace={burgerPlace} />);
                
                const button = screen.getByRole("button");

                fireEvent.click(button);

                const mondayElements = screen.getAllByRole("listitem");
                const expected = mondayElements[0].textContent;

                expect(expected).toBe("Monday9:00:00 AM - 5:00:00 PM");
            });
        })
    })
});
