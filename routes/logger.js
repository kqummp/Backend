"use strict";
/**
 ** Error Logger
 **
 ** @version 0.0.1
 **
 */

var logger = module.exports;
const fs = require('fs');
const path = require('path');
const errlogDirectory = path.join(__dirname, '../log/faillog');
const reqlogDirectory = path.join(__dirname, '../log/reqlog');
const FileStreamRotator = require('file-stream-rotator');
const moment = require('moment');

// create a rotating write stream
var errorLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(errlogDirectory, 'error-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

var requestLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(reqlogDirectory, 'log-%DATE%.log'),
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

logger.logger = function (router, req, err) {
  if (err) {
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
  }

  logger.fileSave(router, req, err);
}

logger.fileSave = function (router, req, err) {
  let date = new Date();
  if (err) {
    let data = `Error in ${router} Router: \n[Error] ${err.message}\nRequest Time: ${date.toLocaleString()}\nRequest Info: \n${req.method} ${req.url}\nBody: \n${JSON.stringify(req.body)}\nQuery: \n${JSON.stringify(req.query)}\nRequest Headers: \n${JSON.stringify(req.headers)}\nRemote IP: ${req.ip}\n\n`;
    fs.appendFile(`${errlogDirectory}/error-${moment().format(dateformat)}.log`, data, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('Request Failure Recorded');
    });

  } else {
    let data = `Success Request ${router} Router: \nRequest Time: ${date.toLocaleString()}\nRequest Info: \n${req.method} ${req.url}\nBody: \n${JSON.stringify(req.body)}\nQuery: \n${JSON.stringify(req.query)}\nRequest Headers: \n${JSON.stringify(req.headers)}\nRemote IP: ${req.ip}\n\n`;
    fs.appendFile(`${reqlogDirectory}/log-${moment().format(dateformat)}.log`, data, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('Success Request Recorded');
    });

  }
}
