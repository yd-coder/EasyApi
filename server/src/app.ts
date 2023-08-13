import 'reflect-metadata'
import { AppDataSource } from './data-source'
const express = require('express')
const projectRoute = require('./routes/Project')
const interfaceRoute = require('./routes/Interface')

const app = express()

AppDataSource.initialize()
	.then(async () => {
		app.use(express.json())

		app.use('/project', projectRoute)
		app.use('/interface', interfaceRoute)

		app.listen(5000, () => {
			console.log('express服务器启动成功，请访问 http://localhost:5000')
		})
	})
	.catch((error) => console.log('TypeOrm连接失败', error))
