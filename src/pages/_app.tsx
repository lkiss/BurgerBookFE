import MainLayout from '@/layout/main-layout'
import type { AppProps } from 'next/app'
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
