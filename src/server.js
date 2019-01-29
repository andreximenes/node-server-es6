const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
var jwt = require('jsonwebtoken');


// Import Routes
const indexController = require('./app/controllers/index-controller');
const usersRoute = require('./app/routes/users-route');
const moviesRoute = require('./app/routes/movies-route');

// Load enviroment variables in .env files
dotenv.config();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION + process.env.DATABASE_NAME, { useNewUrlParser: true });


// Server express config
const app = express();
app.set('secretKey', 'nodeRestApi');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes (these routes are just examples)
app.get(['/', '/server'], indexController.info);
app.use('/users', usersRoute);
app.use('/movies', validateUser, moviesRoute);


function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ url: req.originalUrl, message: " Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});


// redirect uri errors to custom message
// app.use((req, res) => {
//     res.status(404).send({ url: req.originalUrl + ' not found' })
// });

// Application Start
app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;