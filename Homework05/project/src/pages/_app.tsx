import { AppProps } from 'next/app';
import { WatchlistProvider } from '@/context/WatchlistContext';
import { SettingsContextProvider } from '@/context/SettingsContext';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';

export const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('404');
    }
  });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SettingsContextProvider>
        <WatchlistProvider>
            <Component {...pageProps} />
        </WatchlistProvider>
      </SettingsContextProvider>
    </SWRConfig>
  );
}
