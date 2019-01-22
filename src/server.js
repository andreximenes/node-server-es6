const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Import Routes
const indexController = require('./app/controllers/index-controller');
const usersRoute = require('./app/routes/users-route');

// Load enviroment variables in .env files
dotenv.config();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node_rest_api', { useNewUrlParser: true }); 


// Server express config
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRoute);

/* 
 Routes 
 (these routes are just examples)
*/
app.get('/', (req, res) => { res.redirect('/server-info')})
app.get('/server-info', indexController.info);


// redirect uri errors to custom message
app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// Application Start
app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;