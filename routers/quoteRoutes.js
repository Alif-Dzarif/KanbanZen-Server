const router = require('express').Router()
const QuotesController = require('../controllers/QuoteController')

router.get('/quotes', QuotesController.random)

module.exports = router