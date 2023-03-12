import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { BurgerPlace } from '@/models/burger-place'
import BurgerMap from './burgermap'

export default function Home() {
  const [burgerPlace, setBurgerPlace] = useState<BurgerPlace | null>(null)
 
  // fetch data
  useEffect(() => {
    fetch('https://burgerbookbe.azurewebsites.net/api/BurgerPlace')
      .then(res => res.json())
      .then( (data: BurgerPlace) => {
        setBurgerPlace(data);
        console.log(data);
      })
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
        <BurgerMap></BurgerMap>
      </main>
    </>
  )
}

