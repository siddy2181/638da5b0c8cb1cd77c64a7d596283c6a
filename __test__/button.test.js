var sinon = require("sinon");
var makeRequest = require("../src/api/makeRequest");

jest.mock("../src/api/makeRequest");

makeRequest.mockImplementation((url, options) => {
    return new Promise((resolve, reject) => {
        resolve({ url, options });
    });
});

describe("Workorder", () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
      });
    afterEach(() => { sandbox.restore(); })

    test("Getting data", () => {
        makeRequest("/ids", "GET")
          .then(function(result){
            expect(result).toEqual([{id:1,createdTime:"42343"}])
          })
    });
});


