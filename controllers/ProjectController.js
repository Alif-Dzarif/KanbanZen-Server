const { Project, UserProject, User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/web-token')
const { generateCode } = require('../helpers/random-code')

class ProjectController {
  static async add(req, res, next) {
    try {
      const data = await UserProject.findAll({ where: { UserId: req.userData.id } })

      if(data.length > 4 && req.userData.premium === false) throw { name: 'LIMIT_CREATE' }
      else {
        const { name, password } = req.body
        const code =  generateCode()

        if(!name) throw { name: 'NAME_NULL' }
        if(!password) throw { name: 'PASSWORD_NULL' }
  
        const data = await Project.create({ name, code, password });
        if(!data) throw { name: "CREATE_ERROR" }
        else {
          await UserProject.create({ UserId: req.userData.id, ProjectId: data.id })
  
          const project = {
            id: data.id,
            name: data.name
          }
  
          res.status(201).json(project)
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async join(req, res, next) {
    try {
      const { code, password } = req.body;

      if(!code) throw { name: 'CODE_NULL' }
      if(!password) throw { name: 'PASSWORD_NULL' }

      const data = await Project.findOne({ where: { code: code } })

      if(!data) throw { name: 'PROJECT_NOT_FOUND' }
      else {
        const check = bcrypt.compare(password, data.password)
        if(!check) throw { name: 'INVALID_PROJECT' }
        else {
          await UserProject.create({ UserId: req.userData.id, ProjectId: data.id })

          res.status(200).json({ message: `joining project '${data.name}'` })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async show(req, res, next) {
    try {
      const data = await UserProject.findAll({ where: { UserId: req.userData.id }, include: [{
          model: Project,
          attributes: { exclude: ["password"] },
        }] 
      })

      if(!data) throw { name: 'PROJECT_NOT_FOUND' }
      else {
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async open(req, res, next) {
    try {
      const { id } = req.params
      const { dataValues } = await UserProject.findOne({ where: { UserId: req.userData.id, ProjectId: id } })

      if(!dataValues) throw { name: 'PROJECT_NOT_FOUND' }
      else {
        const payload = {
          id: dataValues.ProjectId
        }
        const token = generateToken(payload)
        res.status(200).json({ task_token: token })
      }
    } catch (err) {
      next(err)
    }
  }

  static async out(req, res, next) {
    try {
      const { id } = req.params
      let get_project;

      const data = await UserProject.findByPk( id, { include: [{
          model: Project,
          attributes: { exclude: ["password"] },
        }]
      })

      if(data.UserId === req.userData.id) {
        get_project = data.Project.name
        await UserProject.destroy({ where: { id: id } })
        res.status(200).json({ message: `you leave from project '${get_project}'` })
      } else {
        throw { name: 'UNAUTHORIZED_ACTION' }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProjectController