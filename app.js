const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        Movie           = require('./models/movie'),
        Promotion       = require('./models/promotion'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        zeedDB          = require('./zeed');
        
const   homeRoutes      = require('./routes/home'),
        movieRoutes     = require('./routes/movies'),
        commentRoutes   = require('./routes/comments'),
        promoRoutes     = require('./routes/promotions');

mongoose.connect('mongodb://localhost/moviesProject');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//zeedDB();

app.use(require('express-session')({
    secret: 'secret man it is secret.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/', homeRoutes);
app.use('/movies', movieRoutes);
app.use('/movies/:id/comments', commentRoutes);

app.get('/cinemas', function(req, res){
    res.render('cinemas.ejs');
});

app.use('/promotions', promoRoutes);

app.get('/news', function(req, res){
    res.render('news/news.ejs');
});

app.listen('4800', function(){
    console.log('Server is running...');
});