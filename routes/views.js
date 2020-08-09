/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com> and Richa Tiwary <richatiwary1911@gmail.com>
 * Inquiry and support: dev@tailbuds.com
 */

const express = require('express');

const router = express.Router();

// * Login Page Route
router.get('/login', (req, res, next) => {
  res.render('login', { user: req.user });
});

router.get('/loginpage', (req, res, next) => {
  res.render('loginPage');
});

// * Home Page Route
router.get('', (req, res, next) => {
  res.render('home');
});

// * Signup Page Route
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

module.exports = router;
