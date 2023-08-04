const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/web-token')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body

      if(!username) throw { name: 'USERNAME_NULL' }
      if(!email) throw { name: 'EMAIL_NULL' }
      if(!password) throw { name: 'PASSWORD_NULL' }
      
      const data =  await User.create({ username, email, password })

      const user = {
        id: data.id,
        username: data.username,
        email: data.email
      }

      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      
      if(!email) throw { name: 'EMAIL_NULL' }
      if(!password) throw { name: 'PASSWORD_NULL' }

      const user = await User.findOne({ where: { email: email } })

      if(!user) throw { name: 'INVALID_USER' }
      else {
        const check = bcrypt.compare(password, user.password)

        if(!check) throw { name: 'INVALID_USER' }
        else {
          const payload = {
            id: user.id
          }

          const token = generateToken(payload)

          res.status(200).json({ project_token: token })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async info(req, res, next) {
    try {
      const data =  req.userData

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async premium(req, res, next) {
    try {
      if(req.userData.premium === true) throw { name: 'PREMIUM_TRUE' }
      else {
        await User.update({ premium: true }, { where: { id: req.userData.id } })
  
        res.status(200).json({ message: `User with id ${req.userData.id} status updated to be premium` })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController