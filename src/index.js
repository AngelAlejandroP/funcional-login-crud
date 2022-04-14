const express=require('express');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const path=require('path');
/*mensajes*/ const flash=require('connect-flash'); /*requiere express-session*/
//  log
const session=require('express-session');
const MySQLStore=require('express-mysql-session');//para guardar la session en la bd
const passport=require('passport');
// mensajes
const {database}=require('./keys');

//  Initialization
const app=express();
require('./lib/passport'); //para login

//  Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//  Middlewares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)// para guardar la session en la bd
}));
app.use(flash()); // mensajes
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//  log
app.use(passport.initialize());
app.use(passport.session());

//  Global variables
app.use((req, res, next) => {
    /*mensajes*/
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    // para obtener los datos del usuario y puedan ser accedidas de cualquier lugar 
    app.locals.user=req.user;
    next();
});

//  Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//  Public
app.use(express.static(path.join(__dirname, 'public')));

//  Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));
});