const express = require('express');
const pkg = require('../../../package.json');


function info(req, res) {
    res.json({
        message: 'The server is running!',
        version: pkg.version,
        author: pkg.author,
        repository: pkg.repository.url
    });
}

module.exports = { info };