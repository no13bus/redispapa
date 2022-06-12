import { Space, Table, Tag } from 'antd';
import React from 'react';
import { Line, LineConfig } from '@ant-design/charts';
import { ChartData, ChartType } from '@/data.d'
import './index.less'

interface PropsType {
  chartData: ChartData[];
  chartTitle: string;
}


const Chart: React.FC<PropsType> = ({ chartTitle, chartData }) => {


  const chartConfig = {
    data: chartData,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    point: {
      size: 5,
      shape: 'diamond',
    },
    xAxis: {
      title: {
        text: 'time'
      }
    },
    yAxis: {
      title: {
        text: 'value'
      }
    },
  };



  return (
    <div className="charts-item">
      <div className="chart-title">{chartTitle}</div>
      <Line {...chartConfig} />

    </div>
  );
};

export default Chart;
