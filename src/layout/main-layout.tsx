// import '@/styles/globals.css'

import ButtonAppBar from "@/components/app-bar";

export default function MainLayout(props: any) {
  return (
    <>
        <ButtonAppBar></ButtonAppBar>
        {props.children}
    </>
  )
}
