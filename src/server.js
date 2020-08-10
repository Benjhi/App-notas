const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

// INITIALIZATIONS
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
   defaultLayout: 'main',
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   extname: '.hbs'
}));
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({enxtended: false}));
app.use(methodOverride('_method'));
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   next();
});

// ROUTES
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;