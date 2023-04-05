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
describe("Test User routes", () => {

  test("GET /user/ Response should be 200 with valid user list", () => {
    return request(app)
      .get("/test/user")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),

              firstName: expect.any(String),
              lastName: expect.any(String),
              userName: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              bio: expect.any(String),
              image: expect.any(String),
              recipes: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String)
              })])
            }),
            expect.objectContaining({
                _id: expect.any(String),

                firstName: expect.any(String),
                lastName: expect.any(String),
                userName: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                bio: expect.any(String),
                image: expect.any(String),
                recipes: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String)
                })])
            })
          ])
        )
      })
  });
  test("GET /user/:id Response should be 200 with single user", () => {
    return request(app)
      .get("/test/user/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
        expect.objectContaining({
            _id: expect.any(String),

            firstName: expect.any(String),
            lastName: expect.any(String),
            userName: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            bio: expect.any(String),
            image: expect.any(String),
            recipes: expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String)
            })])
        }));
    })
});
  test("POST /user/ Response should be 201", () => {
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