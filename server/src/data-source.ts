import { DataSource } from 'typeorm'
const { database, host, password, user } = require('./configs/mysql')

export const AppDataSource = new DataSource({
	type: 'mysql', // 数据库类型
	host, // 连接域名
	port: 3306, // 连接端口
	username: user, // 用户名
	password, // 密码
	database, // 数据库名
	logging: false, // 是否有日志
	synchronize: true, // 是否自动建表
	entities: [__dirname + '/entities/*{.ts,.Error}'], // entity/model存放位置
	timezone: 'z', // 以本地时区时间为主
	subscribers: [],
	migrations: []
})