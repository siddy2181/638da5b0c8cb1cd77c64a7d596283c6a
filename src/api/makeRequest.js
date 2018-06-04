import rp from "request-promise";

export default function makeRequest(url, method) {
    const baseUrl = "http://104.211.31.153"
    let options = {

        uri: baseUrl + url,
        headers: {
            'Accept': '*/*',
            'User-Agent': 'Request-Promise'
        },
        json: true,
        method : method
    };

    return rp(options)
}
