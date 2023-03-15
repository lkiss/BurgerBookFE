import * as React from 'react';
import { render, screen } from '@testing-library/react'
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
            it('should render Monday list item with Monday primary attribute', () => {
                render(<OpeningHours burgerPlace={burgerPlace}/>);

                const mondayElement = screen.getByRole("listitem");
                const expected = mondayElement.getAttribute("primary");

                expect(expected).toBe("Monday");
            });

            xit('should render Monday list item with opening hours in start - end format as secondary attribute', () => {
                const { getByRole } = render(<OpeningHours burgerPlace={burgerPlace} />);
                const mondayElement = getByRole("listitem");
                const expected = mondayElement.getAttribute("secondary");

                expect(expected).toBe("08:00:00 - 16:00:00.00");
            });
        })
    })
});