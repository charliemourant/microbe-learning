# [🦠 Microbe](https://github.com/leisurepassgroup/microbe-framework) &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> nextJS build template with next-auth out of the box

Use this TypeScript template as a starter kit to develop applications from.

## Installing / Getting started

#### Clone the repository

```shell
git clone git@github.com:leisurepassgroup/microbe-framework.git
```

-   Refer to [Prerequisites](#prerequisites) and [Setting up Dev](#setup)

#### Running a local instance

You will first need to set up a `.env.local` file based off of the `.env.example` file.

```shell
npm install
npm run dev
```

## Developing

### Built With

React, NextJS, TypeScript, @marco-polo, Jest, react-testing-library, Cypress

### Prerequisites <a name="prerequisites"></a>

-   Install [NodeJS](https://nodejs.org/en/download/)
-   Install [NVM](https://github.com/nvm-sh/nvm) `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
-   Install [AVN](https://www.npmjs.com/package/avn) `npm install -g avn avn-nvm avn-n avn setup`
-   Install [npx-merge-driver](https://www.npmjs.com/package/npm-merge-driver) `npx npm-merge-driver install --global`
-   Install [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) `npm install npm-check-updates --global`

#### On Windows?

-   Install [win-node-env](https://www.npmjs.com/package/win-node-env) `npm i -g win-node-env`

#### Add auth credentials for JFROG

-   Navigate to [JFROG](https://lpg.jfrog.io/ui/login) and log in using the icon at the bottom (google account)
-   Under user profile, generate a [new API key](https://lpg.jfrog.io/ui/admin/artifactory/user_profile)
-   In terminal type

```
curl -u YOUR_EMAIL:YOUR_APIKEY https://lpg.jfrog.io/lpg/api/npm/auth >> ~/.npmrc
npm config set registry https://lpg.jfrog.io/artifactory/api/npm/virt-lpg-npm/
```

-   Open your `~/.npmrc` file and check that there isn't an error message. You should see some form of credentials .

#### Run tasks

```shell
npm run dev
```

## Redux

Ideally, we want to use [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started) for our store

In `store > api` you can create a custom RTK api which will allow us to optimise fetching of data using [RTKQuery](https://redux-toolkit.js.org/rtk-query/overview#basic-usage)

The File will look something like this

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const productsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.PRODUCT_API }),
    reducerPath: 'productsApi',
    tagTypes: ['Products'],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: (data) => ({ url: `?currency=${data.currency}&destination=${data.destinationId}` }),
            providesTags: ['Products'],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    util: { getRunningOperationPromises },
} = productsApi;

export const { getAllProducts } = productsApi.endpoints;
```

Then you will need to add the endpoint in configureStore.ts and test.render.ts

```typescript
// configureStore
configureStore({
    reducer: store,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

// test.render.ts
preloadedState = {},
store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
    ),
  preloadedState,
})
```

[Please read into how this works and why we're using it](https://redux-toolkit.js.org/rtk-query/overview#basic-usage)

If you wish to use Redux-Sagas please refer to [ecom-portal-ui](https://github.com/leisurepassgroup/ecom-portal-ui)

## Tests

The tests will automatically run before each deployment. Any new components should be properly tested; we always aim for 85-100% code coverage.

Alternatively, you can run a code watch command

```shell
npm run tdd
```

Or run all of the tests manually, to see what unit test coverage is like

```shell
npm run test
```
