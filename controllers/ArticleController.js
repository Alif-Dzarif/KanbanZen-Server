const axios = require('axios')

class ArticleController {
  static async article(req, res, next) {
    try {
      const api = process.env.APIKEY
      const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${api}`;
      const response = await axios.get(url);
      const data = response.data;
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ArticleController