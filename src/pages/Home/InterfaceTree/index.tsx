// import type { DataNode,TreeProps } from 'antd/es/tree';
import { Tree } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';
import style from './index.module.scss'
import InterfaceView from '../InterfaceView';

interface interfaceProps {
    items: any[],
    setItems: any,
    setActiveKey: any
}

const InterfaceTree: React.FC<interfaceProps> = (props: interfaceProps) => {
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

    const onSelect= (selectKey:any, info:any) => {
        // 如果是一级目录则展示接口列表 如果是二级目录则展示接口详情信息
        if(info.node.label=='1'){
            const newPanes = props.items.find((item)=>item.key=='apiList')
            newPanes.label = info.node.title
            const newItems = [...props.items]
            props.setItems(newItems)
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

    return (
        <div >
            <Tree
                rootClassName={style.apiTree}
                treeData={treeData}
                titleRender={(nodeData: any) => {
                    return (
                        <>
                            <FolderTwoTone />&nbsp;
                            {<span  >{nodeData.title}</span>}
                        </>
                    );
                }}
                onSelect={onSelect}
            />
        </div>
    )
}

export default InterfaceTree