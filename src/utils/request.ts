export const handleResponse = (response) =>
    response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            return Promise.reject(data);
        }

        return data;
    });

export const getData = (url: string, options?) => {
    const requestOptions = {
        method: 'GET',
        ...options,
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const postData = async (url: string, body, options?) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...options,
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const patchData = (url: string, body, options?) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...options,
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const putData = (url: string, body, options?) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...options,
    };

    return fetch(url, requestOptions).then(handleResponse);
};

export const deleteData = (url: string, options?) => {
    const requestOptions = {
        method: 'DELETE',
        ...options,
    };

    return fetch(url, requestOptions).then(handleResponse);
};
