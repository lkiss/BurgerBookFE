import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { BurgerPlace } from '@/models/burger-place'
import BurgerMap from './burgermap'
import Script from 'next/script'
import TemporaryDrawer from '@/components/temporary-drawer/temporary-drawer'

export default function Home() {
  const [burgerPlaces, setBurgerPlaces] = useState<BurgerPlace[]>([]);
  const [toggledBurgerPlace, setToggleDrawer] = useState(null);
 
  // fetch data
  useEffect(() => {
    const fetchBurgerPlaces = async ()=> {
      const response = await fetch('https://burgerbookbe.azurewebsites.net/api/BurgerPlace');
      const burgerPlaces = await response.json();
      setBurgerPlaces(burgerPlaces)
    }
    fetchBurgerPlaces();
  }, []);

  return (
    <>
      <Head>
        <title>Burger Book</title>
        <meta name="description" content="Find the best burger with Burger Book! " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BurgerMap toggleDrawerWithBurgerPlace={setToggleDrawer} burgerPlaces={burgerPlaces}></BurgerMap>
        <TemporaryDrawer toggledBurgerPlace={toggledBurgerPlace}></TemporaryDrawer>
      </main>
    </>
  )
}

