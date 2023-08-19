import { Typography, Segmented, Button, Input, Space, Modal, Form, Upload } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import AllProject from './AllProject';
import MemberPrivilege from './MemberPrivilege';
import styles from './index.module.scss';

import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const { Title } = Typography;
const { Search } = Input;


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

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
	const [ option, setOption ] = useState<SegmentedValue>('AllProject');
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

	const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
	const [messageApi, contextHolder] = message.useMessage();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
	}
	const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
	const onCancel = () => {
		setOpen(false);
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
	const normFile = (e: any) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};
	return (
		<>
			{contextHolder}
			<Title level={4} style={{marginBottom: '25px'}}>我的项目</Title>
			<Space direction='vertical' style={{width: '100%'}}>
				<div className={styles.flex}>
					<Segmented options={options} value={option} onChange={setOption} />
					{ option === 'AllProject' &&
						<Space>
							<Search placeholder="搜索" allowClear style={{ width: 200 }} />
							<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
								新建项目
							</Button>
						</Space>
					}
				</div>
				{ option === 'AllProject' && <AllProject /> }
				{ option === 'MemberPrivilege' && <MemberPrivilege /> }
			</Space>
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
								name="logo"
								listType="picture-card"
								action=""
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{imageUrl ? <img src={imageUrl} alt="logo" style={{ width: '100%' }} /> : uploadButton}
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
		</>
	);
}

export default MyProject
