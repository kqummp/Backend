# API Document

## StudentManagement

### Login

**POST** /api/std/login

#### Request

* **uid** int
* **passwd** string

#### Response

* Success

  ```json
  {
    "code": 2000,
    "message": "OK"
  }
  ```

* Uid or Password error

  ```json
  {
    "code": 4220,
    "message": "UID_OR_PASSWORD_ERROR"
  }
  ```

* Uid or Password Invalid

  ```json
  {
    "code": 4060,
    "message": "UID_OR_PASSWORD_INVALID"
  }
  ```

### ResetPassword

**POST** /api/std/passwdreset

#### param

* **uid** int
* **old_passwd** string
* **new_passwd** string
* **new_passwd_r** string

#### return

* Success

  ```json
  {
    "code": 2000,
    "message": "OK"
  }
  ```

* Uid or Password error

  ```json
  {
    "code": 4220,
    "message": "UID_OR_PASSWORD_ERROR"
  }
  ```

* Uid or Password or New Password Invalid

  ```json
  {
    "code": 4060,
    "message": "UID_OR_PASSWORD_OR_NEW_PASSWORD_INVALID"
  }
  ```

* New Repeat Password not Same

  ```json
  {
    "code": 4221,
    "message": "NEW_REPEAT_PASSWORD_NOT_SAME"
  }
  ```

* New Password same as old one

  ```json
  {
    "code": 4222,
    "message": "NEW_PASSWORD_SAME_AS_OLD_ONE"
  }
  ```

### Query

**GET** /api/std/query

#### param

* **week** int

#### return

* Success

  ```json
  {
    "code": 2000,
    "message": "OK",
    "data": [
      {
        "date": "2018/09/16",
        "day": "Sunday",
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

  ```json
  {
    "code": 4060,
    "message": "INVALID_FIELD"
  }
  ```

### QueryByReserveId

**GET** /api/std/querybyid

#### param

* **reserve_id** string

#### return

* Success

  ```json
  {
    "code": 2000,
    "message": "OK",
    "data": {
      "week": 1,
      "day": "2018/09/16",
      "time": 2,
      "title": "sth",
      "reason": "sth",
      "info": "sth",
      "remark": "sth"
    },
    "user": "std1"
  }
  ```

* Permission Denied

  ```json
  {
    "code": 4030,
    "message": "PERMISSION_DENIED"
  }
  ```

* Invalid id

  ```json
  {
    "code": 4220,
    "message": "INVALID_ID"
  }
  ```

### Book

**POST** /api/std/book

#### param

* **week** int
* **day** string
* **time** int
* **title** string
* **reason** string
* **info** string
* **remark** string

#### return

* Success

  ```json
  {
    "code": 2000,
    "message": "OK",
    "reserve_id": "$oid"
  }
  ```

* Uncompleted form

  ```json
  {
    "code": 4220,
    "message": "UNCOMPLETED_FORM"
  }
  ```

* Invalid Field

  ```json
  {
    "code": 4060,
    "message": "INVALID_FIELD"
  }
  ```

### Modify

**POST** /api/std/modify

#### param

* **reserve_id** string
* **operation** bool
* *if operation is true, the following field is required*
  - **week** int
  - **day** string
  - **time** int
  - **title** string
  - **reason** string
  - **info** string
  - **remark** string

#### return

* Success

  ```json
  {
    "code": 2000,
    "message": "OK",
    "reserve_id": "$oid"
  }
  ```

* Uncompleted form

  ```json
  {
    "code": 4220,
    "message": "UNCOMPLETED_FORM"
  }
  ```

* Invalid Field

  ```json
  {
    "code": 4060,
    "message": "INVALID_FIELD"
  }
  ```
