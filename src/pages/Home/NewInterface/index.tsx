/**
 * 创建接口页面
 * @returns
 *
 */

import React, { useState } from 'react'
import styles from './index.module.scss'
import { Input, Button, Select, Space, Tabs } from 'antd'
import SearchInput from '@/components/SearchInput'
import LabelSelect from '@/components/LabelSelect'
import GroupInput from '@/components/GroupInput'
import type { TabsProps } from 'antd'
import DynamicForm from './QueryComponent/DynamicForm'
import ReturnResponseTab from './ReturnResponseTab'
import { useLocation } from 'react-router-dom'
import BodyComponent from './QueryComponent/BodyComponent'
import { postCreateInterface } from '@/api/interface'

const { TextArea } = Input

type StringArray = string

type TabsForm = {
	name: string | undefined
	type: string | undefined
	example: string | undefined
	description: string | undefined
}

interface ValueItem {
	value: string
	label: string
}
interface Option {
	label: string
	value: string
}

interface GroupOption {
	label: string
	options: Option[]
}

interface NewInterfaceProps {
	options: Option
}

const NewInterface: React.FC<NewInterfaceProps | any> = () => {
	const location = useLocation()

	// 根据当前路径选择是否展示组件
	const showRouteButton = location.pathname === '/change'

	// 下拉列表选择框 状态
	const options = [
		{
			value: 'GET',
			label: 'GET'
		},
		{
			value: 'POST',
			label: 'POST'
		},
		{
			value: 'PUT',
			label: 'PUT'
		},
		{
			value: 'DELETE',
			label: 'DELETE'
		},
		{
			value: 'OPTIONS',
			label: 'OPTIONS'
		},
		{
			value: 'HEAD',
			label: 'HEAD'
		},
		{
			value: 'PATCH',
			label: 'PATCH'
		}
	]
	// 搜索选择框数据 责任人
	const [values] = useState<ValueItem[]>([
		{
			value: 'JOBT001',
			label: 'JOBT001'
		}
	])
	// 标签选择框数据 标签
	const [labelOptions] = useState<ValueItem[]>([
		{
			value: '宠物',
			label: '宠物'
		},
		{
			value: 'test',
			label: 'test'
		}
	])
	// 分组选择框数据 服务（url设置）
	const groupOptions: GroupOption[] = [
		{
			label: '默认设置',
			options: [
				{ label: '继承父级（跟随父级目录设置推荐）', value: '继承父级' }
			]
		},
		{
			label: '手动指定',
			options: [{ label: '默认服务', value: '默认服务' }]
		}
	]

	// 请求参数 Params Body Cookie Header
	const tabItems: TabsProps['items'] = [
		{
			key: '1',
			label: `Params`,
			children: (
				<DynamicForm
					tabKey="1"
					handleFinish={(e) => {
						for (let i = 0; i < e.querys.length; i++) {
							const newParam = {
								name: e.querys[i][1].name[i],
								type: e.querys[i][1].type[i],
								example: e.querys[i][1].example[i],
								description: e.querys[i][1].description[i]
							}
							setParams((prevParams) => {
								const isDuplicate = prevParams.some(
									(param) => param.name === newParam.name
								)
								if (!isDuplicate) return [...prevParams, newParam]
								else return prevParams
							})
						}
					}}
				/>
			)
		},
		{
			key: '2',
			label: `Body`,
			children: (
				<BodyComponent
					handleFinish={(e) => {
						for (let i = 0; i < e.querys.length; i++) {
							const newBody = {
								name: e.querys[i].json.name[i],
								type: e.querys[i].json.type[i],
								example: e.querys[i].json.example[i],
								description: e.querys[i].json.description[i]
							}
							setBody((prevBody) => {
								const isDuplicate = prevBody.some(
									(body) => body.name === newBody.name
								)
								if (!isDuplicate) return [...prevBody, newBody]
								else return prevBody
							})
						}
					}}
				/>
			)
		},
		{
			key: '3',
			label: `Cookie`,
			children: (
				<DynamicForm
					tabKey="3"
					handleFinish={(e) => {
						console.log(e.querys[0][3])
					}}
				/>
			)
		},
		{
			key: '4',
			label: `Header`,
			children: (
				<DynamicForm
					tabKey="4"
					handleFinish={(e) => {
						console.log(e.querys[0][4])
					}}
				/>
			)
		}
	]

	// 所有要 POST 的参数状态管理
	const [projectId, setProjectId] = useState<string>('')
	const [path, setPath] = useState<string>('接口路径, / 起始')
	const [title, setTitle] = useState<string>('')
	const [desc, setDesc] = useState<string>('')
	const [method, setMethod] = useState<string>('GET')
	const [params, setParams] = useState<TabsForm[]>([])
	const [body, setBody] = useState<TabsForm[]>([])
	const [state, setState] = useState<string>('开发中')
	const [catalog, setCatalog] = useState<string>('')
	const [tags, setTags] = useState<StringArray[]>([])
	const [revision, setRevision] = useState<string>('')
	const [owner, setOwner] = useState<string>('')
	const [leader, setLeader] = useState<string>('')
	const [createPerson, setCreatePerson] = useState<string>('')

	const handleSave = () => {
		const postData = {
			projectId: projectId,
			path: path,
			title: title,
			desc: desc,
			method: method,
			params: params,
			bady: body,
			state: state,
			catalog: catalog,
			tags: tags,
			revision: revision,
			owner: owner,
			leader: leader,
			createPerson: createPerson
		}
		console.log(postData)
		// postCreateInterface('interface', postData).then((res) => {
		// 	if (res.code === 200) alert('保存成功')
		// 	else alert('错误')
		// })
	}

	return (
		<div className={styles['form-body']}>
			<div className="header-input">
				<Space.Compact className="input-item input-component">
					<Select
						defaultValue={method}
						options={options}
						className="select-box"
						onSelect={(e) => {
							setMethod(e)
						}}
					/>
					<Input
						defaultValue={path}
						className="input-box"
						onChange={(e) => {
							setPath(e.target.value)
						}}
					/>
				</Space.Compact>
				<Button
					type="primary"
					className="input-item submit-btn"
					onClick={handleSave}
				>
					保存
				</Button>
				<div>{showRouteButton ? <RouteButton /> : ''}</div>
			</div>
			<div className="form-context">
				<Input
					placeholder="未命名接口"
					className="head-input-bar"
					defaultValue={title}
					onChange={(e) => {
						setTitle(e.target.value)
					}}
				/>
				<div className="choose-input">
					<div className="status-input choose-input-item">
						<div className="status-input-sapn input-span">状态</div>
						<div className="status-input-item">
							<Select
								defaultValue={state}
								style={{ width: '100%' }}
								onSelect={(e) => {
									setState(e)
								}}
								options={[
									{ value: '已发布', label: '已发布' },
									{ value: '测试中', label: '测试中' },
									{ value: '将废弃', label: '将废弃' },
									{ value: '开发中', label: '开发中' }
								]}
							/>
						</div>
					</div>
					<div className="responsibility-input choose-input-item">
						<div className="responsibility-input-sapn input-span">责任人</div>
						<div className="responsibility-input-item">
							<SearchInput
								placeholder="请选择接口责任人"
								values={values}
								handleSelect={(e) => {
									setLeader(e)
								}}
							/>
						</div>
					</div>
					<div className="label-input choose-input-item">
						<div className="label-input-sapn input-span">标签</div>
						<div className="label-input-item">
							<LabelSelect
								width="100%"
								placeholder="查找或创建标签"
								defaultValue={tags}
								options={labelOptions}
								handleSelect={(e) => {
									setTags([...tags, e])
								}}
							/>
						</div>
					</div>
					<div className="service-input choose-input-item">
						<div className="service-input-sapn input-span">服务(前置url)</div>
						<div className="service-input-item">
							<GroupInput defaultValue="默认服务" options={groupOptions} />
						</div>
					</div>
				</div>
				<div className="description-input-text">
					<div className="description-input-span">说明</div>
					<TextArea
						showCount
						maxLength={20}
						placeholder="接口说明(不超过20字)"
						defaultValue={desc}
						onChange={(e) => {
							setDesc(e.target.value)
						}}
					/>
				</div>
				<div className="query-params-form">
					<div className="query-params-form-span">请求参数</div>
					<div className="query-params-form-selector">
						<Tabs defaultActiveKey="1" items={tabItems} />
					</div>
					<div className="query-params-form-span">返回响应</div>
					<div className="return-response-tab">
						<ReturnResponseTab />
					</div>
				</div>
			</div>
		</div>
	)
}

const RouteButton: React.FC = () => {
	return (
		<div className={styles['route-button']}>
			<Button className="input-item submit-btn">运行</Button>
			<Button className="input-item submit-btn">取消</Button>
		</div>
	)
}

export default NewInterface
