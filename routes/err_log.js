"use strict";
/**
 ** Error Logger
 **
 ** @version 0.0.1
 **
 */

var err_log = module.exports;
const fs = require('fs');
const path = require('path');
const logDirectory = path.join(__dirname, '../log/faillog');
const FileStreamRotator = require('file-stream-rotator');
const moment = require('moment');


// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var errorLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

const dateformat = "YYYYMMDD"

/**
 ** Error Logger
 **
 ** @param router
 ** @param err
 ** @param request
 **
 */

err_log.logger = function (router, err, req) {
  console.error(`Error in ${router} Router: `);
  console.error(`[Error] ${err.message}`);
  console.error("Request Info: ");
  console.error(req.method + " " + req.url);
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    console.error("Body: ");
    console.error(req.body);
  } else {
    console.error("Query: ");
    console.error(req.query);
  }
  console.error("Request Headers: ")
  console.error(req.headers);
  console.error(`Remote IP: ${req.ip}`);
  console.error();

  err_log.fileSave(router, err, req);
}

err_log.fileSave = function (router, err, req) {
  let date = new Date();
  let data = `Error in ${router} Router: \n[Error] ${err.message}\nRequest Time: ${date.toLocaleString()}\nRequest Info: \n${req.method} ${req.url}\nBody: \n${JSON.stringify(req.body)}\nQuery: \n${JSON.stringify(req.query)}\nRequest Headers: \n${JSON.stringify(req.headers)}\nRemote IP: ${req.ip}\n\n`;
  fs.appendFile(`${logDirectory}/error-${moment().format(dateformat)}.log`, data, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('Request Failure Recorded');
  });
}
