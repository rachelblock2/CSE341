const path = require('path');

const express = require('express');

const rootDir = require('../helpers/path');

const Router = express.Router();

Router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = Router;