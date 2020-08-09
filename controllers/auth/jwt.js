/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com> and Richa Tiwary <richatiwary1911@gmail.com>
 * Inquiry and support: dev@tailbuds.com
 */

const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-api-key'];
  if (!token) {
    return res.status(403).send({
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const verify = { verifyToken: verifyToken };

module.exports = verify;
