var router = require('express').Router();

let Daryl = require('../models/daryl.model')
let Jason = require('../models/jason.model')
let Mea = require('../models/mea.model')
let Kent = require('../models/kent.model')

router.route('/mea').get((req, res) => {
  Mea.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/daryl').get((req, res) => {
  Daryl.find()
  .then(items => res.json(items))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/jason').get((req, res) => {
  Jason.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/kent').get((req, res) => {
  Kent.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));  
})

module.exports = router