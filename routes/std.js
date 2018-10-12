const express = require('express');
const router = express.Router();

const stdmgr = require('stdmgr');
const message = require('./message');
const logger = require('./logger');

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
  if (req.session.signin === true && typeof req.session.uid !== "undefined" &&
    typeof req.session.role !== "undefined") {
    res.status(302).redirect('/');
    return;
  }

  let uid = parseInt(req.body.uid),
      passwd = req.body.passwd;
  let succ_message;
  try {
    succ_message = await stdmgr.Login(uid, passwd);
  } catch (err) {
    logger.logger("/std/login", req, err);

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

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/login", req);
  let send_data = {
    "message": succ_message,
    "uid": uid
  };
  req.session.signin = true;
  req.session.uid = uid;
  req.session.role = "std";
  res.status(200).jsonp(send_data);
});

/**
 ** Logout router
 ** POST /logout
 **
 */

router.post('/logout', function (req, res) {
  try {
    req.session.destroy();
  } catch (err) {
    logger.logger("/std/logout", req, err);

    res.sendStatus(500);
    return;
  }

  logger.logger("/std/logout", req);
  res.sendStatus(200);
});

/**
 ** Query router
 ** GET /:uid/:week
 **
 */

router.get('/:uid/:week', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      week = parseInt(req.params['week']);

  let succ_data;
  try {
    succ_data = await stdmgr.Query(week);
  } catch (err) {
    logger.logger("/std/" + uid + "/" + week, req, err);

    let err_message = {
      "message": err.message
    };
    if (err.message === message.invalid_field) {
      res.status(422).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/" + uid + "/" + week, req);

  res.status(200).jsonp(succ_data);
});

/**
 ** QueryList router
 ** GET /:uid/book/list
 **
 */

router.get('/:uid/book/list', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      session_user = req.session.uid;

  let succ_data;
  try {
    succ_data = await stdmgr.QueryList(uid, session_user);
  } catch (err) {
    logger.logger("/std/" + uid + "/book/list", req, err);

    let err_message = {
      "message": err.message
    };
    if (err.message === message.invalid_field) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.no_login) {
      res.status(401).jsonp(err_message);
      return;
    }

    if (err.message === message.not_permitted) {
      res.status(401).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/" + uid + "/book/list", req);

  res.status(200).jsonp(succ_data);
});

/**
 ** queryByResId router
 ** GET /:uid/reserve/:id
 **
 */

router.get('/:uid/reserve/:id', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      reserve_id = req.params['id'],
      session_user = req.session.uid;

  let succ_data;
  try {
    succ_data = await stdmgr.QueryByReserveId(reserve_id, session_user, uid);
  } catch (err) {
    logger.logger("/std/" + uid + "/reserve/" + reserve_id, req, err);

    let err_message = {
      "message": err.message
    };
    if (err.message === message.invalid_field) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.no_login) {
      res.status(401).jsonp(err_message);
      return;
    }

    if (err.message === message.not_permitted) {
      res.status(401).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/" + uid + "/reserve/" + reserve_id, req);

  res.status(200).jsonp(succ_data);
});

module.exports = router;
