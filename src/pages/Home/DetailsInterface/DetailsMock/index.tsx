import { Typography, Button, Space, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { Mock } from '../typeDef';

const { Title } = Typography;

// 后端返回的数据
type Props = {
  props: Mock[];
}

const columns: ColumnsType<Mock> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'URL / 参数',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <a>快捷请求</a>
    ),
  },
];

// 后端返回的数据示例
const mockProps = [{
  key: '1',
  name: '在售宠物（成功）（200）',
  source: '高级Mock',
  url: 'https://mock.apifox.cn/m1/3102608-0-default/pet/1'
}, {
  key: '2',
  name: '在售宠物（200）',
  source: '高级Mock',
  url: 'https://mock.apifox.cn/m1/3102608-0-default/pet/2'
}];

const DetailsMock: React.FC = () => {
    return (
        <>
            <Title level={5} style={{marginTop: '0.5em'}}>Mock</Title>
						<Space style={{marginBottom: '0.5em'}}>
								<Button>本地Mock</Button>
								<Button>云端Mock</Button>
						</Space>
						<Table columns={columns} dataSource={mockProps} style={{overflow: 'hidden'}}/>
        </>
    );
}

export default DetailsMock
