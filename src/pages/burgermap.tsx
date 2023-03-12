import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styles from '@/styles/Burgermap.module.css'

export default function BurgerMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyCaXYS7jSFYyhj6B_0qaBU3M5m-2MgzgJU",
      });
      const center = useMemo(() => ({ lat: 47.483866, lng: 18.825794 }), []);

  return (
    <>
      <div className={styles.google_map}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={styles.container}
          center={center}
          zoom={10}
          
        />
      )}
    </div>
    </>
  )
}

