const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

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
app.use(express.urlencoded({enxtended: false}));

// GLOBAL VARIABLES

// ROUTES
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;