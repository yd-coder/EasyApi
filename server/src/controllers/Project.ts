const getManager = require('typeorm')
const Project = require('../entities/Project')
const { ApiResponse } = require('../utils/response')

async function create(req, res) {
	const { logo, title, subTitle, summarize } = req.params
	const projectRepository = getManager().getRepository(Project)
	const findProject = await projectRepository.findOne({ where: { title } })
	let business_code: number = 0
	let business_msg: string = ''
	let business_data = { isLogin: false }

	if (findProject) {
		business_msg = '项目已存在，请重新创建'
	} else {
		const saveProject = new Project()
		saveProject.id = saveProject.logo = logo || ''
		saveProject.title = title
		saveProject.subTitle = subTitle || ''
		saveProject.summarize = summarize || ''
		saveProject.createdAt = new Date()
		await projectRepository.save(saveProject)
		business_msg = '项目创建成功'
	}

	res.send(new ApiResponse({ business_code, business_msg, business_data }))
}

async function modify(req, res) {
	const { logo, title, subTitle, summarize } = req.params
	const projectRepository = getManager().getRepository(Project)
	const findProject = await projectRepository.findOne({ where: { title } })
	let business_code: number = 0
	let business_msg: string = ''
	let business_data = { isLogin: false }

	if (!findProject) {
		business_msg = '项目不存在'
	} else {
		findProject.logo = logo
		findProject.title = title
		findProject.subTitle = subTitle
		findProject.summarize = summarize
		findProject.updatedAt = new Date()
		await projectRepository.save(findProject)
		business_msg = '项目信息修改成功'
	}

	res.send(new ApiResponse({ business_code, business_msg, business_data }))
}

async function remove() {}

export { create, modify, remove }
