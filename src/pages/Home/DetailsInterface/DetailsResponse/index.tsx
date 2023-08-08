import { Tabs, Tag, Space, TabsProps, Tree, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Response, Node } from '../interfaceDef';

const { Title } = Typography;
const { TreeNode } = Tree;

// 后端返回的数据
interface Props {
  props: Response[];
}

interface ResponseProps {
  props: Response;
}

interface NodeProps {
  props: Node[];
}

const DetailsResponse: React.FC<Props> = ({ props }) => {
	// 响应标签页
  const items: TabsProps['items'] = props.map((response) => {
    return {
      key: response.id.toString(),
      label: `${response.name}(${response.statusCode})`,
      children: <ResponseContent props={response} />
    };
  });

  return (
    <>
        <Title level={5}>返回响应</Title>
        <Tabs defaultActiveKey={props[0].id.toString()} type="card" items={items} />
    </>
  );
}

// 响应标签页内容
const ResponseContent: React.FC<ResponseProps> = ({ props }) => {
  const { statusCode, contentFormat, nodes } = props;
  return (
    <>
      <div className='responseContent'>
        <div>
          <span className='left'>HTTP 状态码:</span>
          <span className='right'>{statusCode}</span>
        </div>
        <div>
          <span className='left'>内容格式:</span>
          <span className='right'>{contentFormat}</span>
        </div>
      </div>
      <div style={{display: "flex"}}>
        <div style={{flex: "0 0 50%"}}>
          <Title level={5}>数据结构</Title>
          <TreeContent props={nodes} />
        </div>
        <div>
          <Title level={5}>示例</Title>
        </div>
      </div>
    </>
  );
};

// 数据结构内容
const TreeContent: React.FC<NodeProps> = ({ props }) => {
  return (
    <Tree
    showLine
    switcherIcon={<DownOutlined />}
    blockNode={true}
    selectable={false}
  >
    {ProcessNodeContent(props)}
  </Tree>
  );
};

function ProcessNodeContent(props: Node[]) {
  return (
    props.map((node) => {
      const { id, child } = node;
      if (child) {
        return (
        <TreeNode key={id} title={NodeContent(node)}>
          {ProcessNodeContent(child)}
        </TreeNode>
        );
      } else {
        return (<TreeNode key={node.id} title={NodeContent(node)} />);
      }
    })
  );
}

function NodeContent(node: Node) {
  return (
    <div>
      <div className='flex'>
        <div>
          <Tag color="blue">{node.name}</Tag>
          <Space>
            <span className='colorTwo'>{node.type}</span>
            {node.allowNull === "true" &&
            <>
              <span className='colorOne'>or</span>
              <span className='colorTwo'>null</span>
            </>}
            {node.chineseName !== "null" &&
            <span className='colorOne'>{node.chineseName}</span>}
          </Space>
        </div>
        {node.isRequired === "true" ?
          <Tag color="warning">必需</Tag> :
          <Tag color="default">可选</Tag>}
      </div>
      <div className='colorOne'>{node.desc}</div>
      <Space>
        <span className='colorOne'>示例值:</span>
        <Tag color="default">1</Tag>
      </Space>
    </div>
  );
}

export default DetailsResponse
