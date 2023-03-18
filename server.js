const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongodb = require('./db/connect');
//serve api docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const port = process.env.PORT || 8080;

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use(bodyParser.json())
  .use((req, res, next) => {
  	res.setHeader('Access-Control-Allow-Origin', '*');
 		next();
  })
	.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});