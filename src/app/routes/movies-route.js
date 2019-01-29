const express = require('express');
const moviesController = require('../controllers/movies-controller');
const router = express.Router();

router.get('/list', moviesController.moviesList);

module.exports = router;