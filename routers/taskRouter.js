const router = require('express').Router()
const TaskController = require('../controllers/TaskController')

router.get('/task', TaskController.show)
router.post('/task', TaskController.add)
router.delete('/task/:id', TaskController.delete)
router.patch('/task/:id', TaskController.edit)

module.exports = router