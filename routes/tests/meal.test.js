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
describe("Test Meal routes", () => {

  test("GET /meal/ Response should be 200 with valid meal list", () => {
    return request(app)
      .get("/test/meal")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),

              mealName: expect.any(String)
            }),
            expect.objectContaining({
              _id: expect.any(String),

              mealName: expect.any(String)
            })
          ])
        )
      })
  });
  test("GET /meal/:id Response should be 200 with single meal", () => {
    return request(app)
      .get("/test/meal/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),

            mealName: expect.any(String)
          }));
    })
});
  test("POST /meal/ Response should be 201", () => {
    return request(app)
      .post("/test/meal")
      .expect(201);
  });
  test("PUT /meal/:id Response should be 204", () => {
    return request(app)
      .put("/test/meal/1")
      .expect(204);
  });
  test("DELETE /meal/:id Response should be 200", () => {
    return request(app)
      .delete("/test/meal/1")
      .expect(200);
  });
});