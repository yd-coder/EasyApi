const { SECRET_KEY } = require('../config/index')

const expressJWT = require('express-jwt')
const express = require('express')
const praseToken = express()
const { TOKEN_PATCH } = require('../config/index')

// 解析token
praseToken.use(
    expressJWT.expressjwt(
        { secret: SECRET_KEY, algorithms: ["HS256"] }
    ).unless({
        path: TOKEN_PATCH,
    })
)


module.exports = {
    praseToken
}