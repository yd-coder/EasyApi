/**
 * 动态表单
 * 用于获取用户输入的多组Query参数
 */

import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import styles from './index.module.scss'
import type { Callbacks } from '../../../../../../node_modules/.pnpm/rc-field-form@1.34.2_react-dom@18.2.0_react@18.2.0/node_modules/rc-field-form/lib/interface'

interface DynamicFormProps {
	tabKey: string // 或者根据实际情况定义类型
	handleFinish: Callbacks<any>['onFinish']
}

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
	const { tabKey, handleFinish } = props

	return (
		<Form
			name={`dynamic_form_complex_${tabKey}`}
			onFinish={handleFinish}
			style={{ width: '100%' }}
			autoComplete="off"
		>
			<Form.List name="querys">
				{(fields, { add, remove }) => (
					<>
						{fields.map((field) => (
							<div className={styles['list-layout']} key={field.key}>
								<Space align="baseline" size="large">
									<Form.Item
										{...field}
										key={tabKey + 'name' + field.key}
										label="参数名"
										name={[field.name, tabKey, 'name', field.key]}
										rules={[{ required: true, message: 'Missing price' }]}
										className="list-layout-item"
									>
										<Input />
									</Form.Item>
									<Form.Item
										{...field}
										key={tabKey + 'type' + field.key}
										label="类型"
										name={[field.name, tabKey, 'type', field.key]}
										className="list-layout-item"
									>
										<Input />
									</Form.Item>

									<Form.Item
										{...field}
										key={tabKey + 'example' + field.key}
										label="示例值"
										name={[field.name, tabKey, 'example', field.key]}
										className="list-layout-item"
									>
										<Input />
									</Form.Item>

									<Form.Item
										{...field}
										key={tabKey + 'description' + field.key}
										label="说明"
										name={[field.name, tabKey, 'description', field.key]}
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

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								保存
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</Form>
	)
}

export default DynamicForm
