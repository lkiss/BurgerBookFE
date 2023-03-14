import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { BurgerPlace } from '@/models/burger-place'
import BurgerMap from './burgermap'
import TemporaryDrawer from '@/components/temporary-drawer/temporary-drawer'
import { API_HOST } from '@/constants'

export default function Home() {
  const [burgerPlaces, setBurgerPlaces] = useState<BurgerPlace[] | null>(null);
  const [toggledBurgerPlace, setToggleDrawer] = useState<BurgerPlace | null>(null);
 
  // fetch data
  useEffect(() => {
    const fetchBurgerPlaces = async ()=> {
      const response = await fetch(`${API_HOST}/BurgerPlace`);
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
        <TemporaryDrawer burgerPlace={toggledBurgerPlace}></TemporaryDrawer>
      </main>
    </>
  )
}

