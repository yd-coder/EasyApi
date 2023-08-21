import React from 'react'
import { Select } from 'antd'

/**
 * 可以搜索的下拉列表输入框
 *
 * 应用: src\pages\Home\NewInterfaceFile 责任人输入框
 */

interface SearchInputProps {
	placeholder: string
	values: ValueItem[]
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

// const onChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const onSearch = (value: string) => {
//   console.log('search:', value);
// };

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder,
	values,
	handleSelect
}) => (
	<Select
		showSearch
		placeholder={placeholder}
		optionFilterProp="children"
		onSelect={handleSelect}
		filterOption={(input, option) =>
			(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
		}
		options={values}
		style={{ width: '100%' }}
	/>
)

export default SearchInput
