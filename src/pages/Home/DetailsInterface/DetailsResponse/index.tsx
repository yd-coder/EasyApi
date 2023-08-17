import { Tabs, Tag, Space, TabsProps, Tree, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Response, Node } from '../interfaceDef';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import MonacoEditor from '@monaco-editor/react';

const { Title, Text } = Typography;

// 后端返回的数据
type Props = {
  props: Response[];
}

type ResponseProps = {
  props: Response;
}

type DataNode = {
  title: ReactNode;
  key: string;
  children?: DataNode[];
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
        <Title level={5} style={{marginTop: '0.5em'}}>返回响应</Title>
        <Tabs defaultActiveKey={props[0].id.toString()} type="card" items={items} />
    </>
  );
}

// 响应标签页内容
const ResponseContent: React.FC<ResponseProps> = ({ props }) => {
  const { statusCode, contentFormat, node } = props;
	const myRef = useRef(null);
	const [ editorHeight, setEditorHeight ] = useState('0px');
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
		setEditorHeight(`${myRef.current.clientHeight}px`);
		return () => {
			// 在组件卸载时执行清理操作
		};
	}, []);

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
			<Split
					className='split'
					sizes={[50, 50]}
					direction='horizontal'
					cursor='e-resize'
					gutterSize={4}
				>
					<div className='splitLeft'>
						<Title level={5} className='title'>数据结构</Title>
						<TreeContent {...node} />
					</div>
					<div className='splitRight' ref={myRef}>
						<Title level={5} className='title'>
							示例
							<Text copyable={{ text: JSON.stringify(code, null, 4) }}></Text>
						</Title>
						<MonacoEditor
							height={editorHeight}
							language="json"
							options={options}
							value={JSON.stringify(code, null, 4)}
						/>
					</div>
			</Split>
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
	const { name, type, chineseName, desc, isRequired, allowNull } = node;
  return (
    <div>
      <div className='flex'>
        <div>
          <Tag color="blue">{name}</Tag>
          <Space>
            <span className='colorTwo'>{type}</span>
            {allowNull === "true" &&
            <>
              <span className='colorOne'>or</span>
              <span className='colorTwo'>null</span>
            </>}
            {chineseName &&
            <span className='colorOne'>{chineseName}</span>}
          </Space>
        </div>
        {isRequired === "true" ?
          <Tag color="warning">必需</Tag> :
          <Tag color="default">可选</Tag>}
      </div>
			{desc &&
				<div className='colorOne'>{desc}</div>}
      <Space>
        <span className='colorOne'>高级设置:</span>
        <Tag color="default">未知</Tag>
      </Space>
    </div>
  );
}


export default DetailsResponse
