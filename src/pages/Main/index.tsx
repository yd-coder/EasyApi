import React, { useRef, useState } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Typography, Layout, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import styles from './index.module.scss';
import MyProject from './MyProject';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
		label,
    key,
    icon,
    children,
  } as MenuItem;
}

const Main: React.FC = () => {
	const myRef = useRef(null);
	const [ selectedKey, setSelectedKey ] = useState('1');
	const siderItems: MenuItem[] = [
		getItem('我的项目', '1'),
	];

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (<a><LogoutOutlined style={{marginRight: '0.5em'}} />退出登录</a>)
		}
	];

	const handleMenuSelect = ({ key }: { key :string }) => {
		setSelectedKey(key);
	}

	return (
		<Layout style={{ backgroundColor: 'transparent', height: '100vh' }} hasSider>
			<Sider className={styles.sider} theme='light' width={300}>
				<div className={styles.title}>
					<img className={styles.image} src='/src/assets/icon/icon.png' />
					<Title className={styles.name} level={3}>Easy Api</Title>
				</div>
				<Menu ref={myRef}
						mode='vertical'
						selectedKeys={[selectedKey]}
						items={siderItems}
						onSelect={handleMenuSelect}
						style={{borderRight: '0'}}
				>
				</Menu>
			</Sider>
			<Layout className={styles.right}>
				<Header className={styles.header}>
					<div className={styles.avatar}>
						<Dropdown menu={{ items }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
							<Avatar className={styles.images} style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
						</Dropdown>
					</div>
				</Header>
				<Content className={styles.content}>
					{selectedKey === '1' && <MyProject />}
				</Content>
			</Layout>
		</Layout>
	);
}

export default Main
