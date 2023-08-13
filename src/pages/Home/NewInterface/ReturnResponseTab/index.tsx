/**
 *  返回响应组件
 */
import React, { useRef, useState } from 'react'
import { Button, Tabs, Modal, Form, Select, Input } from 'antd'
import BasicResponseForm from './BasicResponseForm'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface Item {
	label: string
	children: JSX.Element
	key: string
}

const options = [
	{ label: '403 Forbidden', value: '403', title: 'Forbidden' },
	{ label: '404 Not Found', value: '404', title: 'Not Found' },
	{
		label: '500 Internal Server Error',
		value: '500',
		title: 'Internal Server Error'
	}
]

const ReturnResponseTab: React.FC = () => {
	// 页面用到的数据
	const [componentName, setComponentName] = useState('成功') // 响应组件名称
	const [httpCode, setHttpCode] = useState('200') // HTTP状态码
	const [selectedValue, setSelectedValue] = useState('json') //内容格式
	const value = {
		httpCode: httpCode,
		componentName: componentName,
		selectedValue: selectedValue
	}
	// 默认返回状态标签页 成功(200)
	const defaultPanes: Item[] = [
		{
			label: `成功(200)`,
			children: <BasicResponseForm key="defaultPanes" values={value} />,
			key: 'defaultPanes'
		}
	]
	const [activeKey, setActiveKey] = useState(defaultPanes[0].key) // 存储当前tab的key值
	const [items, setItems] = useState(defaultPanes) // 存储标签页

	const newTabIndex = useRef(0) // 记录并且用于新标签页的索引
	const [isModalOpen, setIsModalOpen] = useState(false)

	const initialValues = {
		fieldName1: '成功',
		fieldName2: '200'
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	// 更新输入框的值
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComponentName(e.target.value)
	}

	const handleOk = () => {
		setIsModalOpen(false)
		add()
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const onChange = (key: string) => {
		setActiveKey(key)
	}

	const add = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`
		const newlabel = componentName + '(' + httpCode + ')'
		setItems([
			...items,
			{
				label: newlabel,
				children: <BasicResponseForm key={newActiveKey} values={value} />,
				key: newActiveKey
			}
		])
		setActiveKey(newActiveKey)
	}

	const remove = (targetKey: TargetKey) => {
		const targetIndex = items.findIndex((pane) => pane.key === targetKey)
		const newPanes = items.filter((pane) => pane.key !== targetKey)
		if (newPanes.length && targetKey === activeKey) {
			const { key } =
				newPanes[
					targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
				]
			setActiveKey(key)
		}
		setItems(newPanes)
	}

	const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
		if (action === 'add') {
			add()
		} else {
			remove(targetKey)
		}
	}

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Button onClick={showModal}>+添加</Button>
			</div>
			<Modal
				title="添加空白响应"
				open={isModalOpen}
				closable={false}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form initialValues={initialValues}>
					<Form.Item
						label="响应组件名称"
						name="fieldName1"
						rules={[{ required: true }]}
					>
						<Input value={componentName} onChange={handleNameChange} />
					</Form.Item>

					<Form.Item
						label="HTTP状态码"
						name="fieldName2"
						rules={[{ required: true }]}
					>
						<Select
							onChange={setHttpCode}
							style={{ width: 200 }}
							options={options}
						/>
					</Form.Item>

					<Form.Item label="内容格式">
						<Select value={selectedValue} onChange={setSelectedValue}>
							<Select.Option value="json">json</Select.Option>
							<Select.Option value="xml">xml</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
			<Tabs
				hideAdd
				onChange={onChange}
				activeKey={activeKey}
				type="editable-card"
				onEdit={onEdit}
				items={items}
			/>
		</div>
	)
}

export default ReturnResponseTab
