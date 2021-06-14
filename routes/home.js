const express       = require('express'),
      router        = express.Router(),
      Movie         = require('../models/movie'),
      Promotion     = require('../models/promotion'),
      Comment       = require('../models/comment'),
      Favourite     = require('../models/favourite'),
      Bill          = require('../models/bill'),
      Showtime          = require('../models/showtime'),
      User          = require('../models/user'),
      multer        = require('multer'),
      path          = require('path'),
      storage       = multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/uploads/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                    }
      }),
      imagefilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Your image file type is not allowed!'), false);
            }
            callback(null, true);
      },
      upload        = multer({storage: storage, fileFilter: imagefilter}),
      passport      = require('passport');

//home
router.get('/', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            req.flash('error', err.message);
            res.redirect('/');
        }else{
            Promotion.find({}, function(err, promoLists){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/');
                }else{
                    res.render('home.ejs', {movies: movieLists, promotions: promoLists});
                }
            });
        }
    });
});

//search
router.get('/search', function(req, res){
    Movie.findOne({name: req.query.keyword}).populate('comments').exec(function(err, foundMovie){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            Favourite.find({movie: foundMovie._id}, function(err, foundFavourite){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/movies');
                }else{
                    res.render('movie/moviedetail.ejs', {movies: foundMovie, favourite: foundFavourite});
                }
            });
        }
    });
});

//login,signup
router.get('/signup', function(req, res){
    res.render('signup.ejs');
});

router.post('/signup', function(req, res){
    const newUser = new User({username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            res.redirect('/signup');
        }else{
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Welcome to Paradis.');
                res.redirect('/');
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
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Welcome to Paradis.',
        failureFlash: 'Invaild username or password.'
    }), function(res, res){
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You have logged out.');
    res.redirect('/');
});

//userinfo
router.get('/user/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'Something went wrong.')
            res.redirect('/');
        }else{
            Comment.find().where('author.id').equals(foundUser._id).exec(function(err, foundComment){
                if(err){
                    req.flash('error', 'Something went wrong.');
                    res.redirect('/');
                }else{
                    Movie.find({}).populate('comments').exec(function(err, foundMovie){
                        if(err){
                            req.flash('error', 'Something went wrong.');
                            res.redirect('/');
                        }else{
                            Favourite.find({user: foundUser._id}, function(err, foundFavourite){
                                if(err){
                                    req.flash('error', 'Something went wrong.')
                                    res.redirect('/');
                                }else{
                                    Bill.find().where('user.id').equals(foundUser._id).exec(function(err, foundBill){
                                        if(err){
                                            req.flash('error', 'Something went wrong.')
                                            res.redirect('/');
                                        }else{
                                            foundBill.sort((a, b) => (a.time > b.time) ? -1 : 1);
                                            res.render('user/profile.ejs', {user: foundUser, comments: foundComment, movies: foundMovie, favourite: foundFavourite, bill: foundBill});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get('/user/edit/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', err.message);
            res.redirect('/');
        }else{
            res.render('user/edit.ejs', {user: foundUser});
        }
    });
});

//updateuserinfo
router.put('/user/:id', upload.single('image'), function(req, res){
    if(req.file){
        req.body.user.profileimg = '/uploads/'+ req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUserInfo){
        if(err){
            req.flash('error', 'Edit failed.');
            res.redirect('/');
        }else{
            req.flash('success', 'Edit success.');
            res.redirect('/user/'+req.params.id);
        }
    });
});

router.get('/bill/:id/:showtime', function(req, res){
    Bill.findById(req.params.id, function(err, foundBill){
        if(err){
            req.flash('error', err.message);
            res.redirect('/');
        }else{
            Showtime.findById(req.params.showtime, function(err, foundShowtime){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/'); 
                }else{
                    res.render('ticket/bill.ejs', {bill: foundBill, showtime: foundShowtime});
                }
            });
        }
    });
});

module.exports = router;