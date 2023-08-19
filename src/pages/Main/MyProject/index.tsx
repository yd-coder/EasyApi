import { Typography, Segmented, Button, Input, Space } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import AllProject from './AllProject';
import MemberPrivilege from './MemberPrivilege';
import styles from './index.module.scss';

const { Title } = Typography;
const { Search } = Input;

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

	return (
		<>
			<Title level={4} style={{marginBottom: '25px'}}>我的项目</Title>
			<Space direction='vertical' style={{width: '100%'}}>
				<div className={styles.flex}>
					<Segmented options={options} value={option} onChange={setOption} />
					{ option === 'AllProject' &&
						<Space>
							<Search placeholder="搜索" allowClear style={{ width: 200 }} />
							<Button type="primary" icon={<PlusOutlined />}>
								新建项目
							</Button>
						</Space>
					}
				</div>
				{ option === 'AllProject' && <AllProject /> }
				{ option === 'MemberPrivilege' && <MemberPrivilege /> }
			</Space>
		</>
	);
}

export default MyProject
