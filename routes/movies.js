const user = require('../models/user');

const express = require('express'),
      router  = express.Router(),
      Movie   = require('../models/movie'),
      Comment = require('../models/comment'),
      Theatre  = require('../models/theatre'),
      Showtime  = require('../models/showtime'),
      User       = require('../models/user'),
      Bill       = require('../models/bill'),
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
            Theatre.find({}).populate(['movie', 'cinema']).exec(function(err, foundTheatre){
                if(err){
                    console.log(err);
                }else{
                    Showtime.find({}).populate('theatre').exec(function(err, foundShowtime){
                        if(err){
                            console.log(err);
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

router.get('/showtime/:id/:theatre/:showtime', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else{
            Theatre.findById(req.params.theatre).populate(['movie', 'cinema']).exec(function(err, foundTheatre){
                if(err){
                    console.log(err);
                }else{
                    Showtime.findById(req.params.showtime).populate('theatre').exec(function(err, foundShowtime){
                        if(err){
                            console.log(err);
                        }else{
                            res.render('ticket/showseat.ejs', {movies: foundMovie, theatre: foundTheatre, showtime: foundShowtime});
                        }
                    });
                }
            });
        }
    });
});

//payment
router.get('/ticketing/:id', middleware.isLoggedIn, function(req, res){
    Showtime.findById(req.params.id, function(err, foundShowtime){
        if(err){
            console.log(err);
            res.redirect('/movies');
        } else {
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
                console.log(err);
            } else {
                console.log(updateSeat);
            }
        });
    });
    
    Bill.create(req.body.user, function(err, bill){
        if(err) {
            console.log(err);
        } else {
            bill.user.id = req.user._id;
            bill.user.username = req.user.username;
            bill.user.firstname = req.user.firstname;
            bill.user.lastname = req.user.lastname;
            bill.user.email = req.user.email;
            bill.payment.creditno = req.body.creditno;
            bill.payment.exp = req.body.exp;
            bill.payment.cvv = req.body.cvv;
            bill.payment.nameoncard = req.body.nameoncard;
            let credittype = req.body.paymentMethod;
            for(i = 0; i < credittype.length; i++) {
                if(credittype[i].checked){
                    bill.payment.ptype = credittype[i].value;
                }
            }
            let seatselected = req.body.seatselect;
            let seatArr = seatselected.split(',');
            seatArr.forEach(function(seatselect){
                bill.seatselect.push(seatselect);
            }); 
            bill.totalprice = req.body.sumprice;
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
                    req.flash('success', 'Add comment succeed.');
                    res.redirect('/movies/'+ foundMovie._id);
                }
            });
        }
    });
});

module.exports = router;