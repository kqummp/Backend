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

  let send_data = {
    "message": succ_message,
    "uid": uid
  };

  if (req.session.signin === true && typeof req.session.uid !== "undefined" &&
    typeof req.session.role !== "undefined") {
    logger.logger("/std/login", req);

    res.status(200).jsonp(send_data);
    return;
  }

  req.session.signin = true;
  req.session.uid = uid;
  req.session.role = "std";

  logger.logger("/std/login", req);

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
 ** GET /:uid/reserve/list
 **
 */

router.get('/:uid/reserve/list', async function (req, res) {
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

/**
 ** Book router
 ** POST /std/:uid/book
 **
 */

router.post('/:uid/book', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      session_user = req.session.uid,
      data = req.body;

  data.week = parseInt(data.week);
  data.day = parseInt(data.day);
  data.time = parseInt(data.time);
  data.teacher = parseInt(data.teacher);
  let succ_data;
  try {
    succ_data = await stdmgr.Book(data, session_user, uid);
  } catch (err) {
    logger.logger("/std/" + uid + "/book", req, err);

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

    if (err.message === message.not_complete) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.unavailable) {
      res.status(422).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/" + uid + "/book", req);

  res.status(201).jsonp(succ_data);
});

/**
 ** Modify router
 ** PUT /std/:uid/reserve/:id
 **
 */

router.put('/:uid/reserve/:id', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      reserve_id = req.params['id'],
      session_user = req.session.uid,
      data = req.body;

  data.week = parseInt(data.week);
  data.day = parseInt(data.day);
  data.time = parseInt(data.time);
  data.teacher = parseInt(data.teacher);
  let succ_data;
  try {
    succ_data = await stdmgr.Modify(reserve_id, true, session_user, uid, data);
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

    if (err.message === message.not_complete) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.no_reservation) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.database_error) {
      res.status(500).jsonp(err_message);
      return;
    }

    if (err.message === message.unavailable) {
      res.status(422).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/" + uid + "/reserve/" + reserve_id, req);

  res.status(200).jsonp(succ_data);
});

/**
 ** Modify router
 ** DELETE /std/:uid/reserve/:id
 **
 */

router.delete('/:uid/reserve/:id', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      reserve_id = req.params['id'],
      session_user = req.session.uid;

  let succ_message;
  try {
    succ_message = await stdmgr.Modify(reserve_id, false, session_user, uid);
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

    if (err.message === message.not_complete) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.no_reservation) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.database_error) {
      res.status(500).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/std/" + uid + "/reserve/" + reserve_id, req);
  if (succ_message.message !== message.success) {
    res.sendStatus(500);
    return;
  }

  res.sendStatus(204);
});

module.exports = router;
