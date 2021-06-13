const   express     = require('express'),
        router      = express.Router({mergeParams: true}),
        Movie       = require('../models/movie'),
        Comment     = require('../models/comment');

// router.get('/new',isLoggedIn, function(req, res){
//     Movie.findById(req.params.id, function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("comment/new.ejs", {movie: foundMovie});
//         }
//     });    
// });

// router.post('/', isLoggedIn, function(req, res){
//     Movie.findById(req.params.id, function(err, foundMovie){
//         if(err){
//             console.log(err);
//             res.redirect('/movies');
//         } else {
//             Comment.create(req.body.comment, function(err, comment){
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     comment.author.id = req.user._id;
//                     comment.author.username = req.user.username;
//                     comment.author.profileimg = req.user.profileimg;
//                     comment.save();
//                     foundMovie.comments.push(comment);
//                     foundMovie.save();
//                     res.redirect('/movies/'+ foundMovie._id);
//                 }
//             });
//         }
//     });
// });

module.exports = router;         