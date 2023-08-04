function errorHandler(err, req, res, next) {
  console.log(err);
  let code = 500
  let message = 'Internal Server Error'

  if(err.name === 'USERNAME_NULL') {
    code = 400;
    message = 'Username is required'
  } else if(err.name === 'PASSWORD_NULL') {
    code = 400;
    message = 'Password is required'
  } else if(err.name === 'EMAIL_NULL') {
    code = 400;
    message = 'Email is required'
  } else if(err.name === 'INVALID_USER') {
    code = 400;
    message = 'Invalid Email or Password'
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    code = 400
    message = err.errors[0].message
  } else if(err.name === 'NAME_NULL') {
    code = 400;
    message = 'Name is required'
  } else if(err.name === 'PROJECT_NOT_FOUND') {
    code = 404;
    message = 'Data is not found'
  } else if (err.name === 'TOKEN_NULL') {
    code = 401
    message = "Unauthorized"
  } else if (err.name === 'UNAUTHORIZED_ACTION') {
    code = 403
    message = "Unauthorized Action"
  } else if(err.name === 'TITLE_NULL') {
    code = 400;
    message = 'Title is required'
  } else if(err.name === 'DESC_NULL') {
    code = 400;
    message = 'Description is required'
  } else if(err.name === 'TARGET_NULL') {
    code = 400;
    message = 'Target is required'
  } else if(err.name === 'DEADLINE_NULL') {
    code = 400;
    message = 'Deadline is required'
  } else if(err.name === 'STATUS_NULL') {
    code = 400;
    message = 'Status is required'
  } else if(err.name === 'TOKEN_NULL') {
    code = 401;
    message = 'Unauthorized'
  } else if(err.name === 'PREMIUM_TRUE') {
    code = 400;
    message = 'Already be a Premium member'
  } else if(err.name === 'MidtransError') {
    code = 400;
    message = err.ApiResponse.error_messages[0]
  } else if(err.name === 'LIMIT_CREATE') {
    code = 403;
    message = 'Limit has been reached'
  } else if(err.name === 'CODE_NULL') {
    code = 400;
    message = 'Code is required'
  }

  res.status(code).json({ message: message })
}

module.exports = errorHandler