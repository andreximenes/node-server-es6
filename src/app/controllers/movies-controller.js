const express = require('express');

function moviesList(req, res) {
    res.json([
        { name: 'movie 1' },
        { name: 'movie 2' },
        { name: 'movie 3' }
    ]);
}

module.exports = { moviesList };