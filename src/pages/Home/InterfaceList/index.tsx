import { ActionType, ProColumns, ProTable,ProFormInstance } from '@ant-design/pro-components';
import {useRef} from 'react'

interface DataType {
	id: string,
	title: string,
}

const InterfaceList: React.FC = () => {
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const columns: ProColumns[] = [
        {
          title: "接口名称",
          dataIndex: "name",
          hideInSearch: true,
          ellipsis: true,
        },
        {
          title: "请求类型",
          dataIndex: "type",
          ellipsis: true,
          hideInSearch: true,
        },
        {
          title: "接口路径",
          dataIndex: "interfacePath",
          hideInSearch: true,
          ellipsis: true,
          width: '300px',
        },
        {
          title: "接口分组",
          dataIndex: "interfaceGroup",
          hideInSearch: true,
          ellipsis: true,
        },
        {
          title: "接口状态",
          hideInSearch: true,
          dataIndex: "interfaceState",
          ellipsis: true,
        },
      ];

	return (
		<div>
			<ProTable<DataType>
			  columns={columns}
              formRef={formRef}
              actionRef={actionRef}
              search={false}
              headerTitle={<b>示例项目</b>}
            />
		</div>
	)
}

export default InterfaceList