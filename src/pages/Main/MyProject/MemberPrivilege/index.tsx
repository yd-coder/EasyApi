import { Typography, Input, Button, Table, Space, Tag } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from './index.module.scss';
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Search } = Input;

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
	return (
		<Space direction='vertical' style={{width: '100%'}}>
			<div className={styles.member}>
				<Title level={1} className={styles.clearMargin}>{data.length}</Title>
				<Title level={5} className={styles.clearMargin}>成员</Title>
			</div>
			<div className={styles.flex}>
					<Search placeholder="搜索" allowClear style={{ width: 200 }} />
					<Button type="primary" icon={<UserAddOutlined />}>
						邀请成员
					</Button>
			</div>
			<Table columns={columns} dataSource={data} pagination={false} />
		</Space>
	);
}

export default MemberPrivilege
