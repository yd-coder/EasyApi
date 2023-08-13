import React from 'react'
import { Input } from 'antd'
import styles from './index.module.scss'

const { TextArea } = Input


type FormProps = {
	values: {
		httpCode: string;
		componentName: string;
		selectedValue: string
	  };
}

const BasicResponseForm: React.FC <FormProps> = (props) => {

	const { httpCode, componentName, selectedValue } = props.values;

	return (
		<div className={styles['basic-response']}>
			<div className="info-bar">
				<div className="tip-text">响应组件名称 : {componentName}</div>
				<div className="tip-text">响应状态码 : {httpCode}</div>
				<div className="tip-text">Content-type : text/{selectedValue}</div>
			</div>
			<TextArea rows={20} placeholder="添加返回响应的格式" />
		</div>
	)
}

export default BasicResponseForm
