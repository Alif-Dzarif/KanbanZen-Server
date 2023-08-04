const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController.js')
const UserController = require('../controllers/UserController.js')

router.get('/user-info', UserController.info)
router.post('/project-add', ProjectController.add)
router.post('/project-join', ProjectController.join)
router.get('/project-show', ProjectController.show)
router.get('/project-open/:id', ProjectController.open)
router.delete('/project-leave/:id', ProjectController.out)

module.exports = router