/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */

const express = require('express');

const router = express.Router();

//Login Page Route
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

module.exports = router;
