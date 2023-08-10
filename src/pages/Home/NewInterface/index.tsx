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

const { TextArea } = Input

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
		}
	])

	// 分组选择框数据 服务（url设置）
	const groupOptions: GroupOption[] = [
		{
			label: '默认设置',
			options: [{ label: '继承父级（跟随父级目录设置推荐）', value: '继承父级' }]
		},
		{
			label: '手动指定',
			options: [{ label: '默认服务', value: '默认服务' }]
		}
	]

	const tabItems: TabsProps['items'] = [
		{
			key: '1',
			label: `Params`,
			children: <DynamicForm />
		},
		{
			key: '2',
			label: `Body`,
			children: <DynamicForm />
		},
		{
			key: '3',
			label: `Cookie`,
			children: <DynamicForm />
		},
		{
			key: '4',
			label: `Header`,
			children: <DynamicForm />
		}
	]

	const handleChange = (value: string) => {
		console.log(`selected ${value}`)
	}

	const onChange = (key: string) => {
		console.log(key)
	}

	return (
		<div className={styles['form-body']}>
			<div className="header-input">
				<Space.Compact className="input-item input-component">
					<Select defaultValue="GET" options={options} className="select-box" />
					<Input defaultValue="接口路径, / 起始" className="input-box" />
				</Space.Compact>
				<Button type="primary" className="input-item submit-btn">
					保存
				</Button>
			</div>
			<div className="form-context">
				<Input placeholder="未命名接口" className="head-input-bar" />
				<div className="choose-input">
					<div className="status-input choose-input-item">
						<div className="status-input-sapn input-span">状态</div>
						<div className="status-input-item">
							<Select
								defaultValue="开发中"
								style={{ width: '100%' }}
								onChange={handleChange}
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
							<SearchInput placeholder="请选择接口责任人" values={values} />
						</div>
					</div>
					<div className="label-input choose-input-item">
						<div className="label-input-sapn input-span">标签</div>
						<div className="label-input-item">
							<LabelSelect
								width="100%"
								placeholder="查找或创建标签"
								defaultValue=""
								options={labelOptions}
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
					<TextArea rows={4} placeholder="接口说明" maxLength={6} />
				</div>
				<div className="query-params-form">
					<div className="query-params-form-span">请求参数</div>
					<div className="query-params-form-selector">
						<Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
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

export default NewInterface
