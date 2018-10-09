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

* Uid or Password Invalid

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_INVALID"
  }
  ```

### ResetPassword

**POST** /std/:uid/passwd/reset

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

**GET** /std/:uid/book/list

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

* Invalid id

  HTTP 422

  ```json
  {
    "message": "INVALID_ID"
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

### Modify

**UPDATE** /std/:uid/book/:id

#### Request

* **reserve_id** string
* **week** int
* **day** string
* **time** int
* **title** string
* **reason** string
* **info** string
* **remark** string

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

### Modify

**DELETE** /std/:uid/book/:id

#### Request

* **reserve_id** string

#### Response

* Success

  HTTP 200

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

* Uid or Password Invalid

  HTTP 422

  ```json
  {
    "message": "UID_OR_PASSWORD_INVALID"
  }
  ```

### ResetPassword

**POST** /tch/:id/passwd/reset

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

### Query

**GET** /tch/:id/:week

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

**GET** /tch/:id/book/list

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

### QueryByReserveId

**GET** /tch/:id/reserve/:id

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

* Invalid id

  HTTP 422

  ```json
  {
    "message": "INVALID_ID"
  }
  ```

### Accept

**POST** /tch/:id/book/:id/accept

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid id

  HTTP 422

  ```json
  {
    "message": "INVALID_ID"
  }
  ```

### Reject

**POST** /tch/book/:id/reject

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid id

  HTTP 422

  ```json
  {
    "message": "INVALID_ID"
  }
  ```

### Arrange

**POST** /tch/:id/:week/:day/arrange

#### Request

* **available** array

#### Response

* Success

  HTTP 200

  ```json
  {
    "message": "OK"
  }
  ```

* Invalid id

  HTTP 422

  ```json
  {
    "message": "INVALID_ID"
  }
  ```

* Unacceptable 

  HTTP 422

  ```json
  {
    "message": "UNACCEPTABLE_OPERATION"
  }
  ```
