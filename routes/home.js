const comment = require('../models/comment');

const express       = require('express'),
      router        = express.Router(),
      Movie         = require('../models/movie'),
      Promotion     = require('../models/promotion'),
      Comment       = require('../models/comment'),
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
                req.flash('success', 'Create account completed, now login.');
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
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Welcome to Paradis.',
        failureFlash: 'Invaild username or password'
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
            req.flash('error', 'Something went wrong.');
            res.redirect('/');
        }else{
            Comment.find().where('author.id').equals(foundUser._id).exec(function(err, foundComment){
                if(err){
                    req.flash('error', 'Something went wrong.');
                    res.redirect('/');
                }else{
                    Movie.find({}, function(err, foundMovie){
                        if(err){
                            req.flash('error', 'Something went wrong.');
                            res.redirect('/');
                        }else{
                            res.render('user/profile.ejs', {user: foundUser, comments: foundComment, movie: foundMovie});
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
            console.log(err);
            res.redirect('/');
        }else{
            res.render('user/edit.ejs', {user: foundUser});
        }
    });
});

router.put('/user/:id', upload.single('image'), function(req, res){
    if(req.file){
        req.body.user.profileimg = '/uploads/'+ req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUserInfo){
        if(err){
            req.flash('error', 'Edit failed.');
            res.redirect('/');
        }else{
            // Comment.find({}, function(err, comments){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         if(comments.author.id == req.params.id){
            //             // const update = { author.profileimg: req.body.user.profileimg };
            //             Comment.findOneAndUpdate(comments.author.id, req.body.user.profileimg, function(err, updatedProfile){
            //                 if(err){
            //                     res.redirect('/');
            //                 }else{
            //                     res.redirect('/user/'+req.params.id);
            //                 }
            //             });
            //         }
            //         res.redirect('/user/'+req.params.id);
            //     }
            // });
            req.flash('success', 'Edit success.');
            res.redirect('/user/'+req.params.id);
        }
    });
});

module.exports = router;