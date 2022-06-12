
import './index.less'


import { Breadcrumb, message, Select } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
import {
  GithubOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/charts';

import TableData from '@/components/TableData'



const { Option } = Select;


const Main: React.FC = () => {

  const [socket, setSocket] = useState(null)

  let ws = useRef()

  if(ws.current == null){
    ws.current = socketIOClient()

    ws.current.on("connect", () => {
      console.log(ws.current.id); // x8WIv7-mJelg7on_ALbx
    });

    ws.current.on("disconnect", () => {
      console.log(ws.current.id); // x8WIv7-mJelg7on_ALbx
    });

    ws.current.on('servers', () => {
      console.log("aaaaa")
      // setServers(msg.data)
      // setServerSelected(msg.data[0])
    });

  }

  



  const [errorMsg, setErrorMsg] = useState("");
  const [servers, setServers] = useState<string[]>([]);
  const [serverSelected, setServerSelected] = useState("");

  const [execResult, setExecResult] = useState("")

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
    xField: 'time',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };



  const handler_cmd = (cmd) => {
    // body...
    // var seriesArray = $scope.chartConfig_cmd.series;
    // seriesArray[0].data = [];
    // for (var i = 0; i < cmd.length; i++) {
    //   seriesArray[0].data.push({
    //     x: (new Date(Date.parse(cmd[i].x) + 8 * 60 * 60 * 1000).getTime()),
    //     y: cmd[i].y
    //   });
    // }
  }

  const handler_cpu = (cpu) => {
    // body...
    // var seriesArray = $scope.chartConfig_cpu.series;
    // seriesArray[0].data = [];
    // seriesArray[1].data = [];
    // for (var i = 0; i < cpu.length; i++) {
    //   seriesArray[0].data.push({
    //     x: (new Date(Date.parse(cpu[i].x) + 8 * 60 * 60 * 1000).getTime()),
    //     y: cpu[i].y_s
    //   });
    //   seriesArray[1].data.push({
    //     x: (new Date(Date.parse(cpu[i].x) + 8 * 60 * 60 * 1000).getTime()),
    //     y: cpu[i].y_u
    //   });
    // }
  }

  const handler_mem = (mem) => {
    // body...
    // var seriesArray = $scope.chartConfig_mem.series;
    // seriesArray[0].data = [];
    // seriesArray[1].data = [];
    // for (var i = 0; i < mem.length; i++) {
    //   seriesArray[0].data.push({
    //     x: (new Date(Date.parse(mem[i].x) + 8 * 60 * 60 * 1000).getTime()),
    //     y: mem[i].y_mem
    //   });
    //   seriesArray[1].data.push({
    //     x: (new Date(Date.parse(mem[i].x) + 8 * 60 * 60 * 1000).getTime()),
    //     y: mem[i].y_rss
    //   });
    // }
  }


  // const connectWebSocket = () => {
  //   //開啟
  //   setSocket(socketIOClient())
  // }

  // const wsConnect = () => {
  //   //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  //   socket.on("connect", () => {
  //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  //   });
  // }

  // const wsDisConnect = () => {
  //   //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  //   socket.on('disconnect', function () {
  //     message.warn('Oh! The server is disconnected.Please check!');
  //     //setErrorMsg('Oh! The server is disconnected.Please check!');
  //   });
  // }

  // const wsServers = () => {
  //   //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  //   socket.on('servers', msg => {
  //     setServers(msg.data)
  //     setServerSelected(msg.data[0])
  //   });
  // }

  // const wsResult = () => {
  //   //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  //   socket.on('result', msg => {
  //     console.log(msg.m_type);
  //     if (msg.m_type == 'info') {
  //       //setExecResult("Time: " + $filter('date')(new Date(), "hh:mm:ss") + "<span class='text-info'>" + " Result: " + msg.data + "</span>");
  //       setExecResult("Time: " + "2022-06-01 " + " Result: " + msg.data);
  //     } else {
  //       setExecResult("Time: " + "2022-04-01 " + " Result: " + msg.data);
  //       //$scope.result = $sce.trustAsHtml("Time: " + $filter('date')(new Date(), "hh:mm:ss") + "<span class='text-danger'>" + " Result: " + msg.data + "</span>");
  //     }
  //   });
  // }





  useEffect(() => {
    ///connectWebSocket()

  }, []);


  // useEffect(() => {

  //   if (socket) {
  //     //連線成功在 console 中打印訊息
  //     console.log('success connect!')
  //     //設定監聽
  //     wsConnect()
  //     //wsDisConnect()
  //     wsServers()
  //     wsResult()
  //   }


    // const socket = socketIOClient();
    // socket.on("connect", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    // socket.on("disconnect", () => {
    //   console.log(socket.id); // undefined
    // });


    // socket.on('connect', () => {
    //   socket.emit('event', {
    //     data: 'I am connected!'
    //   });
    // });

    // socket.on('disconnect', function () {
    //   message.warn('Oh! The server is disconnected.Please check!');
    //   //setErrorMsg('Oh! The server is disconnected.Please check!');
    // });

    // socket.on('result', msg => {
    //   console.log(msg.m_type);
    //   if (msg.m_type == 'info') {
    //     //setExecResult("Time: " + $filter('date')(new Date(), "hh:mm:ss") + "<span class='text-info'>" + " Result: " + msg.data + "</span>");
    //     setExecResult("Time: " + "2022-06-01 " + " Result: " + msg.data);
    //   } else {
    //     setExecResult("Time: " + "2022-04-01 " + " Result: " + msg.data);
    //     //$scope.result = $sce.trustAsHtml("Time: " + $filter('date')(new Date(), "hh:mm:ss") + "<span class='text-danger'>" + " Result: " + msg.data + "</span>");
    //   }
    // });

    // socket.on('servers', msg => {
    //   setServers(msg.data)
    //   setServerSelected(msg.data[0])
    // });

    // socket.on('response', msg => {
    //   if (serverSelected == msg.server) {
    //     console.log("msg")
    //     console.log(msg)
    //     //$scope.stat = msg.stat;
    //     //$scope.table = msg.table;
    //     handler_cmd(msg.commands);
    //     handler_cpu(msg.cpu);
    //     handler_mem(msg.mem);
    //   }
    // });





  // }, [socket]);



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
            <Select value={serverSelected} className="select-options" onChange={() => { }}>
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