const { verifyToken } = require('../helpers/web-token')
const { Project } = require('../models')
function ProjectAuth(req, res, next) {
  try {
    const { task_token } = req.headers
    
    if(!task_token) throw { name: "TOKEN_NULL" }
    else {
      const data = verifyToken(task_token)
  
      Project.findByPk(data.id) 
        .then((data) => {
          req.projectData = {
            id: data.id,
            code: data.code
          }
          next()
        })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = ProjectAuth