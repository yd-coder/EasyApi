import React from 'react'
import { Space, Tooltip, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import Editor from '@monaco-editor/react'
import copy from 'copy-to-clipboard'
import styles from './index.module.scss'

const ResponseView: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage()
	const json = {
		code: 200,
		msg: '短信验证码发送成功！',
		data: '2578'
	}
	const handleCopy = () => {
		if (copy(JSON.stringify(json, null, 4))) {
			messageApi.success('复制成功')
		} else {
			messageApi.error('复制失败，请手动复制')
		}
	}
	return (
		<div>
			{contextHolder}
			<Space direction="horizontal" className={styles.responseHeader}>
				<span>请求响应</span>
				<span>JSON</span>
				<span>utf8</span>
				<Tooltip title="复制内容" color="blue">
					<CopyOutlined className={styles.copy} onClick={handleCopy} />
				</Tooltip>
			</Space>
			<Editor
				height="30vh"
				defaultLanguage="json"
				defaultValue={JSON.stringify(json, null, 4)}
			/>
		</div>
	)
}

export default ResponseView
