/**
 * 运行接口页面
 */

import { Input, Button, Space, Row, Col } from 'antd'
import Split from 'react-split'
import QueryEdit from '@/components/QueryEdit'
import ResponseView from './ResponseView'

const RunInterface: React.FC = () => {
	// 接口数据
	const interfaceData = {
		type: 'GET',
		interface: 'http://easyapi.com/getdata'
	}

	return (
		<>
			<Space direction="vertical" style={{ width: '100%' }}>
				<Row gutter={8}>
					<Col span={16}>
						<Input
							addonBefore={interfaceData.type}
							defaultValue={interfaceData.interface}
						/>
					</Col>
					<Col span={8}>
						<Button type="primary">发送</Button>
					</Col>
				</Row>
				<Split direction="vertical" minSize={0} gutterSize={6}>
					<QueryEdit />
					<ResponseView />
				</Split>
			</Space>
		</>
	)
}

export default RunInterface
