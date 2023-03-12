import { Address } from "./address";
import { BurgerMenu } from "./burger-menu";
import { Location } from "./location";
import { OpeningHours } from "./opening-hours";

export interface BurgerPlace {
    id: string;
    name: string;
    address: Address;
    location: Location;
    menu: BurgerMenu;
    OpeningHours: Record<string, OpeningHours>;
}