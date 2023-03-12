import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styles from '@/styles/Burgermap.module.css'
import InfoWindow from "@/components/info-window/info-window";
import { BurgerPlace } from "@/models/burger-place";

export default function BurgerMap(props: any) {
    const center = useMemo(() => ({ lat: 47.483809, lng: 18.825881 }), []);

    console.log("BurgerMap", props.burgerPlaces);

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
                        props?.burgerPlaces
                            ?.map((burgerPlace: BurgerPlace) => (<InfoWindow key={burgerPlace.id} burgerPlace={burgerPlace} toggleDrawerWithBurgerPlace={props.toggleDrawerWithBurgerPlace}></InfoWindow>))
                    }

                    <></>
                </GoogleMap>
            </LoadScript>
        </>
    )
}

