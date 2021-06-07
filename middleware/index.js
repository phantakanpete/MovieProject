const Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.id, function(err, foundComment){
            if(err){
                req.flash('error', 'No comment found.');
                res.redirect('back');
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error', 'You are not allowed to do this action.');
                    res.redirect('back');
                } 
            }
        });
    }else{
        req.flash('error', 'You must sign in first.');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to sign in first to do this action.');
    res.redirect('/login');
}

module.exports = middlewareObj;