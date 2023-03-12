import { BurgerPlace } from '@/models/burger-place';
import { Button } from '@mui/material';
import { InfoWindowF } from '@react-google-maps/api';
import * as React from 'react';
import { useMemo } from 'react';
import styles from "./info-window.module.css"

export default function InfoWindow(props: any) {

  const onLoad = () => {

  }

  const burgerPlace: BurgerPlace = props.burgerPlace;

  const toggleBurgerPlaceDrawer = () => {
    props.toggleDrawerWithBurgerPlace(burgerPlace);
  }

  return (
    <InfoWindowF
      position={burgerPlace.location}
      onLoad={onLoad}

    >
      <div className={styles.info_window_content}>
        <h4>{burgerPlace.name}</h4>
        <div>{burgerPlace.address.city}</div>
        <div>{burgerPlace.address.street}</div>
        <div>{burgerPlace.address.addressLine1}</div>
        <div>{burgerPlace.address.zip}</div>
        <br></br>
        <div className={styles.info_window_content_button}>
          <Button size="small" variant="outlined" onClick={toggleBurgerPlaceDrawer}>Details</Button>
        </div>
      </div>

    </InfoWindowF>
  );
}