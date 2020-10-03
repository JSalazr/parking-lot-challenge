const request = require("supertest");

describe("loading vehicle service", function () {
  var server;
  beforeEach(function () {
    server = require("./index");
  });
  afterEach(function () {
    server.close();
  });
  it("responds to /vehicles", function testExport(done) {
    request(server).get("/vehicles").expect(200, done);
  });
});