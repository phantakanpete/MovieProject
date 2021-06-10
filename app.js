const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        flash           = require('connect-flash'),
        methodOverride  = require('method-override'),
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
        cinemaRoutes    = require('./routes/cinemas'),
        promoRoutes     = require('./routes/promotions');

mongoose.connect('mongodb://localhost/moviesProject');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

zeedDB();

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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', homeRoutes);
app.use('/movies', movieRoutes);
app.use('/movies/:id/comments', commentRoutes);
app.use('/cinemas', cinemaRoutes);
app.use('/promotions', promoRoutes);

app.listen('4800', function(){
    console.log('Server is running...');
});