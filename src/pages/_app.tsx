import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/custom.css'
import '../styles/buttons.css'
import '../styles/animations.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} 