import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import './index.less'

interface DataType {
  key: string;
  value: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'key',
    dataIndex: 'key',
    className: 'redis-key'
  },
  {
    title: 'value',
    dataIndex: 'value',
  },
  
];

interface PropsType {
  dataSource: DataType[]
}

const StatTable: React.FC<PropsType> = ( { dataSource } ) => {

  
  return (
    <Table
      size={'small'}
      showHeader={false}
      rowKey={record=>record.key}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  )

}

export default StatTable;