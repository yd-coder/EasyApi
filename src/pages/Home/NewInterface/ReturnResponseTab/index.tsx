/**
 *  返回响应组件
 */
import React, { useRef, useState } from 'react'
import { Button, Tabs, Modal, Form, Select, Input } from 'antd'
// import FormComponent from '../QueryComponent/FormComponent'
import BasicResponseForm from './BasicResponseForm'
import { InfoContext } from './InfoContext'

// export const InfoContext = React.createContext({})

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface FormValues {
	fieldName1: string
	fieldName2: string
}

interface Item {
	label: string;
	children: JSX.Element;
	key: string;
}

// 默认返回状态标签页 成功(200)
const defaultPanes:Item[] = [
	{
		label: `成功(200)`,
		children: <BasicResponseForm key="defaultPanes" />,
		key: 'defaultPanes'
	}
]

const ReturnResponseTab: React.FC = () => {
	const [activeKey, setActiveKey] = useState(defaultPanes[0].key) // 存储当前tab的key值
	const [items, setItems] = useState(defaultPanes) // 存储标签页
	const newTabIndex = useRef(0) // 记录并且用于新标签页的索引
	const [isModalOpen, setIsModalOpen] = useState(false)
	// 页面用到的数据
	const [componentName, setComponentName] = useState('成功') // 响应组件名称
	const [httpCode, setHttpCode] = useState('200') // HTTP状态码
	const [selectedValue, setSelectedValue] = useState('json') //内容格式

	const showModal = () => {
		setIsModalOpen(true)
	}

	// 更新输入框的值
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		console.log(items)
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
		console.log('setActiveKey:', key)
		setActiveKey(key)
	}

	const setLabel = () => {
		console.log('sadfsfcdwas',httpCode)
		console.log('componentName', componentName)
		const newLabel = componentName
		const keyToFind = activeKey
		const item = items.find((item: Item) => item.key === keyToFind)

		if (item) {
			console.log(item.label) // 输出 "Item 2"
			console.log(item.children) // 输出 <div>Item 2 Content</div>
		} else {
			console.log('未找到匹配的元素')
		}

		// setItems
	}

	const Info = {
		componentName: componentName,
		setComponentName: setComponentName,
		httpCode: httpCode,
		setHttpCode: setHttpCode,
		selectedValue: selectedValue,
		setSelectedValue: setSelectedValue,
		setLabel:setLabel
	}

	const add = () => {
		console.log(newTabIndex)
		const newActiveKey = `newTab${newTabIndex.current++}`
		const newlabel = componentName + '(' + httpCode + ')'
		setItems([
			...items,
			{
				label: newlabel,
				children: (
					<InfoContext.Provider value={Info} key={newActiveKey}>
						<BasicResponseForm key={newActiveKey} />
					</InfoContext.Provider>
				),
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

	const initialValues = {
		fieldName1: '成功',
		fieldName2: '200'
	}

	const onFinish = (values: FormValues) => {
		// 创建一个新的对象，用于存储最终的表单值
		const finalValues: FormValues = { ...values }

		// 检查各个字段的值，如果为空则使用默认值
		if (!finalValues.fieldName1) {
			finalValues.fieldName1 = initialValues.fieldName1
		}
		if (!finalValues.fieldName2) {
			finalValues.fieldName2 = initialValues.fieldName2
		}

		// 使用最终的字段值进行后续处理
		setComponentName(finalValues.fieldName1)
		setHttpCode(finalValues.fieldName2)
	}

	const selectedValueChange = (value: string) => {
		setSelectedValue(value)
	}

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Button onClick={showModal}>+添加</Button>
			</div>
			<Modal
				title="添加空白响应"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form<FormValues> initialValues={initialValues} onFinish={onFinish}>
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
						<Input />
					</Form.Item>
					<Form.Item label="内容格式">
						<Select value={selectedValue} onChange={selectedValueChange}>
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
