var router = require('express').Router();

//import your models/schemas here
//sample: 
let Archive = require('../models/archive.model');

router.route('/').post((req, res) => { // bale pag pumunta ka sa "http://localhost:5000/cities/",
                                      // eto yung ieexcute niya na function
  //put your function here
  //example below:
  Archive.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});