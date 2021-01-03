"use strict"
import http from "http";
import url from "url";
const hostname = "localhost"
const port = 3000

function start(route, handler) {
    http
        .createServer(onRequest)
        .listen(port, onStart)

    function onRequest(request, response) {
        console.log("Request for: " + request.url)
        console.log("HTTP Method: " + request.method)

        let pathname = url.parse(request.url).pathname
        route(pathname, handler, request, response)
    }
}

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}

//Public API
const _start = start
export { _start as start }