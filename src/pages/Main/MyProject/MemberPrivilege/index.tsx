import { Typography, Input, Button, Table, Space, Tag, Modal, Form, message, Select } from "antd";
import { UserAddOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from './index.module.scss';
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

type Member = {
	name: string,
	email: string,
	privilege: string,
	updatedAt: string
}

const columns: ColumnsType<Member> = [
	{
		title: '昵称',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '邮箱',
		dataIndex: 'email',
		key: 'email',
		render: (value) => value && <Text copyable>{value}</Text>
	},
	{
		title: '权限',
		dataIndex: 'privilege',
		key: 'privilege',
		filters: [{
			text: '项目所有者',
			value: '项目所有者',
		}, {
			text: '项目管理员',
			value: '项目管理员',
		}, {
			text: '项目成员',
			value: '项目成员',
		}],
		onFilter: (value, record) => record.privilege.indexOf(value as string) !== -1,
		render: (value) => {
			if (value === '项目所有者') {
				return <Tag color='gold'>{value}</Tag>
			} else if (value === '项目管理员') {
				return <Tag color='cyan'>{value}</Tag>
			} else {
				return <Tag color='geekblue'>{value}</Tag>
			}
		}
	},
	{
		title: '最近修改',
		dataIndex: 'updatedAt',
		key: 'updatedAt',
		sorter: (a, b) => handleDate(a.updatedAt) - handleDate(b.updatedAt),
		render: (value) => showDate(value)
	}
]

const data = [
	{
		key: '1',
		name: '狐友a',
		email: '@qq.com',
		privilege: '项目所有者',
		updatedAt: '2023-08-15T12:00:00Z'
	},
	{
		key: '2',
		name: '狐友b',
		email: '@gmail.com',
		privilege: '项目成员',
		updatedAt: '2023-06-15T12:00:00Z'
	},
	{
		key: '3',
		name: '狐友c',
		email: '',
		privilege: '项目管理员',
		updatedAt: '2013-08-15T12:00:00Z'
	},

]

const showDate = (date: string) => {
	const currentDate = new Date();
	const inputDate = new Date(date);
	const timeDiff = currentDate.valueOf() - inputDate.valueOf();
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	if (daysDiff === 0) {
		return '今天';
	} else if (daysDiff <= 365) {
		return `${daysDiff}天前`;
	} else {
		return inputDate.toLocaleDateString();
	}
}

const handleDate = (date: string) => {
	const currentDate = new Date();
	const inputDate = new Date(date);
	const timeDiff = currentDate.valueOf() - inputDate.valueOf();
	return timeDiff;
}

const MemberPrivilege: React.FC = () => {
	const [ open, setOpen ] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const showModal = () => {
		setOpen(true);
	}
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		const url = '/project';
		const options = {
			method: 'POST',
			body: JSON.stringify(values)
		};
		fetchData(url, options);
	};
	async function fetchData(url: string, options: RequestInit) {
		try {
			const response: any = await fetch(url, options);
			const data = await response.json();
			messageApi.open({
				type: 'success',
				content: '创建成功',
			});
			setOpen(false);
		} catch(error) {
			messageApi.open({
				type: 'error',
				content: '创建失败',
			});
			setOpen(false);
		}
	}
	const onFinishFailed = (values: any) => {
		console.log('Received values of form: ', values);
	};
	const onCancel = () => {
		setOpen(false);
	}
	return (
		<>
			{contextHolder}
			<Space direction='vertical' style={{width: '100%'}}>
				<div className={styles.member}>
					<Title level={1} className={styles.clearMargin}>{data.length}</Title>
					<Title level={5} className={styles.clearMargin}>成员</Title>
				</div>
				<div className={styles.flex}>
						<Search placeholder="搜索" allowClear style={{ width: 200 }} />
						<Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
							邀请成员
						</Button>
				</div>
				<Table columns={columns} dataSource={data} pagination={false} />
			</Space>
			<Modal
        open={open}
				onCancel={onCancel}
				footer={null}
      >
				<div className={styles.form}>
					<Title level={4}>邀请成员</Title>
					<Form
						name="inviteMembers"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.List name="members">
							{(fields, { add, remove }) => (
								<>
									{fields.map((field) => (
										<Space key={field.key} style={{ marginBottom: 8 }} align="baseline">
											<Form.Item
												{...field}
												name={[field.name, 'privilege']}
											>
												<Select defaultValue='3' style={{ width: 120 }}>
													<Option value='1'>
														项目管理员
													</Option>
													<Option value='2'>
														项目所有者
													</Option>
													<Option value='3'>
														项目成员
													</Option>
												</Select>
											</Form.Item>

											<Form.Item
												{...field}
												name={[field.name, 'name']}
												rules={[{ required: true, message: '请输入成员名称' }]}
											>
												<Input placeholder="成员名称" />
											</Form.Item>

											<MinusCircleOutlined onClick={() => remove(field.name)} />
										</Space>
									))}
									<Form.Item>
										<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
											添加成员
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								发送邀请
							</Button>
						</Form.Item>
					</Form>
				</div>
      </Modal>
		</>
	);
}

export default MemberPrivilege
