import { ApiOutlined, HomeOutlined, UserAddOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Space, Dropdown, Avatar, Layout, Tooltip } from "antd";
import type { MenuProps } from 'antd/es/menu';
import styles from './index.module.scss';

const { Sider } = Layout;

const items: MenuProps['items'] = [
	{
		key: '1',
		label: (<a><LogoutOutlined style={{marginRight: '0.5em'}} />退出登录</a>)
	}
];

const siderStyle : React.CSSProperties = {
	backgroundColor: '#F9FAFB',
	borderRight: '1px solid #f0f0f0'
}

const LeftSider: React.FC = () => {
	return (
		<Sider width={80} style={siderStyle}>
			<div className={styles.outerContainer}>
				<div className={styles.innerContainer}>
					<Tooltip title="主页" placement="right" color="#1677ff">
					<a className={styles.main} href="/main" target="_blank"><HomeOutlined style={{fontSize: '28px'}} /></a>
					</Tooltip>
					{/* <Space direction="vertical" className={styles.button}>
						<div><ApiOutlined style={{fontSize: '20px'}} /></div>
						<p>接口管理</p>
					</Space> */}
					<Space direction="vertical" className={styles.button}>
						<div><UserAddOutlined style={{fontSize: '20px'}}  /></div>
						<p>邀请成员</p>
					</Space>
				</div>
				<div className={styles.avatar}>
					<Dropdown menu={{ items }} placement='topRight' arrow={{ pointAtCenter: true }}>
						<Avatar className={styles.images} style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
					</Dropdown>
				</div>
			</div>
		</Sider>
	);
}

export default LeftSider
