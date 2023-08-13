import React from 'react';
import { Select } from 'antd';

/**
 * 可以搜索的下拉列表输入框
 * 
 * 应用: src\pages\Home\NewInterfaceFile 责任人输入框
 */

interface SearchInputProps {
  placeholder:string
  values: ValueItem[];
}

interface ValueItem {
  value: string;
  label: string;
}

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, values }) => (
  <Select
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={values}
    style={{width:'100%'}}
  />
);

export default SearchInput;