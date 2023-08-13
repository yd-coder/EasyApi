/** 
 *  Body 标签页
 *  位置:请求参数表单下的 Body标签 
 *
 */

import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `jason`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `xml`,
    children: `Content of Tab Pane 2`,
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;

