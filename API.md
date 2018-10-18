# API Document

## StudentManagement

### Login

**POST** /std/login

#### Request

* **uid** int
* **passwd** string

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "uid": 2017220301024
  }
  ```

* Uid or Password error

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_ERROR"
  }
  ```

* Uid or Password Invalid

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_INVALID"
  }
  ```

### ResetPassword

**POST** /std/:uid/passwd/modify

#### Request

* **old_passwd** string
* **new_passwd** string
* **new_passwd_r** string

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Uid or Password error

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_ERROR"
  }
  ```

* Uid or Password or New Password Invalid

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_OR_NEW_PASSWORD_INVALID"
  }
  ```

* New Repeat Password not Same

  HTTP 422

  ```json
  {
    "message": "NEW_REPEAT_PASSWORD_NOT_SAME"
  }
  ```

* New Password same as old one

  HTTP 422

  ```json
  {
    "message": "NEW_PASSWORD_SAME_AS_OLD_ONE"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

### Logout

**POST** /std/logout

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Unknown Error

  HTTP 500

### Query

**GET** /std/:uid/:week

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "data": [
      {
        "week": 2,
        "day": 1,
        "available": [1, 2, 4, 6, 8],
        "reserved": [3, 7],
        "unavailable": [5]
      },
      {
        "...": "..."
      }
    ]
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

### List

**GET** /std/:uid/reserve/list

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "data": [{
      "week": 1,
      "day": 2,
      "time": 2,
      "timestamp": 123123123,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth"
    },
    {
      "week": 1,
      "day": 2,
      "time": 3,
      "timestamp": 123123123,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth"
    }],
    "user": 2017220301024
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Invaild Field

    HTTP 422

    ```json
    {
      "message": "INVALID_FIELD"
    }
    ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

### QueryByReserveId

**GET** /std/:uid/reserve/:id

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "data": {
      "week": 1,
      "day": 2,
      "time": 2,
      "timestamp": 123123123,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth"
    },
    "user": 2017220301024
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

### Book

**POST** /std/:uid/book

#### Request

* **week** int
* **day** string
* **time** int
* **title** string
* **reason** string
* **info** string
* **remark** string
* **teacher** int

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "reserve_id": "$oid"
  }
  ```

* Uncompleted form

  HTTP 422

  ```json
  {
    "message": "UNCOMPLETED_FORM"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Unavailable

  HTTP 422

  ```json
  {
    "message": "TIME_UNAVAILABLE"
  }
  ```

### Modify

**PUT** /std/:uid/reserve/:id

#### Request

* **week** int
* **day** string
* **time** int
* **title** string
* **reason** string
* **info** string
* **remark** string
* **teacher** int

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "reserve_id": "$oid"
  }
  ```

* Uncompleted form

  HTTP 422

  ```json
  {
    "message": "UNCOMPLETED_FORM"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```


* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Unavailable

  HTTP 422

  ```json
  {
    "message": "TIME_UNAVAILABLE"
  }
  ```

* No Reservation

  HTTP 422

  ```json
  {
    "message": "RESERVATION_NOT_EXIST"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

### Modify

**DELETE** /std/:uid/reserve/:id

#### Response

* Success

  HTTP 204

  ```json
  {
    "message": "OK",
  }
  ```

* Uncompleted form

  HTTP 422

  ```json
  {
    "message": "UNCOMPLETED_FORM"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```


* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* No Reservation

  HTTP 422

  ```json
  {
    "message": "RESERVATION_NOT_EXIST"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

## TeacherManagement

### Login

**POST** /tch/login

#### Request

* **uid** int
* **passwd** string

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "uid": 1000000
  }
  ```

* Uid or Password error

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_ERROR"
  }
  ```

* Uid or Password Invalid

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_INVALID"
  }
  ```

### Logout

**POST** /std/logout

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Unknown Error

  HTTP 500

### ResetPassword

**POST** /tch/:uid/passwd/modify

#### Request

* **old_passwd** string
* **new_passwd** string
* **new_passwd_r** string

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Uid or Password error

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_ERROR"
  }
  ```

* Uid or Password or New Password Invalid

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_OR_NEW_PASSWORD_INVALID"
  }
  ```

* New Repeat Password not Same

  HTTP 422

  ```json
  {
    "message": "NEW_REPEAT_PASSWORD_NOT_SAME"
  }
  ```

* New Password same as old one

  HTTP 422

  ```json
  {
    "message": "NEW_PASSWORD_SAME_AS_OLD_ONE"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

### Query

**GET** /tch/:uid/:week

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "data": [
      {
        "date": 2,
        "day": 1,
        "available": [1, 2, 4, 6, 8],
        "reserved": [3, 7],
        "unavailable": [5]
      },
      {
        "...": "..."
      }
    ]
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

### List

**GET** /tch/:uid/reserve/list

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "data": [{
      "week": 1,
      "day": 2,
      "time": 2,
      "timestamp": 123123123,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth",
      "user": 2017220301024
    },
    {
      "week": 1,
      "day": 2,
      "time": 3,
      "timestamp": 123123123,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth",
      "user": 2017220301024
    }],
    "user": 100000
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

### QueryByReserveId

**GET** /tch/:uid/reserve/:id

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK",
    "data": {
      "week": 1,
      "day": 2,
      "time": 2,
      "timestamp": 123123123,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth"
    },
    "user": 100000
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
   ```

### Accept

**PATCH** /tch/:uid/reserve/:id/accept

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

* Accepted

  HTTP 422

  ```json
  {
    "message": "ACCEPTED"
  }
  ```

* Rejected

  HTTP 422

  ```json
  {
    "message": "REJECTED"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

### Reject

**PATCH** /tch/:uid/reserve/:id/reject

#### Request

* **reject_reason** string

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

* Accepted

  HTTP 422

  ```json
  {
    "message": "ACCEPTED"
  }
  ```

* Rejected

  HTTP 422

  ```json
  {
    "message": "REJECTED"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

### Cancel

**PATCH** /tch/:uid/reserve/:id/cancel

#### Request

* **cancel_reason** string

#### Response

* Success

  HTTP 204

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

### Arrange

**POST** /tch/:uid/:week/:day/arrange

#### Request

* **available** array

#### Response

* Success

  HTTP 201

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid Field

  HTTP 422

  ```json
  {
    "message": "INVALID_FIELD"
  }
  ```

* Unacceptable

  HTTP 409

  ```json
  {
    "message": "UNACCEPTABLE_OPERATION"
  }
  ```

* No Login

  HTTP 401

  ```json
  {
    "message": "NOT_LOGINED_YET"
  }
  ```

* Permission Denied

  HTTP 401

  ```json
  {
    "message": "PERMISSION_DENIED"
  }
  ```

* Database Error

  HTTP 500

  ```json
  {
    "message": "DATABASE_ERROR"
  }
  ```

* Out of Range

  HTTP 422

  ```json
  {
    "message": "OUT_OF_RANGE"
  }
  ```
