// import type { DataNode,TreeProps } from 'antd/es/tree';
import { Tree } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';
import style from './index.module.scss'

interface interfaceProps {
    items: any[],
    setItems: any
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
                    children: [
                        {
                            title: '在售宠物',
                            key: '0-0-0-0',
                            label: 3,
                        },
                        {
                            title: 'ID不存在',
                            key: '0-0-0-1',
                            label: 3,
                        },
                    ],
                },
                {
                    title: 'POST 新建宠物信息',
                    key: '0-0-1',
                    label: 2,
                },
            ],
        },
    ];

    const onSelect= (_:any, info:any) => {
        // 如果是一级目录则展示接口列表
        if(info.node.label=='1'){
            const newPanes = props.items.find((item)=>item.key=='apiList')
            newPanes.label = info.node.title
            const newItems = [...props.items]
            props.setItems(newItems)
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