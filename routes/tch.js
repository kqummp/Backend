const express = require('express');
const router = express.Router();

const tchmgr = require('tchmgr');
const message = require('./message');
const err_log = require('./err_log');

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
    err_log.logger("/tch/login", err, req);

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
    "message": succ_message
  };
  req.session.signin = true;
  req.session.uid = uid;
  req.session.role = "tch";
  res.status(200).jsonp(send_data);
});

module.exports = router;
