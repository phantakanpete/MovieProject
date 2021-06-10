const express = require('express'),
      router  = express.Router(),
      Cinema  = require('../models/cinema');

router.get('/', function(req, res){
    Cinema.find({}, function(err, cinemaLists){
        if(err){
            console.log(err);
        }else{
            res.render('cinema/cinemas.ejs', {cinema: cinemaLists});
        }
    });
});

module.exports = router; 
    