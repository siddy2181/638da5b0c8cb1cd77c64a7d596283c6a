import rp from "request-promise";

export default function makeRequest(url, method) {
    let opts = {
        uri: url,
        headers: {
            'Accept': '*/*',
            'User-Agent': 'Request-Promise'
        },
        json: true,
        method : method
    };

    return rp(opts)
}
