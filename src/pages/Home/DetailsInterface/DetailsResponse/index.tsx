import { Tabs, Tag, Space, TabsProps, Tree, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Response, Node } from '../interfaceDef';
import { ReactNode, useEffect, useState } from 'react';
import SplitPane from 'react-split';
import MonacoEditor from '@monaco-editor/react';

const { Title, Text } = Typography;

// 后端返回的数据
interface Props {
  props: Response[];
}

interface ResponseProps {
  props: Response;
	index: number;
}

interface DataNode {
  title: ReactNode;
  key: string;
  children?: DataNode[];
}

const DetailsResponse: React.FC<Props> = ({ props }) => {
	// 响应标签页
  const items: TabsProps['items'] = props.map((response, index) => {
    return {
      key: response.id.toString(),
      label: `${response.name}(${response.statusCode})`,
      children: <ResponseContent props={response} index={index} />
    };
  });

  return (
    <>
        <Title level={5} style={{marginTop: '0.5em'}}>返回响应</Title>
        <Tabs defaultActiveKey={props[0].id.toString()} type="card" items={items} />
    </>
  );
}

// 响应标签页内容
const ResponseContent: React.FC<ResponseProps> = ({ props, index }) => {
  const { statusCode, contentFormat, node } = props;
	const [ editorHeight, setEditorHeight ] = useState('0px');
	const [ sizes, setSizes] = useState<[number, number]>([0.5, 0.5]);
	const code = {
		state: 200,
		msg: '短信验证码发送成功！',
		data: '2578'
	}
	const options = {
		readOnly: true,
		minimap: {enabled: false},
		scrollBeyondLastLine: false
	}
	useEffect(() => {
		const e = document.getElementsByClassName('editorContainer')[index];
		setEditorHeight(`${e.clientHeight}px`);
	}, []);

	const handleDrag = (newSizes: [number, number]) => {
		setSizes(newSizes);
	};

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
			<SplitPane
				className='split'
				sizes={sizes}
				direction='horizontal'
				style={{display: "flex", marginTop: '0.5em'}}
				cursor='e-resize'
				gutterSize={3}
				onDrag={handleDrag}
			>
        <div className='splitLeft'>
          <Title level={5} className='title'>数据结构</Title>
          <TreeContent {...node} />
        </div>
        <div className="splitRight editorContainer">
          <Title level={5} className='title'>
						示例
						<Text copyable={{ text: JSON.stringify(code, null, 4) }}></Text>
					</Title>
					<MonacoEditor
						width={'100%'}
						height={editorHeight}
						language="json"
						options={options}
						value={JSON.stringify(code, null, 4)}
					/>
        </div>
			</SplitPane>
    </>
  );
};

// 数据结构内容
const TreeContent: React.FC<Node> = (node) => {
	const treedata = [];
	treedata.push(ProcessNodeContent(node));
  return (
    <Tree
    showLine
    switcherIcon={<DownOutlined />}
    blockNode={true}
    selectable={false}
		treeData={treedata}
  />
  );
};

const ProcessNodeContent = (node: Node) => {
	const { id, child } = node;
	const title: ReactNode = <NodeContent {...node} />;
	const key: string = `${id}`;
	if (child) {
		const children: DataNode[] = [];
		child.map((subNode) => {
			const tmp: DataNode = ProcessNodeContent(subNode);
			children.push(tmp);
		});
		const data: DataNode = {
			title: title,
			key: key,
			children: children
		}
		return data;
	} else {
		const data: DataNode = {
			title: title,
			key: key
		};
		return data;
	}
}

const NodeContent: React.FC<Node> = (node) => {
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
