import React from 'react';

import { BrowserSupport } from '@marco-polo/browser-support';
import { Overlay } from '@marco-polo/overlay';
import Theme from '@marco-polo/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import 'normalize.css';
import '../styles/core.css';
import { wrapper } from '../store/configureStore';
import { getActiveModal } from '../store/selectors/modals';
import { GlobalStyle, Main } from '../styles/global';

const App = ({ Component, pageProps }: AppProps) => {
    const activeModal = useSelector(getActiveModal);

    return (
        <>
            <Head>
                <title>Go City | Official Website | Save Up To 65% on Attractions</title>
                <meta name="description" content="Go City | Official Website | Save Up To 65% on Attractions" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#24249B" />
                <meta property="og:title" content="GoCity.com" key="title" />
                <meta name="theme-color" content="#24249B" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimum-scale=1"
                />
            </Head>

            <ThemeProvider theme={Theme.primary}>
                <GlobalStyle />

                <Main>
                    <Component {...pageProps} />
                </Main>

                {activeModal ? <Overlay /> : null}
                <div id="modal-container" />
                <BrowserSupport />
            </ThemeProvider>
        </>
    );
};

export default wrapper.withRedux(withRouter(App));
