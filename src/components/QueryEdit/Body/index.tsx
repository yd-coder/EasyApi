import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Select } from 'antd'
import styles from '../Params/index.module.scss'
import { useState } from 'react'

const onFinish = (values: any) => {
	console.log('Received values of form:', values)
}

const Body: React.FC = () => {
	const [bodyType, setBodyType] = useState('form-data')

	return (
		<Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
			<span
				className={`${styles.bodyType} ${
					bodyType === 'form-data' ? styles.bodyTypeActive : undefined
				}`}
				onClick={() => setBodyType('form-data')}
			>
				form-data
			</span>
			<span
				className={`${styles.bodyType}
					${bodyType === 'x-www-form-urlencoded' ? styles.bodyTypeActive : undefined}`}
				onClick={() => setBodyType('x-www-form-urlencoded')}
			>
				x-www-form-urlencoded
			</span>
			<div className={styles.tableHeader}>
				<span>参数名</span>
				<span>参数值</span>
				<span>类型</span>
				<span>说明</span>
			</div>
			<Form.List name="param">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Space key={key} align="baseline">
								<Form.Item
									{...restField}
									name={[name, 'name']}
									rules={[{ required: true, message: '请输入参数名' }]}
								>
									<Input placeholder="添加参数" style={{ width: 250 }} />
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'value']}
									rules={[{ required: true, message: '请输入参数值' }]}
								>
									<Input style={{ width: 250 }} />
								</Form.Item>
								<Form.Item name={[name, 'type']}>
									<Select
										defaultValue="string"
										style={{ width: 100 }}
										options={[
											{ value: 'string', label: 'string' },
											{ value: 'integer', label: 'integer' },
											{ value: 'number', label: 'number' },
											{ value: 'array', label: 'array' }
										]}
									/>
								</Form.Item>
								<Form.Item {...restField} name={[name, 'description']}>
									<Input style={{ width: 320 }} />
								</Form.Item>
								{key !== 1 && (
									<MinusCircleOutlined onClick={() => remove(name)} />
								)}
							</Space>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<PlusOutlined />}
							>
								新增参数
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Body
