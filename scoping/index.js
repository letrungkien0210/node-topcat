'use strict';

var http = require('http');

var pageviews = 0;

var server = http.createServer(function(request, response) {
    response.end(`<!DOCTYPE html>
    <body style="text-align: center; font-family: sans-serif;">
        <h1>The Cat Gif Page</h1>
        <p>We have served up ${++pageviews} amazing cat gifs.</p>
        <img src="http://thecatapi.com/api/images/get?format=src&type=gif">
    </body>`);
});

server.listen(8000);

console.log('Server listening at http://localhost:8000');