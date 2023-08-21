import React, { useState } from 'react'
import { Select, Space } from 'antd'
import type { SizeType } from 'antd/es/config-provider/SizeContext'

/**
 * 可以选择多个标签的下拉列表输入框，支持搜索
 *
 * 应用: src\pages\Home\NewInterfaceFile 标签输入框
 */
type StringArray = string

interface LabelSelectProps {
	options: ValueItem[]
	width: string
	placeholder: string
	defaultValue: StringArray[]
	handleSelect: SelectHandler<any, ValueItem>
}

interface ValueItem {
	value: string
	label: string
}

// 详见 '../../../node_modules/.pnpm/rc-select@14.5.2_react-dom@18.2.0_react@18.2.0/node_modules/rc-select/lib/Select.d.ts'
declare type SelectHandler<
	ValueType,
	OptionType extends BaseOptionType = DefaultOptionType
> = (value: ValueType, option: OptionType) => void
interface BaseOptionType {
	disabled?: boolean
	[name: string]: any
}
interface DefaultOptionType extends BaseOptionType {
	label: React.ReactNode
	value?: string | number | null
	children?: Omit<DefaultOptionType, 'children'>[]
}

// const handleChange = (value: string | string[]) => {
//   console.log(`Selected: ${value}`);
// };

const LabelSelect: React.FC<LabelSelectProps> = ({
	width,
	placeholder,
	defaultValue,
	options,
	handleSelect
}) => {
	const [size] = useState<SizeType>('middle')

	return (
		<>
			<Space direction="vertical" style={{ width }}>
				<Select
					mode="multiple"
					size={size}
					placeholder={placeholder}
					defaultValue={defaultValue}
					onSelect={handleSelect}
					style={{ width: '100%' }}
					options={options}
				/>
			</Space>
		</>
	)
}

export default LabelSelect
