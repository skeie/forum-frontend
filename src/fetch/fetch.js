import queryString from 'query-string';
const baseURl = __DEV__
    ? 'http://192.168.178.190:3000'
    : 'https://fast-spire-38104.herokuapp.com';

let jwtToken = '';

function _appUrl(url) {
    return baseURl + url;
}

export const setJwtToken = token => (jwtToken = token);

export async function getExt(url) {
    try {
        const response = await fetch(url, setHeaders('GET'));
        if (response.status === 200) {
            return Promise.resolve();
        } else {
            return Promise.reject('Next page does not exists');
        }
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function get(url, obj = {}) {
    let constructedUrl = url;
    if (obj.params) {
        constructedUrl += `?${queryString.stringify(obj.params)}`;
    }
    const response = await fetch(_appUrl(constructedUrl), setHeaders('GET'));
    return handleResponse(response);
}

export async function post(url, obj) {
    const response = await fetch(
        _appUrl(url),
        setHeaders('POST', JSON.stringify(obj)),
    );
    return handleResponse(response);
}

export async function postMultiPart(url, obj) {
    const data = new FormData();

    for (const key in obj) {
        data.append(key, JSON.stringify(obj[key]));
    }

    const response = await fetch(
        _appUrl(url),
        setHeaders('POST', data, { 'Content-Type': 'multipart/form-data' }),
    );
    return handleResponse(response);
}

function setHeaders(method, body, optHeader) {
    const headers = Object.assign(
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        optHeader,
    );

    if (jwtToken) {
        headers.authorization = `Bearer ${jwtToken}`;
    }

    return {
        method,
        headers,
        body,
    };
}

async function handleResponse(response) {
    if (response.status === 201 || response.status === 204) return;
    let responseJson;
    try {
        responseJson = await response.json();
    } catch (e) {
        throw {
            message: 'Something went wrong, check if you have internet',
        };
    }

    if (response.status >= 400) {
        // check msg or message here and check for json
        const msg =
            responseJson.message ||
            'Something went wrong, check if you have internet';
        throw {
            message: msg,
        };
    } else {
        return responseJson;
    }
}
