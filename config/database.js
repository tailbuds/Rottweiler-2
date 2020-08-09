/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com> and Richa Tiwary <richatiwary1911@gmail.com>
 * Inquiry and support: dev@tailbuds.com
 */

const Sequelize = require('sequelize');

const config = require('./config');

// * Importing environment variable
require('dotenv').config();

let dbConfig;

if (process.env.NODE_ENV === 'development') {
  dbConfig = config.development;
}
if (process.env.NODE_ENV === 'test') {
  dbConfig = config.test;
}
if (process.env.NODE_ENV === 'production') {
  dbConfig = config.production;
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    // logging: false,
  }
);

module.exports = sequelize;
