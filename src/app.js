const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// Settings
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev')); // MORGAN ES UN MIDDLEWARE 
app.use(express.urlencoded({ extended: false })); //con este método entendemos lo que viene de los formularios

// Routes
app.use(require('./routes/index'))

//Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send('404 not found');
})

module.exports = app;