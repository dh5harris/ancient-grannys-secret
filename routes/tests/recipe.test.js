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
describe("Test Recipe routes", () => {

  test("GET /recipe/ Response should be 200 with valid recipe list", () => {
    return request(app)
      .get("/test/recipe")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),

              recipeName: expect.any(String),
              ingredients: expect.arrayContaining([
                  expect.any(String)]),
              directions: expect.any(String),
              isPrivate: expect.any(Boolean)
              
            }),
            expect.objectContaining({
              _id: expect.any(String),

              recipeName: expect.any(String),
              ingredients: expect.arrayContaining([
                expect.any(String)]),
              directions: expect.any(String),
              isPrivate: expect.any(Boolean)
              
            })
          ])
        )
      })
  });
  test("GET /recipe/:id Response should be 200 with single recipe", () => {
    return request(app)
      .get("/test/recipe/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),

            recipeName: expect.any(String),
            ingredients: expect.arrayContaining([
              expect.any(String)
            ]),
            directions: expect.any(String),
            isPrivate: expect.any(Boolean)
            
          }));
    })
});
  test("POST /recipe/ Response should be 201", () => {
    return request(app)
      .post("/test/recipe")
      .expect(201);
  });
  test("PUT /recipe/:id Response should be 204", () => {
    return request(app)
      .put("/test/recipe/1")
      .expect(204);
  });
  test("DELETE /recipe/:id Response should be 200", () => {
    return request(app)
      .delete("/test/recipe/1")
      .expect(200);
  });
});