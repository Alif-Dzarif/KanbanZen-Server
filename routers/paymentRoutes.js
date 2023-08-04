const router = require('express').Router()
const PaymentController = require('../controllers/PaymentController')

router.post('/generate-payment-token', PaymentController.create)

module.exports = router