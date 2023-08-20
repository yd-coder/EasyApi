// import type { DataNode,TreeProps } from 'antd/es/tree';
import { Tree, Popover, Dropdown, Modal, Form, Input} from 'antd';
import { FolderTwoTone, ApiTwoTone, EditOutlined, RestOutlined } from '@ant-design/icons';
import style from './index.module.scss'
import InterfaceView from '../InterfaceView';
import NewInterface from '../NewInterface';
import { useRef } from 'react'
import type { MenuProps } from 'antd';

interface interfaceProps {
    items: any[],
    setItems: any,
    setActiveKey: any,
}

const InterfaceTree: React.FC<interfaceProps> = (props: interfaceProps) => {
    const newTabIndex = useRef(0);
    const treeData: any[] = [
        {
            title: '根目录',
            key: '0',
            children: [],
            label: 1,
        },
        {
            title: '示例项目',
            key: '0-0',
            label: 1,
            children: [
                {
                    title: 'GET 查询宠物详情',
                    key: '0-0-0',
                    label: 2,
                },
                {
                    title: 'POST 新建宠物信息',
                    key: '0-0-1',
                    label: 2,
                },
            ],
        },
    ];

    // 下拉框数据
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div onClick={(e)=>rename(e)}>重命名</div>
          ),
          icon: <EditOutlined />,
        },
        {
          key: '2',
          danger: true,
          label: (
            <div onClick={(e)=>deleteInterface(e)}>删除</div>
          ),
          icon: <RestOutlined />
        },
      ];

    const onSelect= (selectKey:any, info:any) => {
        // 如果是一级目录则展示接口列表 如果是二级目录则展示接口详情信息
        if(info.node.label=='1'){
            const newPanes = props.items.find((item)=>item.key=='apiList')
            newPanes.label = info.node.title
            const newItems = [...props.items]
            props.setItems(newItems)
            props.setActiveKey("apiList");
        }else {
            const activeKey = selectKey[0];
            // 查找一下接口是否在tab展示，没有就新建一个tab栏
            const f = props.items.some((item)=>item.key==selectKey)
            if(!f){
                const newPanes = [...props.items];
		        newPanes.push({ label: info.node.title, children: <InterfaceView />, key: activeKey });
		        props.setItems(newPanes);
            }
            props.setActiveKey(activeKey);
        }
    };

    // 点击加号新建接口
    const addInterface = (e:any)=>{
        // 阻止事件冒泡
        e.stopPropagation()
        // tab栏新开一页 组件选择NewInterface
        const newActiveKey = `Tab${newTabIndex.current++}`;
        const newPanes = [...props.items];
		newPanes.push({ label: "新建接口", children: <NewInterface />, key: newActiveKey });
		props.setItems(newPanes);
        props.setActiveKey(newActiveKey);
    }

    // 重命名接口
    const rename = (e: any)=>{
        e.stopPropagation()
        Modal.confirm({
            title: "重命名",
            okText:'确定',
            cancelText:'取消',
            centered: true,
            content: (
                <Form>
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{required: true,message: '请输入名称'},]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            ),
            async onOk() {
                // 改名成功操作
            },
          });
    }

    // 删除接口
    const deleteInterface = (e: any)=>{
        e.stopPropagation()
        Modal.confirm({
            title: "确定删除接口？",
            okText:'确定',
            cancelText:'取消',
            centered: true,
            async onOk() {
                // 删除成功操作
            },
          });
    }

    return (
        <div >
            <Tree
                rootClassName={style.apiTree}
                treeData={treeData}
                titleRender={(nodeData: any) => {
                    return (
                        <div className={style.treeNode}>
                            {nodeData.label ===1 ?<FolderTwoTone />:<ApiTwoTone /> }&nbsp;
                            {<span  >{nodeData.title}</span>}
                            {nodeData.label ===1 && (
                                <Popover content='新建接口' >
                                    <span className={style.add} onClick={(e)=>addInterface(e)}>+</span>
                                </Popover>
                            )}
                            {nodeData.label ===2 && (
                                <Dropdown menu={{ items }}>
                                    <div className={style.add}>···</div>
                                </Dropdown>
                            )}
                        </div>
                    );
                }}
                onSelect={onSelect}
            />
        </div>
    )
}

export default InterfaceTree
