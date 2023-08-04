//1．导入mysql模块
const mysql = require('mysql2')

// 2．建立与MySQL数据库的连接
const db = mysql.createConnection({
    host:'localhost',//数据库的IP地址
    user:'root',//登录数据库的账号
    password:'123456',//登录数据库的密码
    database:'easyapi',//指定要操作哪个数据库
})

module.exports ={
    db
}