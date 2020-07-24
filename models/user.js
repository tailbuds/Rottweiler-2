/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */

const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'userId',
  },
  name: {
    type: Sequelize.STRING(135),
    allowNull: false,
    field: 'name',
  },
  email: {
    type: Sequelize.STRING(135),
    allowNull: true,
    field: 'email',
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'emailVerified',
  },
  profileImage: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  //   password: {},
  referralCode: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: () => {
      let hash = 0;
      for (let i = 0; i < this.email.length; i++) {
        hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
      }
      let res = (hash & 0x00ffffff).toString(16).toUpperCase();
      return '00000'.substring(0, 6 - res.length) + res;
    },
  },
  referredBy: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  googleId: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'googleId',
  },
  facebookId: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  createdAt: {
    type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
    allowNull: true,
    field: 'createdAt',
  },
  updatedAt: {
    type:
      'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    allowNull: true,
    field: 'updatedAt',
  },
});

module.exports = { User };
