/**
 * 动态表单
 * 用于获取用户输入的多组Query参数
 */

import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import styles from './index.module.scss'

const DynamicForm: React.FC = () => {
	const [form] = Form.useForm()

	const onFinish = (values: any) => {
		console.log('Received values of form:', values)
	}

	return (
		<Form
			form={form}
			name="dynamic_form_complex"
			onFinish={onFinish}
			style={{ width: '100%' }}
			autoComplete="off"
		>
			<Form.List name="querys">
				{(fields, { add, remove }) => (
					<>
						{fields.map((field) => (	
                        <div className={styles['list-layout']} key={field.key}>
							<Space
								align="baseline"
								size="large"
							>
										<Form.Item
											{...field}
											key={'name'+field.key}
											label="参数名"
											name={[field.name, 'name']}
											rules={[{ required: true, message: 'Missing price' }]}
											className="list-layout-item"
											// labelCol={{span:3}}
										>
											<Input />
										</Form.Item>
										<Form.Item
											{...field}
											key={'type'+field.key}
											label="类型"
											name={[field.name, 'type']}
                                            className="list-layout-item"
										>
											<Input />
										</Form.Item>
		
										<Form.Item
											{...field}
											key={'example'+field.key}
											label="示例值"
											name={[field.name, 'example']}
											className="list-layout-item"
										>
											<Input />
										</Form.Item>
							
										<Form.Item
											{...field}
											key={'description'+field.key}
											label="说明"
											name={[field.name, 'description']}
											className="list-layout-item"
										>
											<Input />
										</Form.Item>
							
									<MinusCircleOutlined onClick={() => remove(field.name)} />
								
							</Space>
                        </div>
						))}

						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<PlusOutlined />}
							>
								增加参数
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</Form>
	)
}

export default DynamicForm
