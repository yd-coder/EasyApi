import { Dropdown, Avatar, Typography, Button, message, Space, Modal, Form, Input } from 'antd';
import { EllipsisOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Project } from '../typeDef';
import React, { useState } from 'react';

const { Title, Text } = Typography;

type Props = {
	projects: Project[],
	setProjects: any
}
const AllProject: React.FC<Props> = ({projects, setProjects}) => {
	const [messageApi, contextHolder] = message.useMessage();

	const handleDeleteProject = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, projectId: string) => {
		e.preventDefault();
		const url = 'http://localhost:5000/project';
		const options: any = {
			method: 'DELETE',
			body: JSON.stringify({
				projectId: projectId
			}),
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		};
		fetch(url, options)
		.then(response => response.json())
		.then(async ({ business_code, business_msg, business_data }) => {
			console.log(business_code, business_msg, business_data);
			if (business_code === 0) {
				messageApi.info(business_msg);
				setProjects(projects.filter(project => project.id !== business_data.projectId));
			}
		}).catch(error => {
			console.log(error);
		});
	}

	const [ open, setOpen ] = useState(false);
	const [ modalProps, setModalProps ] = useState<ModalProps | null>(null);
	const showModal = (e: React.MouseEvent<HTMLAnchorElement>, project: Project) => {
		e.preventDefault();
		const props = {
			project: project,
			setProjects: setProjects,
			projects: projects,
			messageApi: messageApi,
			setOpen: setOpen,
			open: !open
		}
		setModalProps(props);
		setOpen(true);
	}

	return (
			<div className={styles.project}>
				{ contextHolder }
					{projects && projects.map((project) => {
						const items: MenuProps['items'] = [
							{
								key: '1',
								label: (<a onClick={(e) => showModal(e, {...project})}><EditOutlined style={{marginRight: '0.5em'}} />修改名称</a>)
							},
							{
								type: 'divider',
							},
							{
								key: '2',
								label: (<a onClick={(e) => handleDeleteProject(e, project.id)}><DeleteOutlined style={{marginRight: '0.5em'}} />删除项目</a>),
								danger: true,
							},
						];
						return (
								<Link key={project.id} className={styles.card} to='/Home'>
									<div className={styles.avatar}>
										<Avatar shape="square" size="large" icon={<UserOutlined />} />
										<Dropdown menu={{ items }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
											<Button icon={<EllipsisOutlined />} onClick={e => e.preventDefault()}></Button>
										</Dropdown>
									</div>
									<Space style={{marginTop: '15px'}}>
										<Text>{project.title}</Text>
										<Text>{project.subTitle}</Text>
									</Space>
									<Text style={{display: 'block'}}>{project.desc}</Text>
								</Link>
						);
					}
				)}
				{ open === true && <UpdateModal {...modalProps} /> }
			</div>
	);
}

type ModalProps = {
	project: Project,
	setProjects: any,
	projects: Project[],
	messageApi: any,
	setOpen: any,
	open: boolean
}
const UpdateModal: React.FC<ModalProps> = ({project, setProjects, projects, messageApi, setOpen, open}) => {
	const onCancel = () => {
		setOpen(false);
	}
	const onFinish = (values: any) => {
		const url = 'http://localhost:5000/project';
		const options: any = {
			method: 'PUT',
			body: JSON.stringify({...project, ...values}),
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		};
		fetch(url, options)
		.then(response => response.json())
		.then(async ({ business_code, business_msg, business_data }) => {
			if (business_code === 0) {
				messageApi.info(business_msg);
				setProjects(projects.map((project) => {
					if (project.id === business_data.id) {
						return {...business_data};
					}
					return project;
				}));
			}
			setOpen(false);
		}).catch(error => {
			console.log(error);
		});
	}
	const onFinishFailed = (values: any) => {
		console.log('Received values of form: ', values);
	};
	return (
		<Modal
		open={open}
		onCancel={onCancel}
		footer={null}
	>
		<div className={styles.form}>
			<Title level={4}>修改名称</Title>
			<Form
				name='updateProject'
				layout='vertical'
				initialValues={{title: project.title}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				>
				<Form.Item label='名称' name='title' rules={[{required: true, message: '请输入名称'}]}>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						保存
					</Button>
				</Form.Item>
			</Form>
		</div>
	</Modal>
	);
}

export default AllProject
