const midtransClient = require('midtrans-client');

class PaymentController {
  static async create(req, res, next) {
    try {
      if(req.userData.premium === true) throw { name: 'PREMIUM_TRUE' }
        else {
          let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : process.env.MIDTRANSKEY
          });

          let parameter = {
            "transaction_details": {
                "order_id": "TRANSACTION-" + Math.floor(1000000 + Math.random() * 9898989),
                "gross_amount": process.env.PRICES
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "email": req.userData.email
            }
          };

          const midtransToken = await snap.createTransaction(parameter)
          res.status(201).json(midtransToken);
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PaymentController