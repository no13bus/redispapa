import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface DataType {
  time: string;
  us: number;
  sy: number;
  cl: number;
  bcl: number;
  mem: number;
  rss: number;
  keys: number;
  cmd: number;
  exp: number;
  evt: number;
  hit: number;
  mis: number;
  aofcs: number;

}

interface PropsType {
  dataSource: DataType[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'time',
    dataIndex: 'time',
  },
  {
    title: 'us',
    dataIndex: 'us',
  },
  {
    title: 'sy',
    dataIndex: 'sy',
  },
  {
    title: 'cl',
    dataIndex: 'cl',
  },
  {
    title: 'bcl',
    dataIndex: 'bcl',
  },
  {
    title: 'mem',
    dataIndex: 'mem',
  },
  {
    title: 'rss',
    dataIndex: 'rss',
  },
  {
    title: 'keys',
    dataIndex: 'keys',
  },
  {
    title: 'cmd/s',
    dataIndex: 'cmd',
  },
  {
    title: 'exp/s',
    dataIndex: 'exp',
  },
  {
    title: 'evt/s',
    dataIndex: 'evt',
  },
  {
    title: 'hit/s',
    dataIndex: 'hit',
  },
  {
    title: 'mis/s',
    dataIndex: 'mis',
  },
  {
    title: 'aofcs',
    dataIndex: 'aofcs',
  },
  
];



const TableData: React.FC<PropsType> = ({ dataSource }) => {

  return (
    <Table
      size={'small'}
      rowKey={record=>record.time}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  )

}

export default TableData;