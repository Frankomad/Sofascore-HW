import { SettingsContextProvider } from '@/context/SettingsContext'
import '@/styles/globals.css'
import '@/styles/MainContent.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

//@ts-ignore
export const fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('404')
    }
  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SettingsContextProvider>
        <Component {...pageProps} />
      </SettingsContextProvider>
    </SWRConfig>
  )
}
