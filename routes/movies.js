const express = require('express'),
      router  = express.Router(),
      Movie   = require('../models/movie');

router.get('/', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            console.log(err);
        }else{
            res.render('movie/movies.ejs', {movies: movieLists});
        }
    });
});

router.get('/:id', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else{
            res.render('movie/moviedetail.ejs', {movies: foundMovie});
        }
    });
});

router.get('/showtime/:id', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else{
            res.render('movie/movieshowtime.ejs', {movies: foundMovie});
        }
    });
});

module.exports = router;