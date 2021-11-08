import jwt from 'jsonwebtoken'

class TokenServise {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET)
  }
}

export default new TokenServise();