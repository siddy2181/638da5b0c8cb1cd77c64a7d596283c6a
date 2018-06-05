import rp from "request-promise";

export default function postRequest(workOrderNumber, createdTime) {
    let options = {
        method: 'POST',
        uri: 'localhost:8080/enqueue',
        body: {
            id: workOrderNumber,
            createdTime: createdTime
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options)
}
