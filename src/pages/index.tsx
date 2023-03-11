import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import { fetcher } from '@/swr/fetcher'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data, error, isLoading } = useSWR('https://burgerbookbe.azurewebsites.net/api/BurgerPlace', fetcher)

  return (
    <>
      <Head>
        <title>Burger Book</title>
        <meta name="description" content="Find the best burger with Burger Book! " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>{data}</div>
      </main>
    </>
  )
}

