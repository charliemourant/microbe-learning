import React from 'react';

import * as Sentry from '@sentry/react';
import Error from 'next/error';

const ErrorPage = ({ error }) => {
    Sentry.captureException(error);

    if (error?.errorCode) {
        return <Error statusCode={error.errorCode} title={error.errorMessage} />;
    }

    return <Error statusCode={418} title="Unknown Error" />;
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
