import React from 'react';

import Theme from '@marco-polo/theme';
import { configureStore } from '@reduxjs/toolkit';
import { render as defaultRender, RenderResult } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { mockRouter } from './__mocks__/NextRouter';
import { reducer } from './src/store';
import { GlobalStyle } from './src/styles/global';
type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

const customRender = (
    ui: RenderUI,
    {
        preloadedState = {},
        store = configureStore({
            reducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware()
                    .concat
                    // api middleware
                    (),
            preloadedState,
        }),
        ...renderOptions
    } = {},
    { router }: RenderOptions = {}
): RenderResult => {
    const Providers = ({ children }) => (
        <Provider store={store}>
            <ThemeProvider theme={Theme.primary}>
                <RouterContext.Provider value={{ ...mockRouter, ...router }}>
                    <GlobalStyle />
                    {children}
                </RouterContext.Provider>
            </ThemeProvider>
        </Provider>
    );

    return defaultRender(ui, { wrapper: Providers, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
