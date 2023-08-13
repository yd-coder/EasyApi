import React, { useContext, useState } from 'react'
import { Form, Input, Select } from 'antd'
import styles from './index.module.scss'
import { InfoContext } from '../InfoContext'
import { Value } from 'sass'

const options = [
	{ label: '403 Forbidden', value: '403', title: 'Forbidden' },
	{ label: '404 Not Found', value: '404', title: 'Not Found' },
	{
		label: '500 Internal Server Error',
		value: '500',
		title: 'Internal Server Error'
	}
]

const { TextArea } = Input

const BasicResponseForm: React.FC = () => {
	const [form] = Form.useForm()
	// const [httpCode, setHttpCode] = useState('404 Not Found') //
	// const [selectedValue, setSelectedValue] = useState('json')

	const {
		componentName,
		httpCode,
		selectedValue,
		setComponentName,
		setHttpCode,
		setSelectedValue,
		setLabel
	} = useContext(InfoContext)

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values)
	}

	// 更新父组件的 httpCode 状态
	const handleHttpCodeChange = (value: string) => {
		console.log(value)
		setHttpCode(value)
		setLabel
	}

	return (
		<div className={styles['basic-response']}>
			<Form
				// layout="inline"
				form={form}
				// style={{ maxWidth: '600' }}
				onFinish={onFinish}
				className="basic-response-form"
				initialValues={{
					contentFormat: selectedValue,
					httpCode: httpCode
				}}
			>
				<Form.Item label="HTTP状态码" name="httpCode">
					<Select
						id="httpCode"
						style={{ width: 200 }}
						options={options}
						value={httpCode}
						onChange={handleHttpCodeChange}
					/>
				</Form.Item>
				<Form.Item label="响应组件名称">
					<Input placeholder="请输入响应组件名称" />
				</Form.Item>
				<Form.Item label="内容格式" name="contentFormat">
					<Select value={selectedValue} onChange={setSelectedValue}>
						<Select.Option value="json">json</Select.Option>
						<Select.Option value="xml">xml</Select.Option>
					</Select>
				</Form.Item>
				<div className="tip-text">Content-type:text/{selectedValue}</div>
			</Form>
			<TextArea rows={20} placeholder="返回响应" />
		</div>
	)
}

export default BasicResponseForm
