import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useMemo } from "react";
import styles from '@/styles/Burgermap.module.css'
import InfoWindow from "@/components/info-window/info-window";
import { BurgerPlace } from "@/models/burger-place";

type Props = {
    burgerPlaces: BurgerPlace[] | null;
    toggleDrawerWithBurgerPlace: Dispatch<SetStateAction<BurgerPlace | null>>
}

export default function BurgerMap({ burgerPlaces, toggleDrawerWithBurgerPlace }: Props) {
    const center = useMemo(() => ({ lat: 47.483809, lng: 18.825881 }), []);

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyCaXYS7jSFYyhj6B_0qaBU3M5m-2MgzgJU"
                
            >
                <GoogleMap
                    mapContainerClassName={styles.container}
                    center={center}
                    zoom={15}
                >
                    {
                        burgerPlaces
                            ?.map((burgerPlace: BurgerPlace) => (<InfoWindow key={burgerPlace.id} burgerPlace={burgerPlace} toggleDrawerWithBurgerPlace={toggleDrawerWithBurgerPlace}></InfoWindow>))
                    }
                    <></>
                </GoogleMap>
            </LoadScript>
        </>
    )
}

