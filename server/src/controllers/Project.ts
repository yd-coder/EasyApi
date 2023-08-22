import { AppDataSource } from '../data-source'
import { Interface } from '../entities/Interface'
const { Project } = require('../entities/Project')
const { ApiResponse } = require('../utils/response')

async function find(projectId?: string) {
	const projectRepository = AppDataSource.getRepository(Project)
	let allProject = null
	if (projectId) {
		allProject = await projectRepository.findOne({ where: { id: projectId } })
	} else {
		allProject = await projectRepository.find()
	}
	return allProject
}

async function check(req, res) {
	const { projectId } = req.params
	const allProject = await find(projectId)
	let business_code: number = 0
	let business_msg: string = '项目查询成功'
	let business_data = allProject
	if (!allProject) {
		business_msg = '项目查询失败'
	}
	const result = new ApiResponse({
		business_code,
		business_msg,
		business_data
	}).toJSON()
	res.send(result)
}

async function create(req, res) {
	const { logo, title, subTitle, desc } = req.body
	const projectRepository = AppDataSource.getRepository(Project)
	const findProject = await projectRepository.findOne({ where: { title } })

	let business_code: number = 0
	let business_msg: string = ''
	let business_data = { isLogin: false }

	if (findProject) {
		business_msg = '项目已存在，请重新创建'
	} else {
		const saveProject = new Project()
		saveProject.logo = logo || ''
		saveProject.title = title || ''
		saveProject.subTitle = subTitle || ''
		saveProject.desc = desc || ''
		saveProject.createdAt = new Date().getTime()
		await projectRepository.save(saveProject)
		business_msg = '项目创建成功'
		business_data = saveProject
	}

	const result = new ApiResponse({
		business_code,
		business_msg,
		business_data
	}).toJSON()
	res.send(result)
}

async function modify(req, res) {
	const { id, logo, title, subTitle, desc } = req.body

	let business_code: number = 0
	let business_msg: string = ''
	let business_data = {}

	try {
		const projectRepository = AppDataSource.getRepository(Project)
		const modifyProject = await projectRepository.findOne({
			where: { id: id }
		})
		modifyProject.logo = logo
		modifyProject.title = title
		modifyProject.subTitle = subTitle
		modifyProject.desc = desc
		modifyProject.updatedAt = new Date().getTime()
		await projectRepository.save(modifyProject)
		business_msg = '项目信息修改成功'
		business_data = modifyProject
	} catch (error) {
		business_msg = '项目信息修改失败'
	}

	const result = new ApiResponse({
		business_code,
		business_msg,
		business_data
	}).toJSON()
	res.send(result)
}

async function remove(req, res) {
	const { projectId } = req.body
	const projectRepository = AppDataSource.getRepository(Project)
	const interfaceRepository = AppDataSource.getRepository(Interface)
	let business_code: number = 0
	let business_msg: string = '项目删除成功'
	let business_data = {projectId: projectId}

	// 先删除带外键的副表的数据
	const deleteInterface = await interfaceRepository
		.createQueryBuilder('interface')
		.leftJoinAndSelect('interface.project', 'project.interfaces')
		.where('interface.project = :projectId', { projectId })
		.getMany()
	deleteInterface && (await interfaceRepository.remove(deleteInterface))
	// 然后再删除主表的数据
	await projectRepository.delete({ id: projectId })

	const result = new ApiResponse({
		business_code,
		business_msg,
		business_data
	}).toJSON()
	res.send(result)
}

export { check, create, modify, remove }
