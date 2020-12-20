
const express = require('express')
var router = express.Router()
const multer = require('multer')
var db = require('../models/users')
const exjwt = require('express-jwt')
const crypto = require("crypto")
var path = require('path')

// Instantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: process.env.APP_TOKEN_SECRET
});

const storageUsers = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/users/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + req.params.id + path.extname(file.originalname));
  }
})

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb({ message: 'Only for images (jpg/png).' }, false)
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////
// CONSTANT LIST

const CIPHER_SECRET = process.env.APP_CIPHER_SECRET
const CIPHER_BASE = process.env.APP_CIPHER_BASE
const HASH_ALGORITHM = process.env.APP_HASH_ALGORITHM

/////////////////////////////////////////////////////////////////////////////////////////////
// API Users => /api/users/

router.get('/', jwtMW, (req, res) => {
  db.getUserAll(req.body, res)
})

router.get('/:id', (req, res) => {
  db.getUser(req.params, res)
})

router.get('/search/:id', (req, res) => {
  db.getUserSearch(req.params, res)
})

router.post('/', (req, res) => {
  const password = crypto.createHmac(HASH_ALGORITHM, CIPHER_SECRET).update(req.body.password).digest(CIPHER_BASE);
  db.newUser(req.body, password, res)
})

router.put('/:id', jwtMW, (req, res) => {
  db.updateUser(req, res)
})

router.put('/password/:id', jwtMW, (req, res) => {
  req.body.password = crypto.createHmac(HASH_ALGORITHM, CIPHER_SECRET).update(req.body.new).digest(CIPHER_BASE);
  req.body.password_old = crypto.createHmac(HASH_ALGORITHM, CIPHER_SECRET).update(req.body.old).digest(CIPHER_BASE);
  db.updateUserPassword(req, res)
})

router.put('/photo/:id', jwtMW, (req, res) => {
  var upload = multer({
    storage: storageUsers,
    limits: {
      fileSize: 1 * 1024 * 1024
    },
    fileFilter: fileFilter
  }).single('profile_photo')
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(err)
      return
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(err)
      return
    } else if (req.file == undefined) {
      res.send('index', { message: 'No file selected!' })
      return
    }
    // Everything went fine.
    console.log('Upload success.')

    // File name key used while in production and filename in development
    req.body.photo = req.file.filename

    db.updateUserPhoto(req, res)
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////
// EXTREAMLY DANGEROUS, USE THIS WISELY

router.delete('/:id', jwtMW, (req, res) => {
  db.deactivateUser(req.params, res)
})

router.delete('/ever/:id', jwtMW, (req, res) => {
  db.deleteUser(req.params, res)
})

router.delete('/all/ever', jwtMW, (req, res) => {
  db.deleteUserAll(req.params, res)
})

module.exports = router