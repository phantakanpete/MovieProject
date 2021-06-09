const express = require('express'),
      router  = express.Router(),
      Movie   = require('../models/movie'),
      Comment = require('../models/comment'),
      middleware = require('../middleware');

router.get('/', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            console.log(err);
        }else{
            res.render('movie/movies.ejs', {movies: movieLists});
        }
    });
});

router.get('/sortByname', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            console.log(err);
        }else{
            movieLists.sort((a, b) => (a.name > b.name) ? 1 : -1);
            res.render('movie/sortByname.ejs', {movies: movieLists});
        }
    });
});

router.get('/sortByrate', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            console.log(err);
        }else{
            movieLists.sort((a, b) => (a.rate > b.rate) ? 1 : -1);
            res.render('movie/sortByrate.ejs', {movies: movieLists});
        }
    });
});

router.get('/sortBygenre', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            console.log(err);
        }else{
            res.render('movie/sortBygenre.ejs', {movies: movieLists});
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

//add comment in movie
router.post('/:id', middleware.isLoggedIn, function(req, res){
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
                    req.flash('success', 'Create comment succeed.');
                    res.redirect('/movies/'+ foundMovie._id);
                }
            });
        }
    });
});

module.exports = router;