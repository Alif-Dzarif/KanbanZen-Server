const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.patch('/premium-access', UserController.premium)

module.exports = router