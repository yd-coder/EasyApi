const express = require('express')
const app = express()

const { login } = require('./service/login/index')
const { corsOrigin } = require('./utils/cors')
const { praseToken } = require('./utils/token')


// 配置跨域
app.use(corsOrigin)
// 解析token
app.use(praseToken)
// 解析传来的body数据，获取数据可以通过req.body.~~
app.use(express.json())
app.use(login)

// 目前 登录注册测了，解析token与获取id没有测试，应该是没有问题的，有问题直接call me

// 在所有页面都可以获取id：let userId = await getUserOnlyId(req.auth)


app.listen(5000, ()=>{
    console.log("express服务器启动成功,端口号:5000");
})