const express       = require('express'),
      router        = express.Router(),
      Promotion     = require('../models/promotion');

router.get('/', function(req, res){
    Promotion.find({}, function(err, promoLists){
        if(err){
            console.log(err);
        }else{
            res.render('promotion/promotions.ejs', {promotions: promoLists});
        }
    });
});

router.get('/:id', function(req, res){
    Promotion.findById(req.params.id, function(err, foundPromo){
        if(err){
            console.log(err);
        }else{
            res.render('promotion/promodetail.ejs', {promotions: foundPromo});
        }
    });
});

module.exports = router;