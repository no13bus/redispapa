
import './index.less'


import { message, Select, Alert } from 'antd';
import React, { useState, useEffect } from 'react';
import socketIOClient, { Socket } from "socket.io-client";
import { ChartData, ChartType } from '@/data.d'
import {
  GithubOutlined,
} from '@ant-design/icons';
import { formatDate }  from '@/utils/helper';

import TableData from '@/components/TableData'
import Chart from '@/components/Chart'
import Stat from '@/components/Stat'
import Command from '@/components/Command'



const { Option } = Select;

const Main: React.FC = () => {

  const [socket, setSocket] = useState<Socket>()

  const [servers, setServers] = useState<string[]>([]);
  const [serverSelected, setServerSelected] = useState("");

  const [cmd, setCmd] = useState<ChartData[]>([]);
  const [cpu, setCpu] = useState<ChartData[]>([]);
  const [mem, setMem] = useState<ChartData[]>([]);
  const [tableData, setTableData] = useState([]);
  const [serverStat, setServerStat] = useState([]);

  const [execResult, setExecResult] = useState("")
  const [execStat, setExecStat] = useState("")


  const handler_cmd = (data) => {
    let result = []
    for (var i = 0; i < data.length; i++) {
      let item = {
        time: data[i].x.substring(11),
        value: data[i].y,
        category: 'commands/s'
      }
      result.push(item)
    }
    setCmd(result)
  }

  const handler_cpu = (data) => {
    let result = [];
    for (var i = 0; i < data.length; i++) {
      result.push({
        time: data[i].x.substring(11),
        value: data[i].y_s,
        category: 'sys'
      });
      result.push({
        time: data[i].x.substring(11),
        value: data[i].y_u,
        category: 'user'
      });
    }
    setCpu(result)
  }

  const handler_mem = (data) => {
    let result = []
    for (var i = 0; i < data.length; i++) {
      result.push({
        time: data[i].x.substring(11),
        value: data[i].y_mem,
        category: 'memory'
      });
      result.push({
        time: data[i].x.substring(11),
        value: data[i].y_rss,
        category: 'memory_rss'
      });
    }
    setMem(result)
  }



  const wsConnect = () => {
    if(socket){
      socket.on("connect", () => {
        socket.emit('event', {
          data: 'I am connected!'
        });
      });
    }
    
  }

  const wsDisConnect = () => {
    if(socket){
      socket.on('disconnect', function () {
        message.warn('Oh! The server is disconnected.Please check!');
      });
    }
    
  }

  const wsServers = () => {
    if(socket){
      socket.on('servers', msg => {
        setServerSelected(msg.data[0])
        setServers(msg.data)
      });
    }
    
  }


  const wsResponse = () => {
    if(socket){
      socket.on('response', msg => {
        if (serverSelected!="" && serverSelected == msg.server) {
          handler_cmd(msg.commands)
          handler_cpu(msg.cpu);
          handler_mem(msg.mem);
    
          setTableData(msg.table)
          setServerStat(msg.stat)
        }
      });
    }
    
  }

  const wsResult = () => {
    if(socket){
      socket.on('result', (msg) => {
        setExecResult(msg.data)
        if (msg.m_type == 'info') {
          setExecStat("info")
        } else {
          setExecStat("error")
        }
      });
    }
  }


  useEffect(() => {
    setSocket(socketIOClient())
  }, []);

  wsConnect()
  wsDisConnect()
  wsServers()
  wsResult()
  wsResponse()

  const onSubmit = (values: any) => {
    if(socket){
      socket.emit('command_exec', { command: values.command, args: values.args, r_server: serverSelected });
    }
  }



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
            <Select value={serverSelected} className="select-options" onChange={(value) => { setServerSelected(value) }}>
              {servers.length > 0 && servers.map(serverItem =>
                <Option key={serverItem} value={serverItem}>{serverItem}</Option>
              )
              }
            </Select>
          </div>
        </div>
      </header>

      <div className="content">
        <div className="charts">
          <div className="title">Charts</div>
          <div className="charts-container">
            <Chart chartTitle='commands/s' chartData={cmd} />
            <Chart chartTitle='used_cpu' chartData={cpu} />
            <Chart chartTitle='used_memory' chartData={mem} />
          </div>
        </div>

        <div className="tables">
          <div className="title">Table</div>
          <TableData dataSource={tableData} />
        </div>

        <div className="others">
          <div>
            <div className="title">Redis-Server</div>
            <Stat dataSource={serverStat} />
          </div>

          <div>
            <div className="title">Command Exec</div>
            <Command onSubmit={onSubmit} />
            {execResult && <Alert
              style={{ marginTop:"20px" }}
              message={execStat=="info"? "Success" : "Warning"}
              description={`Time: ${formatDate(new Date())} Result: ${execResult} `}
              type={execStat=="info"? "success" : "warning"}
              showIcon
              closable
            />}
          </div>
        </div>


      </div>

      <footer>RedisPAPA ©2022 Created by <a href='https://github.com/no13bus' target="_blank">no13bus</a></footer>
    </div>


  )
}

export default Main