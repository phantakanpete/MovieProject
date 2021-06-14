const express       = require('express'),
      router        = express.Router(),
      Movie         = require('../models/movie'),
      Comment       = require('../models/comment'),
      Theatre       = require('../models/theatre'),
      Showtime      = require('../models/showtime'),
      Bill          = require('../models/bill'),
      Favourite     = require('../models/favourite'),
      middleware    = require('../middleware');

//movielists
router.get('/', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            req.flash('error', err.message);;
            res.redirect('/');
        }else{
            movieLists.sort((a, b) => (a.reldate > b.reldate) ? -1 : 1);
            res.render('movie/movies.ejs', {movies: movieLists});
        }
    });
});

//sortby..
router.get('/sortByname', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            req.flash('error', err.message);
            res.redirect('/');
        }else{
            movieLists.sort((a, b) => (a.name > b.name) ? 1 : -1);
            res.render('movie/sortByname.ejs', {movies: movieLists});
        }
    });
});

router.get('/sortByrate', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            req.flash('error', err.message);
            res.redirect('/');
        }else{
            movieLists.sort((a, b) => (a.rate > b.rate) ? 1 : -1);
            res.render('movie/sortByrate.ejs', {movies: movieLists});
        }
    });
});

router.get('/sortBygenre', function(req, res){
    Movie.find({}, function(err, movieLists){
        if(err){
            req.flash('error', err.message);
            res.redirect('/');
        }else{
            res.render('movie/sortBygenre.ejs', {movies: movieLists});
        }
    });
});

//moviedetails
router.get('/:id', function(req, res){
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
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

//movieshowtime
router.get('/showtime/:id', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            Theatre.find({}).populate(['movie', 'cinema']).exec(function(err, foundTheatre){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/movies');
                }else{
                    Showtime.find({}).populate('theatre').exec(function(err, foundShowtime){
                        if(err){
                            req.flash('error', err.message);
                            res.redirect('/movies');
                        }else{
                            foundShowtime.sort((a, b) => (a.time > b.time) ? 1 : -1); 
                            res.render('movie/movieshowtime.ejs', {movies: foundMovie, theatre: foundTheatre, showtime: foundShowtime});
                        }
                    });
                }
            });
        }
    });
});

//showmovieseats
router.get('/showtime/:id/:theatre/:showtime', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            Theatre.findById(req.params.theatre).populate(['movie', 'cinema']).exec(function(err, foundTheatre){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/movies');
                }else{
                    Showtime.findById(req.params.showtime).populate('theatre').exec(function(err, foundShowtime){
                        if(err){
                            req.flash('error', err.message);
                            res.redirect('/movies');
                        }else{
                            res.render('ticket/showseat.ejs', {movies: foundMovie, theatre: foundTheatre, showtime: foundShowtime});
                        }
                    });
                }
            });
        }
    });
});

//paymentpage
router.get('/ticketing/:id', middleware.isLoggedIn, function(req, res){
    Showtime.findById(req.params.id, function(err, foundShowtime){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            let seatselect = req.query.seatselect;
            res.render('ticket/payment.ejs', {showtime: foundShowtime, seatselect: seatselect});
        }
    });
});

//post bill after payment
router.post('/ticketing/:id', function(req, res){
    let seatselected = req.body.seatselect;
    let seatArr = seatselected.split(',');
    seatArr.forEach(function(seatselect){
        Showtime.updateOne({ _id: req.params.id, "seats.name": seatselect},{ $set: {"seats.$.status": "Disabled"}}, function(err, updateSeat){
            if(err){
                req.flash('error', err.message);
                res.redirect('/movies');
            }else{
                console.log(updateSeat);
            }
        });
    });
    
    Bill.create(req.body.user, function(err, bill){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            bill.user.id = req.user._id;
            bill.user.username = req.user.username;
            bill.user.firstname = req.user.firstname;
            bill.user.lastname = req.user.lastname;
            bill.user.email = req.user.email;
            bill.payment.creditno = req.body.creditno;
            bill.payment.exp = req.body.exp;
            bill.payment.cvv = req.body.cvv;
            bill.payment.nameoncard = req.body.nameoncard;
            bill.time = new Date();
            bill.payment.ptype = req.body.paymentMethod;
                
            let seatselected = req.body.seatselect;
            let seatArr = seatselected.split(',');
            seatArr.forEach(function(seatselect){
                bill.seatselect.push(seatselect);
            }); 

            bill.totalprice = req.body.sumprice;
            bill.showtime = req.params.id;
            bill.save();
            req.flash('success', 'Your payment is succeed, enjoy.');
            res.redirect('/');
        }
    });
});

//add comment in movie
router.post('/:id', middleware.isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/movies');
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.profileimg = req.user.profileimg;
                    comment.save();
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    req.flash('success', 'Add comment succeed.');
                    res.redirect('/movies/'+ foundMovie._id);
                }
            });
        }
    });
});

router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        }else{
            res.render('comment/editcomment.ejs', {movie_id: req.params.id, comment: foundComment});
        }
    });
});

//edit comment
router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        }else{
            req.flash('success', 'You have edited your comment.');
            res.redirect('/movies');
        }
    });
});

//delete comment
router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        }else{
            req.flash('success', 'You have deleted your comment.');
            res.redirect('/movies');
        }
    });
});


//add to favourite
router.post('/:id/favourite', middleware.isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            Favourite.create(req.body.movies, function(err, favourite){
                if(err){
                    req.flash('error', err.message);
                }else{
                    favourite.movie = foundMovie._id;
                    favourite.user = req.user._id;
                    favourite.save();
                    req.flash('success', 'Add to favourite succeed.');
                    res.redirect('/movies/'+ foundMovie._id);
                }
            });
        }
    });
});
//delete from favourite
router.delete('/:id/favourite', middleware.isLoggedIn, function(req, res){
    Favourite.findOneAndRemove({movie: req.params.id, user: req.user._id}, function(err){
        if(err){
            req.flash('error', err.message);
            res.redirect('/movies');
        }else{
            req.flash('success', 'Remove from favourite succeed.');
            res.redirect('/movies/' + req.body.movies);
        }
    });
});

module.exports = router;