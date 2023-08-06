const { Task } = require('../models')

class TaskController {
  static async show(req, res, next) {
    try {
      const data = await Task.findAll({ where: { ProjectId: req.projectData.id } })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    try {
      const { title, description, target } = req.body

      if(!title) throw { name: 'TITLE_NULL' }
      if(!description) throw { name: 'DESC_NULL' }
      if(!target) throw { name: 'TARGET_NULL' }

      const data = await Task.create({ 
        title, 
        description, 
        target, 
        status: 'todo',
        ProjectId: req.projectData.id 
      })

      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const data = await Task.findByPk(id)
      let title;

      if(!data) throw { name: 'PROJECT_NOT_FOUND' }
      else {
        if(data.ProjectId === req.projectData.id) {
          title = data.title;
          await Task.destroy({ where: { id: id } })
          res.status(200).json({ message: `Deleted task '${title}' ` })
        } else {
          throw { name: 'UNAUTHORIZED_ACTION' }
        } 
      }
    } catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    try {
      const { status } = req.body
      const { id } = req.params
      let title;

      if(!status) throw { name: "STATUS_NULL" }
      const data = await Task.findByPk(id)

      if(!data) throw { name: 'PROJECT_NOT_FOUND' }
      else {
        if(data.ProjectId === req.projectData.id) {
          title = data.title
          const task = await Task.update({ status: status }, { where: { id: id } })
          res.status(200).json({ message: `Update task '${title}' into ${status}` })
        } else {
          throw { name: 'UNAUTHORIZED_ACTION' }
        } 
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TaskController