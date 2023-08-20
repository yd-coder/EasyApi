import React from 'react';
import { Select } from 'antd';

/**
 * 选项分组 下拉列表输入框
 * 
 *  应用: src\pages\Home\NewInterfaceFile 服务(前置url)输入框
 */

interface GroupInputProps{
    defaultValue: string
    options: GroupOption[]
}

interface Option {
    label: string;
    value: string;
  }
  
interface GroupOption {
    label: string;
    options: Option[];
}
  

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const GroupInput: React.FC<GroupInputProps> = ({ defaultValue, options }) => (
  <Select
    defaultValue={defaultValue}
    style={{ width: '100%' }}
    onChange={handleChange}
    options={options}
  />
);

export default GroupInput;