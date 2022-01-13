// const http = require('http');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use((req, res, next) => {
//     console.log('In the middleware!');
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
});

// const routes = require('./routes');

// function reqListener(req, res) {

// }

// http.createServer(reqListener);

// const server = http.createServer(app); //routes
// // const server = http.createServer((req, res) => {
// //     // console.log(req.url, req.method, req.headers);    
// // });


// server.listen(3000);

app.listen(3000);