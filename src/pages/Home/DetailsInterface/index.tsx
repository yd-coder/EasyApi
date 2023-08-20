import { useState } from 'react';
import { ThunderboltOutlined, CodeOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Select, Badge, Typography, message, Popconfirm } from 'antd';
import DetailsMock from "./DetailsMock";
import DetailsParam from "./DetailsParam";
import DetailsResponse from "./DetailsResponse";

import { Interface, Category, Response } from './typeDef';

const { Title, Text } = Typography;
const { Option } = Select;

// 后端返回的数据
type Props = {
  // props: Interface;
	onRunClick: (value: string) => void;
}

const responsesProps: Response[] = [{
  id: "1",
  name: "成功",
  statusCode: "200",
  contentFormat: "JSON",
  node: {
    id: "1",
    name: "node1",
    type: "integer",
    chineseName: "结点",
    desc: "状态码",
    isRequired: "true",
    allowNull: "true",
    child: [{
      id: "2",
      name: "node2",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
			child: [{
				id: "4",
				name: "data4",
				type: "object(Pet)",
				chineseName: "",
				desc: "宠物信息",
				isRequired: "true",
				allowNull: "false",
				child: [{
					id: "5",
					name: "id5",
					type: "integer",
					chineseName: "",
					desc: "宠物ID编号",
					isRequired: "false",
					allowNull: "false",
				}, {
					id: "6",
					name: "name6",
					type: "string",
					chineseName: "名称",
					desc: "名称",
					isRequired: "false",
					allowNull: "true",
				}]
			}]
    }, {
      id: "3",
      name: "node3",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
    }]
  }
}, {
  id: "2",
  name: "失败",
  statusCode: "400",
  contentFormat: "JSON",
  node: {
    id: "7",
    name: "node11",
    type: "integer",
    chineseName: "结点",
    desc: "状态码",
    isRequired: "true",
    allowNull: "true",
    child: [{
      id: "8",
      name: "node22",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
    }, {
      id: "9",
      name: "node33",
      type: "integer",
      chineseName: "结点",
      desc: "状态码",
      isRequired: "true",
      allowNull: "true",
			child: [{
				id: "10",
				name: "data44",
				type: "object(Pet)",
				chineseName: "",
				desc: "宠物信息",
				isRequired: "true",
				allowNull: "false",
				child: [{
					id: "11",
					name: "id55",
					type: "integer",
					chineseName: "",
					desc: "宠物ID编号",
					isRequired: "false",
					allowNull: "false",
				}, {
					id: "12",
					name: "name66",
					type: "string",
					chineseName: "名称",
					desc: "名称",
					isRequired: "true",
					allowNull: "true",
				}]
			}]
    }]
  }
}];

const categoriesProps: Category[] = [{id: "1", name: "Query", params: [{
	id: "1",
	name: "petName",
	type: "string",
	desc: "宠物名称",
	isRequired: "true",
	exampleValue: "小柴"
}, {
	id: "2",
	name: "petGender",
	type: "string",
	desc: "宠物性别",
	isRequired: "false",
	exampleValue: "女"
}]}, {id: "2", name: "Path", params: [{
	id: "3",
	name: "petId",
	type: "integer",
	desc: "宠物ID",
	isRequired: "true",
	exampleValue: "123"
}, {
	id: "4",
	name: "petCategories",
	type: "string",
	desc: "宠物类别",
	isRequired: "false",
	exampleValue: "狗"
}]}];

// 返回的数据示例
const interfaceProps: Interface = {
  id: "123445678",
  title: "查询宠物详情",
  method: "post",
  path: "/pet/{petId}",
  state: "4",
  tags: [{
    id: "1",
    name: "宠物"
  }, {
    id: "2",
    name: "猫"
  }, {
    id: "3",
    name: "狗"
  }],
  createdAt: "2023年8月3日",
  updatedAt: "几秒前",
  updatePerson: "狐友",
  createPerson: "狐友",
  leader: "未设置",
  catalog: "示例项目",
	params: categoriesProps,
	responses: responsesProps
};

// 打开接收参数接口
// const DetailsInterface: React.FC<Props> = ({ props }) => {

