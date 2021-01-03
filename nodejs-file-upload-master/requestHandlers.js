"use strict"
import { readFile, writeFile, unlink, createReadStream } from 'fs'
import pkg from 'formidable';
const { IncomingForm } = pkg;
import util from 'util'

function start(request, response) {
    console.log('Request handler start was called')
    let fileName = './index.html'
    responseHTML(response, fileName)
}

function upload(request, response) {
    console.log('Request handler upload was called')

    var form = new IncomingForm();
    form.parse(request, function (error, fields, files) {
        //console.log(util.inspect({fields: fields, files: files}));
        if(files.image) {
            readFile(files.image.path, function onReturn(error, data) {
                if (error) throw error
                writeFile('./uploaded-files/test.png', data, function (error) {
                    if (error) throw error
                    unlink(files.image.path)
                })
            })
        }
    });

    let fileName = "./showImage.html"
    responseHTML(response, fileName)
}

function showImage(request, response) {
    console.log('Request handler showImage was called')
    response.setHeader('Content-Type', 'application/JSON')
    createReadStream('./uploaded-files/test.json').pipe(response)
}

function responseHTML(response, fileName) {
    readFile(fileName, 'utf8', function onReturn(error, data) {
        if(error) throw error
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        response.write(data)
        response.end()
    })
}

const _start = start
const _upload = upload
const _showImage = showImage
export { _start as start, _upload as upload, _showImage as showImage }