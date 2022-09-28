import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { reducer } from './index';

export const makeStore = () =>
    configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .prepend
                // plugin middlewares
                ()
                .concat
                // api middlewares
                (),
    });

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper(makeStore, { debug: false });
