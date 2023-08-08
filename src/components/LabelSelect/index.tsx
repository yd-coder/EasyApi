import React, { useState } from 'react';
import { Select, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

/**
 * 可以选择多个标签的下拉列表输入框，支持搜索
 * 
 * 应用: src\pages\Home\NewInterfaceFile 标签输入框
 */

interface LabelSelectProps {
    options: ValueItem[];
    width: string;
    placeholder: string;
    defaultValue: string; 
  }
  
  interface ValueItem {
    value: string;
    label: string;
  }

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const LabelSelect: React.FC <LabelSelectProps>= ({ width, placeholder, defaultValue, options }) => {
    
  const [size] = useState<SizeType>('middle');

  return (
    <>
      <Space direction="vertical" style={{ width }}>
        <Select
          mode="multiple"
          size={size}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleChange}
          style={{ width: '100%' }}
          options={options}
        />
      </Space>
    </>
  );
};

export default LabelSelect;