// 默认关闭接收参数接口
const DetailsInterface: React.FC<Props> = ({ onRunClick }) => {
  const { id, title, method, path, state, tags, createdAt,
      updatedAt, updatePerson, createPerson, leader, catalog, desc, params, responses } = interfaceProps;

			// 修改接口状态
      const [ interState, setInterState ] = useState(state);

			// 修改接口状态后的反馈
			const [messageApi, contextHolder] = message.useMessage();

			// 修改接口状态
			const handleSelectChange = (value: string) => {
				// const loadingMessage = messageApi.loading('加载中...', 1);
				// setTimeout(() => {
				// 	message.success('已保存', 1);
				// 	loadingMessage();
				// 	setInterState(value);
				// }, 1000);
				// 向后端发送请求
				const url = "/interface";
				const options = {
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						state: value
					})
				};
				changeState(url, options);
			};

			async function changeState(url: string, options: RequestInit) {
				const loadingMessage = messageApi.loading('加载中...', 1);
				try {
					const response = await fetch(url, options);
					const data = await response.json();
					message.success('已保存', 1);
					loadingMessage();
					setInterState(data);
				} catch (error) {
					message.error('保存失败', 1);
					loadingMessage();
					console.error(error);
				}
			}

			// 删除接口
			const handleDelete = () => {
				const url = '/interface';
				const options = {
					method: 'DELETE',
					header: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						interfaceId: id
					})
				};
				deleteInterface(url, options);
			};

			async function deleteInterface(url: string, options: RequestInit) {
				const loadingMessage = messageApi.loading('加载中...', 1);
				try {
					const response = await fetch(url, options);
					const data = await response.json();
					message.success('删除成功', 1);
					loadingMessage();
				} catch(error) {
					console.error(error);
					message.success('删除失败', 1);
					loadingMessage();
				}
			}

			// 点击运行
			const handleRunClick = () => {
				onRunClick('3');
			}

      return (
				<>
					{contextHolder}
					<Space direction='vertical' style={{width: "100%", overflow: 'hidden'}} >
							<div className='interfaceContent' style={{display: 'flex', justifyContent: 'space-between'}}>
									<Space>
											<Text>{title}</Text>
											<Text copyable>{id}</Text>
									</Space>
									<Space>
											<Button type="primary" icon={<ThunderboltOutlined />} onClick={handleRunClick}>
													运行
											</Button>
											<Button icon={<CodeOutlined />}>生成代码</Button>
											<Popconfirm
												title="删除接口"
												description="确定删除该接口？"
												onConfirm={handleDelete}
												okText="确认"
												cancelText="取消"
											>
												<Button>删除</Button>
											</Popconfirm>
									</Space>
							</div>
							<div className='interfaceContent'>
								<Tag color={getMethodColor(method)}>{method}</Tag>
								<Space>
										<Text copyable>{path}</Text>
										<Select value={interState} onChange={handleSelectChange}>
											<Option value='1'>
												<Badge status="success" text="已发布" />
											</Option>
											<Option value='2'>
												<Badge status="warning" text="测试中" />
											</Option>
											<Option value='3'>
												<Badge status="default" text="将废弃" />
											</Option>
											<Option value='4'>
												<Badge status="processing" text="开发中" />
											</Option>
										</Select>
								</Space>
							</div>
							{tags &&
								<div className='interfaceContent'>
									{tags.map((tag) => (
										<Tag key={tag.id} color="blue">{tag.name}</Tag>
									))}
								</div>
							}
							<Space className='interfaceContent' size={'large'}>
								<Space>
									<Text type="secondary">创建时间</Text>
									<Text>{createdAt}</Text>
								</Space>
								<Space>
									<Text type='secondary'>修改时间</Text>
									<Text>{updatedAt}</Text>
								</Space>
								<Space>
									<Text type='secondary'>修改者</Text>
									<Text>{updatePerson}</Text>
								</Space>
								<Space>
									<Text type='secondary'>创建者</Text>
									<Text>{createPerson}</Text>
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
							{desc &&
								<div className='interfaceContent'>
									<Title level={5} style={{fontWeight: "500"}}>接口说明</Title>
									<Text type="secondary">{desc}</Text>
								</div>
							}
					</Space>
					<DetailsMock />
					<DetailsParam props={params} />
					<DetailsResponse props={responses} />
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
