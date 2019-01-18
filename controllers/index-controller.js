import express from 'express';
let pkg = require(__dirname + '/../package.json');

export let info = (req, res) => {
    res.json({
        message: 'The server is running!',
        version: pkg.version,
        author: pkg.author,
        repository: pkg.repository.url
    });
}