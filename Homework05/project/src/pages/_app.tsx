import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { IntlProvider } from 'react-intl';

import { WatchlistProvider } from '@/context/WatchlistContext';
import { SettingsContextProvider } from '@/context/SettingsContext';

import English from "../../content/compiled-locales/en.json";
import Croatian from "../../content/compiled-locales/hr.json";

import '@/styles/globals.css';


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
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const messages = useMemo(() => {
      switch (shortLocale) {
          case "hr":
              return Croatian;
          case "en":
              return English;
          default:
              return English;
      }
  }, [shortLocale]);

  return (
    <SWRConfig value={{ fetcher }}>
      <SettingsContextProvider>
        <WatchlistProvider>
          <IntlProvider
              locale={shortLocale}
              messages={messages}
              onError={() => null}>
            <Component {...pageProps} />
          </IntlProvider>
        </WatchlistProvider>
      </SettingsContextProvider>
    </SWRConfig>
  );
}
