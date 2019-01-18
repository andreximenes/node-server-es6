'use strict';

import express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

// Import Controllers
import * as indexController from './controllers/index-controller';

// Load enviroment variables in .env file
dotenv.config();

// Server express config
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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