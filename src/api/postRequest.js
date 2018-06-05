import rp from "request-promise";

export default function postRequest(workOrderNumber, createdTime) {
    let options = {
        method: 'POST',
        uri: 'http://104.211.31.153/enqueue',
        body: {
            id: workOrderNumber,
            createdTime: createdTime
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options)
}
