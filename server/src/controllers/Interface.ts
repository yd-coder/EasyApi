import { AppDataSource } from '../data-source'

// const { getManager } = require('typeorm')
const { Interface } = require('../entities/Interface')
const { ApiResponse } = require('../utils/response')

async function check(req, res) {
	const { id } = req.body
	const interfaceRepository = AppDataSource.getRepository(Interface)
	const allInterface = await interfaceRepository.find({ where: { id } })
	console.log('allInterface', allInterface)
	let business_code: number = 0
	let business_msg: string = ''
	let business_data = { isCreate: false }
	const result = new ApiResponse({
		business_code,
		business_msg,
		business_data
	}).toJSON()
	console.log('result', result)
	res.send(result)
}

async function create(req, res) {
	const {
		path,
		title,
		desc,
		method,
		params,
		state,
		catalog,
		tags,
		revision,
		owner,
		leader,
		createPerson
	} = req.body
	let business_code: number = 0
	let business_msg: string = ''
	let business_data = { isCreate: false }

	// try {
	const saveInterface = new Interface()
	// saveInterface.id = id || ""
	saveInterface.path = path || ''
	saveInterface.title = title || ''
	saveInterface.desc = desc || ''
	saveInterface.method = method || ''
	saveInterface.params = params || ''
	saveInterface.state = state || 0
	saveInterface.catalog = catalog || ''
	saveInterface.tags = tags || []
	saveInterface.revision = revision || ''
	saveInterface.owner = owner || ''
	saveInterface.leader = leader || ''
	saveInterface.createPerson = createPerson || ''
	saveInterface.createdAt = new Date().getTime()
	const photoRepository = AppDataSource.getRepository(Interface)
	await photoRepository.save(saveInterface)
	// await projectRepository.save(saveInterface)
	business_msg = '接口创建成功'
	business_data.isCreate = true
	// } catch (error) {
	// 	business_msg = "接口创建失败"
	// }

	const result = new ApiResponse({
		business_code,
		business_msg,
		business_data
	}).toJSON()
	console.log('result', result)
	res.send(result)
}

async function modify(req, res) {
	// const { logo, title, subTitle, summarize } = req.params
	// const projectRepository = getManager().getRepository(Project)
	// const findProject = await projectRepository.findOne({ where: { title } })
	// let business_code: number = 0
	// let business_msg: string = ""
	// let business_data = { isLogin: false }
	//
	// if (!findProject) {
	// 	business_msg = "项目不存在"
	// } else {
	// 	findProject.logo = logo
	// 	findProject.title = title
	// 	findProject.subTitle = subTitle
	// 	findProject.summarize = summarize
	// 	findProject.updatedAt = new Date()
	// 	await projectRepository.save(findProject)
	// 	business_msg = "项目信息修改成功"
	// }
	// res.send(new ApiResponse({ business_code, business_msg, business_data }))
}

async function remove() {}

export { check, create, modify, remove }
