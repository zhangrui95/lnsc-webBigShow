/*
* 案件统计
* author：jhm
* 20191018
* */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {} from 'antd';

@connect(({ policeData, loading, common }) => ({
  policeData,
  loading,
  common,
  // loading: loading.models.alarmManagement,
}))
class CaseStatistic extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    return <div>案件统计</div>;
  }
}
export default CaseStatistic;