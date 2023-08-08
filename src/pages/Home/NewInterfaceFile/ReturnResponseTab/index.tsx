/**
 *  返回响应组件
 */
import React, { useRef, useState } from 'react'
import { Button, Tabs, Modal, Form, Select, Input } from 'antd'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface FormValues {
	fieldName1: string
	fieldName2: string
}

const defaultPanes = new Array(2).fill(null).map((_, index) => {
	const id = String(index + 1)
	return {
		label: `Tab ${id}`,
		children: `Content of Tab Pane ${index + 1}`,
		key: id
	}
})

const ReturnResponseTab: React.FC = () => {
	const [activeKey, setActiveKey] = useState(defaultPanes[0].key)
	const [items, setItems] = useState(defaultPanes)
	const newTabIndex = useRef(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [componentName, setComponentName] = useState('') // 响应组件名称
	const [httpCode, setHttpCode] = useState('') // HTTP状态码

	const showModal = () => {
		setIsModalOpen(true)
	}

	// 更新输入框的值
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		setComponentName(e.target.value)
	}

	const handleBlur = () => {
		console.log(componentName) // 无论输入框内容是否有变化，都直接获取当前值
	}

	const handleOk = () => {
		setIsModalOpen(false)
		onFinish()
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
		const newlabel = componentName
		setItems([
			...items,
			{ label: newlabel, children: 'New Tab Pane', key: newActiveKey }
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
        const finalValues: FormValues = { ...values };
    
        // 检查各个字段的值，如果为空则使用默认值
        if (!finalValues.fieldName1) {
          finalValues.fieldName1 = initialValues.fieldName1;
        }
        if (!finalValues.fieldName2) {
          finalValues.fieldName2 = initialValues.fieldName2;
        }
        
        // 使用最终的字段值进行后续处理
        console.log('Field 1:', finalValues.fieldName1);
        console.log('Field 2:', finalValues.fieldName2);
        console.log('--values',finalValues)
      };

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
						<Select defaultValue="json">
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
