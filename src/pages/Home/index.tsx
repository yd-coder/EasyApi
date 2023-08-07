import {
	LayoutTwoTone,
	ApiTwoTone,
	SmileTwoTone
} from '@ant-design/icons';
import { Layout, theme, Tabs } from 'antd';
import InterfaceList from './InterfaceList';
import style from './index.module.scss'
import InterfaceTree from './InterfaceTree';
import ProjectView from './ProjectView';
import { useState, useRef } from 'react'
import NewInterface from './NewInterface';

const { Sider, Content } = Layout;

interface items {
	label: string,
	key: string,
	children: React.ReactNode
}

// tab栏的数据
const initialItems: items[] = [
	{ label: '项目概览', key: 'project', children: <ProjectView /> },
	{ label: '接口管理', key: 'apiList', children: <InterfaceList /> }
];

const Home: React.FC = () => {

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const [activeKey, setActiveKey] = useState(initialItems[0].key);
	const [items, setItems] = useState(initialItems);
	const newTabIndex = useRef(0);

	// 点击左侧的目录 tab标签跟着切换
	const showContent = (type: string) => {
		const newPanes = [...items];
		// 如果没有找到项目概览或者接口管理就添加
		if(!newPanes.find((item)=>item.key=='project')&&type=='project'){
			newPanes.push({ label: '项目概览', key: 'project', children: <ProjectView /> })
			setItems(newPanes);
		}
		if(!newPanes.find((item)=>item.key=='apiList')&&type=='apiList'){
			newPanes.push({ label: '接口管理', key: 'apiList', children: <InterfaceList /> })
			setItems(newPanes);
		}
		setActiveKey(type)
	}

	// tab标签切换
	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	// tab标签增加删除
	const onEdit = (
		targetKey: React.MouseEvent | React.KeyboardEvent | string,
		action: 'add' | 'remove',
	) => {
		if (action === 'add') {
			add();
		} else {
			remove(targetKey);
		}
	};

	// 添加tab标签
	const add = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`;
		const newPanes = [...items];
		newPanes.push({ label: '新建接口', children: <NewInterface />, key: newActiveKey });
		setItems(newPanes);
		setActiveKey(newActiveKey);
	};

	// 删除tab标签
	const remove = (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
		const targetIndex = items.findIndex((item) => item.key === targetKey);
		const newPanes = items.filter((item) => item.key !== targetKey);
		if (newPanes.length && targetKey === activeKey) {
			const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
			setActiveKey(key);
		}
		setItems(newPanes);
	};

	return (
		<div className={style.box}>
			<Layout style={{ width: "100vw", height: "100vh" }}>
				{/* 侧边栏 */}
				<Sider trigger={null}
					style={{ background: 'white', }}
					collapsed={false}
					width={250}
				>
					<div className={style.title}>
						<SmileTwoTone />
						&nbsp;个人项目
					</div>
					<div className={style.subtitle} onClick={() => showContent('project')}><LayoutTwoTone />&nbsp;项目概览</div>
					<div className={style.subtitle} onClick={() => showContent('apiList')}><ApiTwoTone />&nbsp;接口管理</div>
					<InterfaceTree items={items} setItems={setItems} setActiveKey={setActiveKey}/>
				</Sider>
				{/* 右侧主要内容 */}
				<Layout>
					<Content
						style={{
							margin: '12px 16px',
							padding: 12,
							minHeight: 280,
							background: colorBgContainer,
						}}>
						<Tabs
							type="editable-card"
							items={items}
							activeKey={activeKey}
							onChange={onChange}
							onEdit={onEdit}
						/>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default Home
