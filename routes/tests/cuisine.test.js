const request = require("supertest");
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// //create a mock app here so that tests can run on routes properly.
// //Why not server.js?: gets stuck without auth secret, which we may not want to reveal to these tests
app
  .use(bodyParser.json())
  .use((req, res, next) => {
  	res.setHeader('Access-Control-Allow-Origin', '*');
 		next();
  })
	.use('/', require('./mockRoutes'));

//employs mock routes for each of the collections to test functionality and connection.
//mock routes will return mock data as expected in production set up.
describe("Test Cuisine routes", () => {

  test("GET /cuisine/ Response should be 200 with valid cuisine list", () => {
    return request(app)
      .get("/test/cuisine")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),

              cuisineName: expect.any(String),
            }),
            expect.objectContaining({
              _id: expect.any(String),

              cuisineName: expect.any(String),
            })
          ])
        )
      })
  });
  test("GET /cuisine/:id Response should be 200 with single cuisine", () => {
    return request(app)
      .get("/test/cuisine/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),

            cuisineName: expect.any(String),
          }))
        });
    });
  test("POST /cuisine/ Response should be 201", () => {
    return request(app)
      .post("/test/cuisine")
      .expect(201);
  });
  test("PUT /cuisine/:id Response should be 204", () => {
    return request(app)
      .put("/test/cuisine/1")
      .expect(204);
  });
  test("DELETE /cuisine/:id Response should be 200", () => {
    return request(app)
      .delete("/test/cuisine/1")
      .expect(200);
  });
});