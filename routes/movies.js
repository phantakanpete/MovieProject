const express = require('express'),
      router  = express.Router(),
      Movie   = require('../models/movie');
      Comment = require('../models/comment');

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
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
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

router.post('/:id', isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/movies');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.profileimg = req.user.profileimg;
                    comment.save();
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    res.redirect('/movies/'+ foundMovie._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;