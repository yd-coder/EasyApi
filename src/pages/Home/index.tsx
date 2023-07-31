import {
	LayoutOutlined,
	ApiOutlined,
	FolderOutlined,
	FolderOpenOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import InterfaceList from './InterfaceList';
const { Sider, Header, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Home: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const itemsMenuData: MenuItem[] = [
		{
			key: '/home/projectView',
			icon: <LayoutOutlined />,
			label: '项目概览',
		},
		{
			key: '/home/interfaceManagement',
			icon: <ApiOutlined />,
			label: '接口管理',
			children: [{
				icon: <FolderOutlined />,
				label: '根目录',
				key: '/home/rootDirectory'
			}, {
				icon: <FolderOpenOutlined />,
				label: '示例项目',
				key: '/home/project_list',
				children: [
					{
						label: 'GET  查询宠物详情',
						key: '111',
					},
					{
						label: 'POST 新建宠物信息',
						key: '222',
					},
				]
			}]
		},
	]
	return (
		<div>
			<Layout style={{ width: "100vw", height: "100vh" }}>
				<Sider trigger={null}
					style={{ background: 'white', }}
					collapsed={collapsed}
					width={250}
				>
					<div className="logoImg" >
						个人项目
					</div>
					<Menu
						mode="inline"
						// openKeys={openKeys}
						// onOpenChange={onOpenChange}
						items={itemsMenuData}
					/>
				</Sider>
				<Layout>
					<Header
						style={{
							padding: 0,
							background: colorBgContainer,
						}}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: '16px',
								width: 64,
								height: 64,
							}}
						/>
						接口管理
					</Header>
					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
						}}>
						<InterfaceList/>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default Home
