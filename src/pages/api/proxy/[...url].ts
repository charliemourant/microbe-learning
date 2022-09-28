import type { NextApiRequest, NextApiResponse } from 'next';

interface Options {
    method: string;
    headers: Record<string, string>;
    body?: string;
}

export const RequestProxy = async (req: NextApiRequest, res: NextApiResponse) => {
    const parsedUrl = new URL(`/${req.url.replace('/api/proxy/', '')}`, process.env.API_ENDPOINT);
    const fullUrl = parsedUrl.href;

    const options = <Options>{
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (req.body) options.body = JSON.stringify(req.body);

    const response = await fetch(fullUrl, options);

    res.status(response.status);

    let responseData;

    try {
        responseData = await response.json();
        if (responseData.error) {
            responseData = {
                ...responseData,
                errorCode: response.status,
                errorMessage: response.statusText,
            };
        }
    } catch (error) {
        responseData = {
            errorCode: response.status,
            errorMessage: response.statusText,
        };
    }

    const data = {
        status: response.status,
        message: response.statusText,
        data: responseData,
        name: fullUrl,
    };

    res.send(data);
};

export default RequestProxy;
