const axios = require('axios')

class QuotesController {
  static async random(req, res, next) {
    try {
      const url = 'https://api.quotable.io/random?tags=inspirational|knowledge';
      const response = await axios.get(url);
      const data = response.data;
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuotesController