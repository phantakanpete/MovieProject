const express = require('express'),
      router  = express.Router(),
      Cinema  = require('../models/cinema');

router.get('/', function(req, res){
    Cinema.find({}, function(err, cinemaLists){
        if(err){
            req.flash('error', 'Something went wrong.');
        }else{
            res.render('cinema/cinemas.ejs', {cinema: cinemaLists});
        }
    });
});

module.exports = router; 
    