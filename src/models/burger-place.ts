import { Address } from "./address";
import { BurgerMenu } from "./burger-menu";
import { Location } from "./location";
import { OpeningHours } from "./opening-hours";

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface BurgerPlace {
    id: string;
    name: string;
    address: Address;
    location: Location;
    menu: BurgerMenu;
    openingHours: Record<DayOfWeek, OpeningHours>;
}