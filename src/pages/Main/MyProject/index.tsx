import { Typography, Segmented, Button, Input, Space, Modal, Form, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import AllProject from './AllProject';
import MemberPrivilege from './MemberPrivilege';
import styles from './index.module.scss';
import { Project } from './typeDef';

import { message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { fetchProjects } from './Api';


const { Title } = Typography;
const { Search } = Input;


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const MyProject: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [ fileList, setFileList ] = useState<UploadFile[]>([]);
	const [ option, setOption ] = useState('AllProject');
	const [ projects, setProjects ] = useState<Project[]>([]);
	const options = [
		{
			label: '所有项目',
			value: 'AllProject'
		}, {
			label: '成员/权限',
			value: 'MemberPrivilege'
		}
	];
	const [ open, setOpen ] = useState(false);

	const showModal = () => {
		setOpen(true);
	};

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);
	const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
	const onCancel = () => {
		setOpen(false);
	}
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		const url = 'http://localhost:5000/project';
		const options = {
			method: 'POST',
			body: JSON.stringify(values),
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		};
		createProject(url, options);
	};
	async function createProject(url: string, options: any) {
		try {
			const response: any = await fetch(url, options);
			const { business_code, business_data, business_msg } = await response.json();
			if (business_code === 0) {
				messageApi.info(business_msg);
				business_data.id && setProjects([business_data, ...projects]);
			}
			setOpen(false);
		} catch(error) {
			console.log(error);
		}
	}
	const onFinishFailed = (values: any) => {
		console.log('Received values of form: ', values);
	};
	const normFile = (e: any) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	useEffect(() => {
		getProjects();
	}, []);
	const handleOptionChange = (option: any) => {
		option === 'AllProject' && getProjects();
		setOption(option);
	}
	const getProjects = async () => {
		try {
			const business_data = await fetchProjects();
			setProjects([...business_data]);
		} catch(error) {
			console.log(error);
		}
	}

	return (
		<>
			{contextHolder}
			<Title level={4} style={{marginBottom: '25px'}}>我的项目</Title>
			<Space direction='vertical' style={{width: '100%'}}>
				<div className={styles.flex}>
					<Segmented options={options} value={option} onChange={handleOptionChange} />
					{ option === 'AllProject' &&
						<Space>
							<Search placeholder="搜索" allowClear style={{ width: 200 }} />
							<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
								新建项目
							</Button>
						</Space>
					}
				</div>
				{ option === 'AllProject' && <AllProject projects={projects} setProjects={setProjects} /> }
				{ option === 'MemberPrivilege' && <MemberPrivilege /> }
			</Space>
			{ option === 'AllProject' &&
				<Modal
					open={open}
					onCancel={onCancel}
					footer={null}
				>
					<div className={styles.form}>
						<Title level={4}>新建项目</Title>
						<Form name='createProject' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
							<Form.Item name='logo' valuePropName="fileList" getValueFromEvent={normFile}>
								<Upload
									action=''
									listType="picture-card"
									fileList={fileList}
									onChange={handleChange}
									showUploadList={false}
								>
									{uploadButton}
								</Upload>
							</Form.Item>
							<Form.Item name='title' rules={[{required: true, message: '请输入项目标题'}]}>
								<Input placeholder='项目标题' style={{width: '300px'}} />
							</Form.Item>
							<Form.Item name='subTitle' rules={[{required: true, message: '请输入项目副标题'}]}>
								<Input placeholder='项目副标题' style={{width: '300px'}} />
							</Form.Item>
							<Form.Item name='desc' rules={[{required: true, message: '请输入项目描述'}]}>
								<Input placeholder='项目名称' style={{width: '300px'}} />
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									新建
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Modal>
			}
		</>
	);
}

export default MyProject
