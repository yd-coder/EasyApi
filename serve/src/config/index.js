// 定义常量


// jwt秘钥
const SECRET_KEY = 'easyApi2023'

// token解析忽略文件路径
const TOKEN_PATCH = ["/login","/register"]

module.exports = {
    SECRET_KEY,
    TOKEN_PATCH
}