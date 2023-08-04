const { verifyToken } = require('../helpers/web-token')
const { User } = require('../models')

// User Authentication
function Authentication(req, res, next) {
  try {
    const { project_token } = req.headers
    
    if(!project_token) throw { name: "TOKEN_NULL" }
    else {
      const data = verifyToken(project_token)
  
      User.findByPk(data.id) 
        .then((data) => {
          req.userData = {
            id: data.id,
            username: data.username,
            email: data.email,
            premium: data.premium
          }
          next()
        })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = Authentication