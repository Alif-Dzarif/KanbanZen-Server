const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')

router.get('/articles', ArticleController.article)

module.exports = router