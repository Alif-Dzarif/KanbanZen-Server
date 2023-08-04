const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign(payload, process.env.SIGNATURE)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SIGNATURE)
}

module.exports = { generateToken, verifyToken }