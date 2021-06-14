const express = require('express'),
      router  = express.Router(),
      Cinema  = require('../models/cinema');

router.get('/', function(req, res){
    Cinema.find({}, function(err, cinemaLists){
        if(err){
            req.flash('error', 'Something went wrong.');
            res.redirect('/');
        }else{
            res.render('cinema/cinemas.ejs', {cinema: cinemaLists});
        }
    });
});

module.exports = router; 
    