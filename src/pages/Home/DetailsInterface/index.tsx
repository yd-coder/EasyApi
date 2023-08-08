import { useState } from 'react';
import { ThunderboltOutlined, CodeOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Select, Badge, Typography, message } from 'antd';
import DetailsMock from "./DetailsMock";
import DetailsParam from "./DetailsParam";
import DetailsResponse from "./DetailsResponse";

import { Interface, Category, Response } from './interfaceDef';
import './index.css';

const { Title, Text } = Typography;
const { Option } = Select;

// 后端返回的数据
interface Props {
  interfaceProps: Interface;
}

const responsesProps: Response[] = [{
  id: 1,
  name: "成功",
  statusCode: 200,
  contentFormat: "JSON",
  nodes: [{
    id: 1,
    name: "node1",
    type: "integer",
    chineseName: "结点",
    desc: "状态码",
    isRequired: "true",
    allowNull: "true",
    child: [{
      id: 2,
      name: "node2",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
    }, {
      id: 3,
      name: "node3",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
    }]
  }, {
    id: 4,
    name: "data4",
    type: "object(Pet)",
    chineseName: "",
    desc: "宠物信息",
    isRequired: "true",
    allowNull: "false",
    child: [{
      id: 5,
      name: "id5",
      type: "integer",
      chineseName: "",
      desc: "宠物ID编号",
      isRequired: "false",
      allowNull: "false",
    }, {
      id: 6,
      name: "name6",
      type: "string",
      chineseName: "名称",
      desc: "名称",
      isRequired: "false",
      allowNull: "true",
    }]
  }]
}, {
  id: 2,
  name: "失败",
  statusCode: 400,
  contentFormat: "JSON",
  nodes: [{
    id: 1,
    name: "node11",
    type: "integer",
    chineseName: "结点",
    desc: "状态码",
    isRequired: "true",
    allowNull: "true",
    child: [{
      id: 2,
      name: "node22",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
    }, {
      id: 3,
      name: "node33",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
    }]
  }, {
    id: 4,
    name: "data44",
    type: "object(Pet)",
    chineseName: "",
    desc: "宠物信息",
    isRequired: "true",
    allowNull: "false",
    child: [{
      id: 5,
      name: "id55",
      type: "integer",
      chineseName: "",
      desc: "宠物ID编号",
      isRequired: "false",
      allowNull: "false",
    }, {
      id: 6,
      name: "name66",
      type: "string",
      chineseName: "名称",
      desc: "名称",
      isRequired: "true",
      allowNull: "true",
    }]
  }]
}];

const categoriesProps: Category[] = [{id: 1, name: "Query", params: [{
	id: 1,
	name: "petName",
	type: "string",
	desc: "宠物名称",
	isRequired: "true",
	exampleValue: "小柴"
}, {
	id: 2,
	name: "petGender",
	type: "string",
	desc: "宠物性别",
	isRequired: "false",
	exampleValue: "女"
}]}, {id: 2, name: "Path", params: [{
	id: 1,
	name: "petId",
	type: "integer",
	desc: "宠物ID",
	isRequired: "true",
	exampleValue: "123"
}, {
	id: 2,
	name: "petCategories",
	type: "string",
	desc: "宠物类别",
	isRequired: "false",
	exampleValue: "狗"
}]}];

// 返回的数据示例
const interfaceProps: Interface = {
  id: 123445678,
  name: "查询宠物详情",
  method: "post",
  path: "/pet/{petId}",
  state: 4,
  tags: [{
    id: 1,
    name: "宠物"
  }, {
    id: 2,
    name: "猫"
  }, {
    id: 3,
    name: "狗"
  }],
  createdAt: "2023年8月3日",
  changedAt: "几秒前",
  changer: "狐友",
  creator: "狐友",
  leader: "未设置",
  catalog: "示例项目",
  desc: "aaaaaaaaaaaaaaaaaaaaaaaa",
	paramCategories: categoriesProps,
	responses: responsesProps
};

// 打开接收参数接口
// const DetailsInterface: React.FC<Props> = ({ interfaceProps }) => {

// 默认关闭接收参数接口
const DetailsInterface: React.FC = () => {
  const { id, name, method, path, state, tags, createdAt,
      changedAt, changer, creator, leader, catalog, desc, paramCategories, responses } = interfaceProps;

			// 改变接口状态
      const [ interState, setInterState ] = useState(state);

			// 改变接口状态后的反馈
			const [messageApi, contextHolder] = message.useMessage();

      return (
				<>
					<Space direction='vertical' style={{width: "100%"}}>
							<div className='interfaceContent flex'>
									<Space>
											<Text>{name}</Text>
											<Text>{id}</Text>
									</Space>
									<Space>
											<Button type="primary" icon={<ThunderboltOutlined />}>
													运行
											</Button>
											<Button icon={<CodeOutlined />}>生成代码</Button>
											<Button>删除</Button>
									</Space>
							</div>
							<div className='interfaceContent'>
								<Tag color={getMethodColor(method)}>{method}</Tag>
								<Space>
										<Text>{path}</Text>
										<Select value={interState} onChange={(value) => {
											const loadingMessage = messageApi.loading('加载中...', 1);
											setTimeout(() => {
												message.success('已保存', 1);
												loadingMessage();
												setInterState(value);
											}, 1000);
											// 向后端发送请求
											// const loadingMessage = messageApi.loading('加载中...', 1);
											// axios.post('', {state: value})
											// .then(response => {
											// 	message.success('已保存', 1);
											// 	loadingMessage();
											// 	setInterState(response.data);
											// });
										}}>
											<Option value={1}>
												<Badge status="success" text="已发布" />
											</Option>
											<Option value={2}>
												<Badge status="warning" text="测试中" />
											</Option>
											<Option value={3}>
												<Badge status="default" text="将废弃" />
											</Option>
											<Option value={4}>
												<Badge status="processing" text="开发中" />
											</Option>
										</Select>
								</Space>
							</div>
							<div className='interfaceContent'>
								{tags.map((tag) => (
									<Tag key={tag.id} color="blue">{tag.name}</Tag>
								))}
							</div>
							<Space className='interfaceContent' size={'large'}>
								<Space>
									<Text type="secondary">创建时间</Text>
									<Text>{createdAt}</Text>
								</Space>
								<Space>
									<Text type='secondary'>修改时间</Text>
									<Text>{changedAt}</Text>
								</Space>
								<Space>
									<Text type='secondary'>修改者</Text>
									<Text>{changer}</Text>
								</Space>
								<Space>
									<Text type='secondary'>创建者</Text>
									<Text>{creator}</Text>
								</Space>
								<Space>
									<Text type='secondary'>责任人</Text>
									<Text>{leader}</Text>
								</Space>
								<Space>
									<Text type='secondary'>目录</Text>
									<Text>{catalog}</Text>
								</Space>
							</Space>
							<div className='interfaceContent'>
								<Title level={5} style={{fontWeight: "500"}}>接口说明</Title>
								<Text type="secondary">{desc}</Text>
							</div>
							{contextHolder}
					</Space>
					<DetailsMock />
					<DetailsParam paramCategoriesProps={paramCategories} />
					<DetailsResponse responsesProps={responses} />
				</>
      );
}

function getMethodColor(method: string): string {
  if (method === "get") {
    return "#4CAF50";
  } else if (method === "post") {
    return "#FA8C16";
  } else if (method === "put") {
    return "#1890FF";
  } else if (method === "del") {
    return "#FA541C";
  } else {
    return "default";
  }
}

export default DetailsInterface
