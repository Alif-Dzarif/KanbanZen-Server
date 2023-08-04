const random_code = require('randomstring')

function generateCode() {
  return random_code.generate()
}

module.exports = { generateCode }