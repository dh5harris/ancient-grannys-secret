const request = require("supertest");
const express = require('express');
const bodyParser = require('body-parser')
// const {MongoClient} = require('mongodb');
const app = express();

// const port = process.env.PORT || 8080;
// //create a mock app here so that tests can run on routes properly.
// //Why not server.js?: gets stuck without auth secret, which we may not want to reveal to these tests
app
  .use(bodyParser.json())
  .use((req, res, next) => {
  	res.setHeader('Access-Control-Allow-Origin', '*');
 		next();
  })
	.use('/', require('./tests/index'));

//employs mock routes for each of the collections to test functionality and connection.
//mock routes will return mock data as expected in production set up.
describe("Test routes", () => {

  test("GET /user/ Response should be 200 with user list", () => {
    return request(app)
      .get("/test/user")
      .expect(200);
  });
  test("GET /user/:id Response should be 200 with single user", () => {
    return request(app)
      .get("/test/user/1")
      .expect(200);
  });
  test("POST /user/ Response should be 201 with acknowledgement of response", () => {
    return request(app)
      .post("/test/user")
      .expect(201);
  });
  test("PUT /user/:id Response should be 204", () => {
    return request(app)
      .put("/test/user/1")
      .expect(204);
  });
  test("DELETE /user/:id Response should be 200", () => {
    return request(app)
      .delete("/test/user/1")
      .expect(200);
  });
});