const userModel = require('../models/user');

const { validationResult } = require('express-validator');

exports.registerUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      NEW USER (no results retrieved)
  //        a. Hash password
  //        b. Create user
  //        c. Redirect to login page
  //      EXISTING USER (match retrieved)
  //        a. Redirect user to login page with error message.

  // 3. If INVALID, redirect to register page with errors

  // res.redirect('/login');

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, email, password } = req.body;

    userModel.getOne({ email: email }, (err, result) => {
      if (result) {
        console.log(result);
        // found a match, return to login with error
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } else {
        // no match, create user (next step)
        // for now we redirect to the login with no error.
        res.redirect('/login');
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/register');
  }
};

exports.loginUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      EXISTING USER (match retrieved)
  //        a. Check if password matches hashed password in database
  //        b. If MATCH, save info to session and redirect to home
  //        c. If NOT equal, redirect to login page with error
  //      UNREGISTERED USER (no results retrieved)
  //        a. Redirect to login page with error message

  // 3. If INVALID, redirect to login page with errors
  res.redirect('/');
};

exports.logoutUser = (req, res) => {
  // Destroy the session and redirect to login page
  res.redirect('/login');
};
