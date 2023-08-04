# KanbanZen API Documentation

## Endpoints :

- `POST/user-register`
- `POST/user-login`
- `POST/project-add`
- `POST/project-join`
- `GET/project-show`
- `GET/project-open/:id`
- `GET/task`
- `POST/task`
- `DELETE/task/:id`
- `PATCH/task/:id`

&nbsp;

## 1. POST/user-register
_Request :_ 

+ __body__ 
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created) :_
```json
{
  "id": 1,
  "username": "foo",
  "email": "foo@mail.com"
}
```

_Response (400 - Bad Request) :_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST/user-login
 _Request :_ 

+ __body :__
```json
{
  "email": "string",
  "password": "string"
}
```

 _Response (200 - OK):_
```json
{
  "project_token": "foo.bar"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## 3. POST/project-add

> *** Warn : To add new project you must include your email but remember one email is applicable just for one project. So, you can't use same email to add another project's ***

_Request :_ 

+ __body :__ 
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
+ __headers :__
```json
{
  "project_token": "string"
}
```

_Response (201 - Created) :_
```json
{
  "id": 1,
  "name": "foo",
  "email": "foo@bar.com"
}
```

_Response (400 - Bad Request) :_
```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email must unique"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Passwword is required"
}
OR
{
  "message": "Invalid Email or Password"
}
```
&nbsp;

## 4. POST/project-join

_Request :_

+ __body :__ 
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
+ __headers :__
```json
{
  "project_token": "string"
}
```

_Response (200 - OK) :_
```json
{
  "message": "joining project 'fooBar'"
}
```

_Response (400 - Bad Request) :_
```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email must unique"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Passwword is required"
}
OR
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## 5. GET/project-show
_Request :_

+ __headers :__
```json
{
  "project_token": "string"
}
```

_Response (200 - OK) :_
```json
[
  {
    "id": 1,
    "UserId": 1,
    "ProjectId": 1,
    "createdAt": "2023-08-02T02:14:52.122Z",
    "updatedAt": "2023-08-02T02:14:52.122Z",
    "Project": {
      "id": 1,
      "name": "project 1",
      "email": "project1@mail.com",
      "createdAt": "2023-08-02T02:14:52.056Z",
      "updatedAt": "2023-08-02T02:14:52.056Z"
    }
  }
]
```

&nbsp;

## 6. GET/project-open/:id
_Request :_

+ __headers :__
```json
{
  "project_token": "string"
}
```

_Response (200 - OK) :_
```json
{
  "task_token": "string"
}
```

&nbsp;

## 7. GET/task
_Request :_

+ __headers :__
```json
{
  "project_token": "string",
  "task_token": "string"
}
```

_Response (200 - OK) :_
```json
{
  [
    {
      "id": 1,
      "title": "test task",
      "description": "user 2 task",
      "target": "user 1",
      "deadline": "2023-08-02T07:01:01.080Z",
      "status": "todo",
      "createdAt": "2023-08-02T07:19:32.800Z",
      "updatedAt": "2023-08-02T07:19:32.800Z",
      "ProjectId": 1
    }
  ]
}
```

&nbsp;

## 8. POST/task
_Request :_

+ __headers :__
```json
{
  "project_token": "string",
  "task_token": "string"
}
```

+ __body :__
```json
{
  "title": "string",
  "description": "string",
  "target": "string",
  "deadline": "date",
}
```


_Response (201 - Created) :_
```json
{
  [
    {
      "id": 1,
      "title": "test task",
      "description": "user 2 task",
      "target": "user 1",
      "deadline": "2023-08-02T07:01:01.080Z",
      "status": "todo",
      "createdAt": "2023-08-02T07:19:32.800Z",
      "updatedAt": "2023-08-02T07:19:32.800Z",
      "ProjectId": 1
    }
  ]
}
```

_Response (400 - Bad Request) :_
```json
{
  "message": "Title is required"
}
OR
{
  "message": "Description must unique"
}
OR
{
  "message": "target is required"
}
OR
{
  "message": "Deadline is required"
}
```

&nbsp;

## 9. DELETE/task/:id
_Request :_

+ __headers :__
```json
{
  "project_token": "string",
  "task_token": "string"
}
```

_Response (200 - OK)_
```json
{
  "message": "Deleted task 'foo' "
}
```

_Response (404 - NOT FOUND) :_
```json
{
  "message": "Data is not found"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorizes Action"
}
```

&nbsp;


## 10. PATCH/task/:id
_Request :_

+ __headers :__
```json
{
  "project_token": "string",
  "task_token": "string"
}
```

_Response (200 - OK)_
```json
{
  "message": "Update task 'foo' into progress"
}
```

_Response (404 - NOT FOUND) :_
```json
{
  "message": "Data is not found"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorizes Action"
}
```

&nbsp;



## GLOBAL ERROR
_Response (401 - Unauthorized)_

```json
{
  "message": " Unauthorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
