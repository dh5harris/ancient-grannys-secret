//ensure modules are valid and paths connect
//connect to modules
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongodb = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const port = process.env.PORT || 8080;
const { auth, requiresAuth } = require('express-openid-connect');

test('Modules/Packages connect', ()=>{
    //ensure packages are not null
    expect(express).not.toBeNull;
    expect(bodyParser).not.toBeNull;
    expect(app).not.toBeNull;
    expect(mongodb).not.toBeNull;
    expect(swaggerUi).not.toBeNull;
    expect(swaggerDocument).not.toBeNull;
    expect(port).not.toBeNull;
    expect(auth).not.toBeNull;
    expect(requiresAuth).not.toBeNull;

    //ensure packages are not undefined
    expect(express).not.toBeUndefined;
    expect(bodyParser).not.toBeUndefined;
    expect(app).not.toBeUndefined;
    expect(mongodb).not.toBeUndefined;
    expect(swaggerUi).not.toBeUndefined;
    expect(swaggerDocument).not.toBeUndefined;
    expect(port).not.toBeUndefined;
    expect(auth).not.toBeUndefined;
    expect(requiresAuth).not.toBeUndefined;
});