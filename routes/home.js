const express       = require('express'),
      router        = express.Router(),
      Movie         = require('../models/movie'),
      Promotion     = require('../models/promotion'),
      User          = require('../models/user'),
      passport      = require('passport');

router.get('/', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            console.log(err);
        }else{
            Promotion.find({}, function(err, promoLists){
                if(err){
                    console.log(err);
                }else{
                    res.render('home.ejs', {movies: movieLists, promotions: promoLists});
                }
            });
        }
    });
});

router.get('/signup', function(req, res){
    res.render('signup.ejs');
});

router.post('/signup', function(req, res){
    const newUser = new User({username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect('/signup');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/login');
            });
        }
    });
});

router.get('/login', function(req, res){
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(res, res){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;