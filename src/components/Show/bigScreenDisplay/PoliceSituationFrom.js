/*
* PoliceSituationFrom.js 智慧案管大屏----警情来源统计bar
* author：lyp
* 20181120
* */

import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import title from 'echarts/lib/component/title';

let myChart;
const colors = ['#ff3386', '#00b7e0', '#6880ff', '#5393d3', '#6d81d8', '#896ddc', '#9d60df'];

export default class PoliceSituationFrom extends PureComponent {
  componentDidMount() {
    const { selectDate, org, orgCode, orglist } = this.props;
    this.showEchart();
    this.getPoliceSituationFrom(selectDate[0], selectDate[1], org, orgCode, orglist);
    window.addEventListener('resize', myChart.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (
        nextProps.selectDate !== null &&
        (this.props.selectDate !== nextProps.selectDate ||
          this.props.orgCode !== nextProps.orgCode ||
          this.props.org !== nextProps.org ||
          this.props.orglist !== nextProps.orglist)
      ) {
        this.getPoliceSituationFrom(
          nextProps.selectDate[0],
          nextProps.selectDate[1],
          nextProps.org,
          nextProps.orgCode,
          nextProps.orglist
        );
      }
    }
  }

  // 获取警情来源数据
  getPoliceSituationFrom = (startTime, endTime, org, orgCode, orglist) => {
    let data = {
      list: [
        { name: '办案区', count: '17', jjly_dm: '001' },
        { name: '卷宗', count: '28', jjly_dm: '002' },
        { name: '涉案物品', count: '14', jjly_dm: '003' },
        { name: '警情', count: '31', jjly_dm: '004' },
      ],
    };
    const xData = [];
    const barData = [];
    let bigestNum = 0;
    let num = 0;
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].name !== '全部') {
        xData.push(data.list[i].name);
        const obj = {
          name: data.list[i].name,
          value: data.list[i].count,
          code: data.list[i].jjly_dm,
          itemStyle: {
            color: colors[i],
          },
        };
        bigestNum = data.list[i].count > bigestNum ? data.list[i].count : bigestNum;
        num = num + parseInt(data.list[i].count);
        barData.push(obj);
      }
      myChart.setOption({
        xAxis: {
          data: xData,
        },
        series: [
          {
            data: barData,
          },
        ],
      });
    }
  };

  showEchart = () => {
    myChart = echarts.init(document.getElementById('PoliceSituationFrom'));

    const option = {
      title: {
        text: '执法监督报警数',
        textStyle: {
          color: '#66ccff',
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
            rotate: 20,
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: '#01E7CA',
            },
          },
          axisTick: {
            inside: true,
            length: 3,
            lineStyle: {
              width: 2,
            },
          },
          data: [],
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#68CCFE',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#334553',
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: [],
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return <div id="PoliceSituationFrom" style={{ height: '100%', width: '100%' }} />;
  }
}
