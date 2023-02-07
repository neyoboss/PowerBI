import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';



export default function App({ Component, pageProps }: AppProps) {
  
  const NavListComp = dynamic(() => import('./navList'),{ssr:false})
  
  return (
    <div>
      <NavListComp />
      <Component {...pageProps} />
    </div>
  )
}
