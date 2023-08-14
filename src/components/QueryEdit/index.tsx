/**
 * 请求参数编辑组件
 * 可用于运行接口页面、文档修改页面
 */

import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Params from './Params'
import Body from './Body'
import Headers from './Headers'
import Cookies from './Cookies'

const items: TabsProps['items'] = [
	{
		key: '1',
		label: `Params`,
		children: <Params />
	},
	{
		key: '2',
		label: `Body`,
		children: <Body />
	},
	{
		key: '3',
		label: `Headers`,
		children: <Headers />
	},
	{
		key: '4',
		label: `Cookies`,
		children: <Cookies />
	}
]

const QueryEdit: React.FC = () => {
	return <Tabs defaultActiveKey="1" items={items} />
}

export default QueryEdit
