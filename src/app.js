import './app.css';
import React from 'react';
import {Col, Row, Layout, Divider, Empty} from 'antd';
import {InfoCircleOutlined, SelectOutlined} from '@ant-design/icons';

import Timer from './components/Utils/Timer';
import MainTable from './components/Utils/MainTable';
import ConfigSider from './components/Sider/ConfigSider';
import UploadSider from './components/Sider/UploadSider';
import OperateSider from './components/Sider/OperateSider';
import ScoreStatistic from './components/Statistic/ScoreStatistic';
import MainFooter, {formatGithubRepo} from './components/Footer/MainFooter';

const {Header, Footer} = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
          name: '课程一',
          score: 99,
          credits: 3,
          optional: true,
          selected: false
        },
        {
          name: '课程二',
          score: 98,
          credits: 4,
          optional: false,
          selected: true
        },
        {
          name: '课程三',
          score: 97,
          credits: 5,
          optional: false,
          selected: true
        }
      ]
    };
  }

  onItemDrag = (itemUpdate) => {
    this.setState({
      courses: itemUpdate
    });
  };

  onItemDelete = (item) => {
    console.log(item);
  };

  onDataClear = () => {
  };

  onDataAppend = (dataUpdate) => {
    console.log(dataUpdate);
  };

  onDataReplace = (dataReplace) => {
    console.log(dataReplace);
  };

  render() {
    return (
      <Layout>
        <Header className='title-font' style={{backgroundColor: '#f0f2f5', marginBottom: '-20px'}}>
          <span style={{float: 'left', marginLeft: '2vw'}}>
            <SelectOutlined/>
            <Divider type='vertical' style={{height: '2vw', marginTop: '-0.1vw'}}/>
            Score Calculator and General Professional Course Selector for BUAA Computer Science
          </span>
          <span style={{float: 'right', marginRight: '2vw'}}>
            <Timer/>
          </span>
        </Header>
        <Row style={{marginTop: '25px'}}>
          <Col md={0} lg={1} xl={2}/>
          <Col md={18} lg={16} xl={14} style={{paddingLeft: '5px'}}>{
            this.state.courses.length === 0 ?
              <Empty description={'暂无数据'}/> :
              <div style={{marginRight: '2vw'}}>
                <ScoreStatistic rows={this.state.courses} display={[
                  {text: '不计选择的一般专业：', filter: (item) => !item.optional},
                  {text: '计入选择的一般专业：', filter: (item) => item.selected}
                ]}/>
                <MainTable
                  id={'main-table'}
                  items={this.state.courses}
                  onItemDrag={this.onItemDrag}
                  onItemDelete={this.onItemDelete}
                />
              </div>
          }</Col>
          <Col span={6} style={{paddingRight: '5px'}}>
            <OperateSider onDataClear={this.onDataClear}/>
            <UploadSider onDataReplace={this.onDataReplace}/>
            <ConfigSider onDataAppend={this.onDataAppend}/>
          </Col>
        </Row>
        <Footer style={{textAlign: 'center', marginBottom: '2vw'}}>
          <MainFooter space={'middle'} title={<InfoCircleOutlined className='title-font'/>} items={[
            formatGithubRepo('https://github.com/Chenrt-ggx/ScoreCalculator'),
            formatGithubRepo('https://github.com/Chenrt-ggx/ScoreFrontend')
          ]}/>
        </Footer>
      </Layout>
    );
  }
}
