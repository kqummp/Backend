const express = require('express');
const router = express.Router();

const stdmgr = require('stdmgr');
const message = require('./message');

// handle uncaughtExpection
const Layer = require('express/lib/router/layer');

Object.defineProperty(Layer.prototype, 'handle', {
  enumerable: true,
  get() {
    return this.__handle;
  },
  set(fn) {
    if (fn.length === 4) {
      this.__handle = fn;
    } else {
      this.__handle = (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);
    }
  },
});

/**
 ** Login router
 ** POST /login
 ** Request uid, passwd
 **
 */

router.post('/login', async function (req, res) {
  if (req.session.signin === true && typeof req.session.uid !== "undefined") {
    res.status(302).redirect('/');
    return;
  }

  let uid = parseInt(req.body.uid),
      passwd = req.body.passwd;
  let succ_message;
  try {
    succ_message = await stdmgr.Login(uid, passwd);
  } catch (err) {
    console.error("Error in /std/login Router: ")
    console.error("[Error] " + err.message);
    console.error("Request Info: ");
    console.error(req.body);
    console.error(req.headers);
    console.error();

    let err_message = {
      "message": err.message
    };
    if (err.message === message.uid_or_password_invalid) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.uid_or_password_error) {
      res.status(422).jsonp(err_message);
      return;
    }
  }

  let send_data = {
    "message": succ_message
  };
  req.session.signin = true;
  req.session.uid = uid;
  res.status(200).jsonp(send_data);
});

module.exports = router;
