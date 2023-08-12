import 'reflect-metadata'
import { AppDataSource } from './data-source'
const express = require('express')
// const projectRoute = require('./routes/Project');
const interfaceRoute = require('./routes/Interface')
const userRoute = require('./routes/User')

const app = express()

// 导入控制器模块
// const project_controller = require('./controllers/Project')
// const interface_controller = require('./controllers/Interface')

AppDataSource.initialize()
	.then(async () => {
		app.use(express.json())

		// app.use('/project', projectRoute)
		// router.post('/create', project_controller.create)
		// router.post('/modify', project_controller.modify)
		// router.post('/remove', project_controller.remove)
		// router.post('/find', project_controller.find)

		app.use('/interface', interfaceRoute)
		// router.post('/interface/create', interface_controller.create)
		// router.post('/modify', interface_controller.modify)
		// router.post('/remove', interface_controller.remove)

		app.use('/user', userRoute)

		// 目前 登录注册测了，解析token与获取id没有测试，应该是没有问题的，有问题直接call me

		// 在所有页面都可以获取id：let userId = await getUserOnlyId(req.auth)

		app.listen(5000, () => {
			console.log('express服务器启动成功，请访问 http://localhost:5000')
		})
	})
	.catch((error) => console.log('TypeOrm连接失败', error))
