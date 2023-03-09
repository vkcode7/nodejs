//spin a web server
//core modules - http, https, fs, path, os
//http - launch a server, send requests
//https - launch a SSL server

//var, let, const
//for header docs look at https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

/*
Node JS runs on a main thread (single javascript thread) but internally it uses 2 thread pools - 
one for event loop (timers, polls, I/O callbacks) and another for worker threads (file I/O etc)

createServer() event never ends
*/

const http = require('http'); //global module so no path needed
//const http = require('./http'); <- looks for local file http.js
const routes = require('./routes.js'); //.js can be omitted

console.log(routes.someText);

/*
function reqListener(req, res) {

}

http.createServer(reqListener);
*/



//using anonymous function
/*
const server = http.createServer((req, res) => {

});
*/

const server = http.createServer(routes.handler);


//console.log(server);

server.listen(3000); //port no 3000
