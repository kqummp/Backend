const express = require('express');
const router = express.Router();

const tchmgr = require('tchmgr');
const message = require('./message');
const logger = require('./logger');

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
    succ_message = await tchmgr.Login(uid, passwd);
  } catch (err) {
    logger.logger("/tch/login", req, err);

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

  logger.logger("/tch/login", req);
  let send_data = {
    "message": succ_message,
    "uid": uid
  };
  req.session.signin = true;
  req.session.uid = uid;
  req.session.role = "tch";
  res.status(200).jsonp(send_data);
});

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

module.exports = router;
