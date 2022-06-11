
import './index.less'


import { Breadcrumb, Layout, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import {
  GithubOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/charts';

import  TableData  from '@/components/TableData'



const { Option } = Select;


const Main: React.FC = () => {

  const [response, setResponse] = useState("");

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };


  useEffect(() => {
    const socket = socketIOClient("/777");
    socket.on("connect", data => {
      // setResponse(data);
      console.log(99999)
      console.log(data)
    });
  }, []);

  


  return (
    <div className="main">
      <header>
        <div className="header-wrapper">
          <div className="header-logo">
            RedisPAPA
          </div>
          <nav>
            <ul className="header-nav">
              <li><a href="https://github.com/no13bus/redispapa" target="_blank"><GithubOutlined />GitHub</a></li>
            </ul>
          </nav>
          <div className="header-placeholder">

          </div>
          <div className="header-select">
            <Select defaultValue="lucy" className="select-options" onChange={()=>{}}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </div>
        </div>
      </header>

      <div className="content">
        <div className="charts">
          <div className="charts-title">Charts</div>
          <div className="charts-container">
            <div className="charts-item"><Line {...config} /></div>
            <div className="charts-item"><Line {...config} /></div>
            <div className="charts-item"><Line {...config} /></div>
          </div>
        </div>

        <TableData />


        {/* <div className="tables">
          <div className="tables-title">Charts</div>
          <div className="tables-container">
            
          </div>
        </div> */}

      </div>

      



    </div>


  )
}

export default Main