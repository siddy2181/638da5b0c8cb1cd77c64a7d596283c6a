var sinon = require("sinon");
var makeRequest = require("../src/api/makeRequest");

jest.mock("../src/api/makeRequest");

makeRequest.mockImplementation((url, options) => {
    return new Promise((resolve, reject) => {
        resolve({ id : 1, createdTime:"42343" })
    });
});

describe("Workorder", () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => { sandbox.restore(); })

    test("Getting data", () => {
        makeRequest("http://104.211.31.153/ids", "GET")
            .then(function(result){
                expect(result).toEqual([{id:1,createdTime:"42343"}])
            })
    });
});