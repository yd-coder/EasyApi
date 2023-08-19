import { Dropdown, Avatar, Typography, Button } from 'antd';
import { EllipsisOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './index.module.scss';

const { Text } = Typography;
const items: MenuProps['items'] = [
	{
		key: '1',
		label: (<a><EditOutlined style={{marginRight: '0.5em'}} />修改名称</a>)
	},
	{
    type: 'divider',
  },
  {
		key: '2',
		label: (<a><DeleteOutlined style={{marginRight: '0.5em'}} />删除项目</a>),
    danger: true,
  },
];
type Project = {
	id: string,
	name: string
}
const props: Project[] = [
	{
		id: '1',
		name: '个人项目1'
	},
	{
		id: '2',
		name: '个人项目2'
	},
	{
		id: '3',
		name: '个人项目3'
	},
]

const AllProject: React.FC = () => {

	return (
		<div className={styles.project}>
			{props && props.map((project) => (
				<a key={project.id} className={styles.card} href='/home'>
					<div className={styles.avatar}>
						<Avatar shape="square" size="large" icon={<UserOutlined />} />
						<Dropdown menu={{ items }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
							<Button icon={<EllipsisOutlined />}></Button>
						</Dropdown>
					</div>
					<Text style={{marginTop: '15px', display: 'block'}}>{project.name}</Text>
				</a>
			)
			)}
		</div>
	);
}

export default AllProject
