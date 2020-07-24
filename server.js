/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */

// * Importing packages
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');

// * Importing environment variable
require('dotenv').config();

let HOST;
let PORT;
if (process.env.NODE_ENV === 'development') {
  HOST = process.env.DEV_APP_HOST;
  PORT = process.env.DEV_APP_PORT;
}
if (process.env.NODE_ENV === 'test') {
  HOST = process.env.TEST_APP_HOST;
  PORT = process.env.TEST_APP_PORT;
}
if (process.env.NODE_ENV === 'production') {
  HOST = process.env.PROD_APP_HOST;
  PORT = process.env.PROD_APP_PORT;
}

// * Importing database config
const sequelize = require('./config/database');

// * Importing models
const User = require('./models/user');
// TODO

// * Importing routers
const authRoute = require('./routes/auth');
const viewsRoute = require('./routes/views');

// * Importing controllers
const errorController = require('./controllers/error');

// * Initializing express app
const app = express();

// * Template Engine for testing
app.set('view engine', 'ejs');

// * Helmet to protect against well known vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

// * getting real source IP address
app.set('trust proxy', true);

// * Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// * CORS headers setter
app.use(cors());

// * Compress all routes
app.use(compression());

// * Make images folder publicly accessible
app.use('/images', express.static(path.join(__dirname, 'images')));

// * express body-parser settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * Initialize passport
app.use(passport.initialize());
app.use(passport.session());
require('./controllers/auth/googleAuth')(passport);
//require('./controllers/auth/facebookAuth')(passport);

// TODO: Routes

// * Auth Route
app.use(authRoute);

// * Views Route
app.use(viewsRoute);

// * Error Route
app.use(errorController.get404);

// * Defining SQL relationships

// * Initialize sequelize and start service
sequelize
  .sync({ force: process.env.RECREATE_DB })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
