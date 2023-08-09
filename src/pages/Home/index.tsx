import {
	LayoutTwoTone,
	ApiTwoTone,
	SmileTwoTone
} from '@ant-design/icons';
import { Layout, theme, Tabs, Modal, Form, Input, Popover } from 'antd';
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

	const [activeKey, setActiveKey] = useState(initialItems[0].key);
	// 右侧tab栏数据
	const [items, setItems] = useState(initialItems);
	// 控制新建目录的模态框是否打开
	const [isModalOpen, setIsModalOpen] = useState(false);
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

	// 新增目录
	const addDirectory = (e:any)=>{
		e.stopPropagation()
		setIsModalOpen(true)
	}

	// 确定新增目录
	const handleOk = () => {
		setIsModalOpen(false);
	};
	
	// 取消新增目录
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={style.box}>
			<Layout >
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
					<div className={style.subtitle} onClick={() => showContent('apiList')}><ApiTwoTone />&nbsp;接口管理
						<Popover content='新建目录' ><span className={style.add} onClick={(e)=>addDirectory(e)}>+</span></Popover>
					</div>
					<InterfaceTree items={items} setItems={setItems} setActiveKey={setActiveKey} />
				</Sider>
				{/* 右侧主要内容 */}
				<Layout>
					<Content className={style.content}>
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
			{/* 新建目录的模态框 */}
			<Modal title="新建目录" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='取消' okText='确定' centered>
					<Form>
                    	<Form.Item
                        	label="目录名称"
                        	name="name"
                        	rules={[{required: true,message: '请输入目录名称'},]}
                    	>    
                        	<Input />
                    	</Form.Item>
                </Form>
         	</Modal>
		</div>
	)
}

export default Home
