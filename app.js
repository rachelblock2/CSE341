const http = require('http');

const routes = require('./routes');

// function reqListener(req, res) {

// }

// http.createServer(reqListener);

const server = http.createServer(routes);
// const server = http.createServer((req, res) => {
//     // console.log(req.url, req.method, req.headers);    
// });


server.listen(3000);