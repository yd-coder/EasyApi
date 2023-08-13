/**
 *  Body 标签页
 *  位置:请求参数表单下的 Body标签
 *
 */

import React, { useState } from 'react'
import { Segmented, Input, Tabs } from 'antd'
import DynamicForm from '../DynamicForm'
import styles from './index.module.scss'

const { TextArea } = Input

const tabOptions = ['json', 'xml'] //存储标签

const options = ['数据结构', '示例'] //存储分段选择器数据

// Body表单父组件 标签页
const BodyComponent: React.FC = () => {
	return (
		<>
			<Tabs
				tabPosition="left"
				items={tabOptions.map((optionItem, index) => ({
					label: optionItem,
					key: String(index + 1),
					children: <BodyComponentItem tipName={optionItem} />
				}))}
			/>
		</>
	)
}

// Body下的二级表单 分段选择器
type SegmentedValue = string | number
interface BodyComponentItemProps {
	tipName: string
}

const BodyComponentItem: React.FC<BodyComponentItemProps> = (props) => {
	const [showItem, setShowItem] = useState('数据结构')
	const { tipName } = props
	const cpp = (value: SegmentedValue) => {
		setShowItem(value.toString())
	}

	return (
		<>
			<div className={styles["form-header"]}>
				<div className="segmented-box">
					<Segmented options={options} onChange={cpp} />
				</div>
				<div className="tip-info">
					<TipInfo name={tipName} />
				</div>
			</div>
			<DynamicComponent childrenVal={showItem} />
		</>
	)
}

//分段选择器关联区域 展示提示信息、表单组或者文本框
interface DynamicComponentProps {
	childrenVal: string
}

const DynamicComponent: React.FC<DynamicComponentProps> = (props) => {
	const { childrenVal } = props

	switch (childrenVal) {
		case '数据结构':
			return <DynamicForm tabKey="json" />

		case '示例':
			return <TextArea rows={10} placeholder="添加返回响应的格式" />
		default:
			return null
	}
}

// 根据不同标签页给出的提示信息
interface TipInfoProps {
	name: string
}

const TipInfo: React.FC<TipInfoProps> = (props) => {
	const { name } = props
	switch (name) {
		case 'xml':
			return '<?xml version="1.0" encoding="UTF-8"?>'
		case 'json':
			return '{}JSON'
		default:
			return null
	}
}

export default BodyComponent
