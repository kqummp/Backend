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

  let send_data = {
    "message": succ_message,
    "uid": uid
  };

  if (req.session.signin === true && typeof req.session.uid !== "undefined" &&
    typeof req.session.role !== "undefined") {
    logger.logger("/tch/login", req);

    res.status(200).jsonp(send_data);
    return;
  }

  req.session.signin = true;
  req.session.uid = uid;
  req.session.role = "tch";

  logger.logger("/tch/login", req);

  res.status(200).jsonp(send_data);
});

/**
 ** Passwd Modify router
 ** POST /:uid/passwd/modify
 ** Request uid, old_passwd, new_passwd, new_passwd_r
 **
 */

router.post('/:uid/passwd/modify', async function (req, res) {
  let uid = parseInt(req.body.uid),
      old_passwd = req.body.old_passwd,
      new_passwd = req.body.new_passwd,
      new_passwd_r = req.boay.new_passwd_r;

  let succ_message;
  try {
    succ_message = await tchmgr.ResetPassword(uid, old_passwd, new_passwd, new_passwd_r);
  } catch (err) {
    logger.logger("/tch/" + uid + "/passwd/modify", req, err);

    let err_message = {
      "message": err.message
    };
    if (err.message === message.uid_or_password_invalid) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.repeat_not_same) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.not_modified) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.database_error) {
      res.status(500).jsonp(err_message);
      return;
    }

    if (err.message === message.uid_or_password_error) {
      res.status(422).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/tch/" + uid + "/passwd/modify", req);
  res.status(200).jsonp(succ_message);
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
    logger.logger("/tch/logout", req, err);

    res.sendStatus(500);
    return;
  }

  let send_data = {
    "message": "OK"
  };
  logger.logger("/tch/logout", req);
  res.status(200).jsonp(send_data);
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
    succ_data = await tchmgr.Query(week);
  } catch (err) {
    logger.logger("/tch/" + uid + "/" + week, req, err);

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

  logger.logger("/tch/" + uid + "/" + week, req);

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
    succ_data = await tchmgr.QueryList(uid, session_user);
  } catch (err) {
    logger.logger("/tch/" + uid + "/book/list", req, err);

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

  logger.logger("/tch/" + uid + "/book/list", req);

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
    succ_data = await tchmgr.QueryByReserveId(reserve_id, session_user, uid);
  } catch (err) {
    logger.logger("/tch/" + uid + "/reserve/" + reserve_id, req, err);

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

  logger.logger("/tch/" + uid + "/reserve/" + reserve_id, req);

  res.status(200).jsonp(succ_data);
});

/**
 ** Accept router
 ** PATCH /:uid/reserve/:id/accept
 **
 */

router.patch('/:uid/reserve/:id/accept', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      reserve_id = req.params['id'],
      session_user = req.session.uid;

  let succ_message;
  try {
    succ_message = await tchmgr.Accept(reserve_id, session_user, uid);
  } catch (err) {
    logger.logger("/tch/" + uid + "/reserve/" + reserve_id + "/accept", req, err);

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

    if (err.message === message.accepted) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.rejected) {
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

  logger.logger("/tch/" + uid + "/reserve/" + reserve_id + "/accept", req);

  let send_data = {
    "message": "OK"
  };

  res.status(200).jsonp(send_data);
});

/**
 ** Reject router
 ** PATCH /:uid/reserve/:id/reject
 ** Request reject_reason
 **
 */

router.patch('/:uid/reserve/:id/reject', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      reserve_id = req.params['id'],
      reject_reason = req.body.reject_reason,
      session_user = req.session.uid;

  let succ_message;
  try {
    succ_message = await tchmgr.Reject(reserve_id, reject_reason, session_user, uid);
  } catch (err) {
    logger.logger("/tch/" + uid + "/reserve/" + reserve_id + "/reject", req, err);

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

    if (err.message === message.accepted) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.rejected) {
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

  logger.logger("/tch/" + uid + "/reserve/" + reserve_id + "/reject", req);

  let send_data = {
    "message": "OK"
  };

  res.status(200).jsonp(send_data);
});


/**
 ** Cancel router
 ** PATCH /:uid/reserve/:id/cancel
 ** Request reject_reason
 **
 */

router.patch('/:uid/reserve/:id/cancel', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      reserve_id = req.params['id'],
      cancel_reason = req.body.cancel_reason,
      session_user = req.session.uid;

  let succ_message;
  try {
    succ_message = await tchmgr.Cancel(reserve_id, cancel_reason, session_user, uid);
  } catch (err) {
    logger.logger("/tch/" + uid + "/reserve/" + reserve_id + "/cancel", req, err);

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

    if (err.message === message.canceled) {
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

  logger.logger("/tch/" + uid + "/reserve/" + reserve_id + "/cancel", req);

  let send_data = {
    "message": "OK"
  };

  res.status(200).jsonp(send_data);
});

/**
 ** Arrange router
 ** POST /:uid/:week/:day/arrange
 **
 */

router.post('/:uid/:week/:day/arrange', async function (req, res) {
  let uid = parseInt(req.params['uid']),
      week = parseInt(req.params['week']),
      day = parseInt(req.params['day']),
      available = req.body.available,
      session_user = req.session.uid;

  let data = {
    "week": week,
    "day": day,
    "available": available
  }

  let succ_message;
  try {
    succ_message = await tchmgr.Arrange(session_user, uid, data);
  } catch (err) {
    logger.logger("/tch/" + uid + "/" + week + "/" + day + "/arrange", req, err);

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

    if (err.message === message.out_of_range) {
      res.status(422).jsonp(err_message);
      return;
    }

    if (err.message === message.unacceptable) {
      res.status(409).jsonp(err_message);
      return;
    }

    if (err.message === message.database_error) {
      res.status(500).jsonp(err_message);
      return;
    }

    res.status(400).jsonp(err_message);
    return;
  }

  logger.logger("/tch/" + uid + "/" + week + "/" + day + "/arrange", req);

  let send_data = {
    "message": "OK"
  };

  res.status(200).jsonp(send_data);
});

module.exports = router;
