
const express = require('express')
var router = express.Router()
var db = require('../models/activities')
const exjwt = require('express-jwt')

// Instantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: process.env.APP_TOKEN_SECRET
});

/////////////////////////////////////////////////////////////////////////////////////////////
// API Activity => /api/activity/

router.get('/', jwtMW, (req, res) => {
  db.getActivityAll(req.body, res)
})

router.get('/:id', (req, res) => {
  db.getActivity(req.params, res)
})

router.get('/user/:id', jwtMW, (req, res) => {
  db.getActivityUser(req.params, res)
})

router.get('/user/:id/:status', jwtMW, (req, res) => {
  db.getActivityType(req.params, res)
})

router.get('/user/:id/:status/exception', jwtMW, (req, res) => {
  db.getActivityTypeExcept(req.params, res)
})

router.post('/', jwtMW, (req, res) => {
  db.newActivity(req.body, res)
})

router.put('/:id', jwtMW, (req, res) => {
  db.updateActivity(req, res)
})

/////////////////////////////////////////////////////////////////////////////////////////////
// EXTREAMLY DANGEROUS, USE THIS WISELY

router.delete('/ever/:id', jwtMW, (req, res) => {
  db.deleteActivity(req.params, res)
})

router.delete('/all/ever', jwtMW, (req, res) => {
  db.deleteActivityAll(req.params, res)
})

module.exports = router