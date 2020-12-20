
const express = require('express')
var router = express.Router()
var db = require('../models/accounts')
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt')
const crypto = require("crypto")

// Instantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: process.env.APP_TOKEN_SECRET
});

const SECRET = process.env.APP_TOKEN_SECRET

/////////////////////////////////////////////////////////////////////////////////////////////
// CONSTANT LIST

const CIPHER_SECRET = process.env.APP_CIPHER_SECRET
const CIPHER_BASE = process.env.APP_CIPHER_BASE
const HASH_ALGORITHM = process.env.APP_HASH_ALGORITHM

/////////////////////////////////////////////////////////////////////////////////////////////
// API Accounts => /api/accounts/

router.post('/login', (req, res) => {
  const { email } = req.body;
  const password = crypto.createHmac(HASH_ALGORITHM, CIPHER_SECRET).update(req.body.password).digest(CIPHER_BASE);

  db.cekLogin(email, password, function (err, data) {
    if (data.length === 1) {
      //If all credentials are correct do this
      let token = jwt.sign({
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        photo: data[0].photo,
        registered: data[0].registered,
        updated: data[0].updated
      }, SECRET, { expiresIn: 43210 }); // Sigining the token
      res.json({
        success: true,
        err: null,
        token
      });
    }
    else {
      res.json({
        success: false,
        token: null,
        err: 'Username or password is incorrect'
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////
// API List

router.post('/check-user-registered', (req, res) => {
  db.checkUserRegistered(req.body, res);
})

module.exports = router