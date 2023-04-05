const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongodb = require('./db/connect');
//serve api docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const port = process.env.PORT || 8080;

//Auth0 Integration
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use(bodyParser.json())
  .use((req, res, next) => {
  	res.setHeader('Access-Control-Allow-Origin', '*');
 		next();
  })
	.use('/', require('./routes'))
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  .use(auth(config));
  // .use(
  //   auth({
  //     authRequired: false,
  //     auth0Logout: true,
  //     issuerBaseURL: process.env.ISSUER_BASE_URL,
  //     baseURL: process.env.BASE_URL,
  //     clientID: process.env.CLIENT_ID,
  //     secret: process.env.SECRET,
  //     idpLogout: true,
  //   })
  // );

// req.isAuthenticated is provided from the auth router
  app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

//Allow for protected routes with Oauth
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});