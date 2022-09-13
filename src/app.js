import './app.css';
import React from 'react';
import core from './lib/core';
import update from 'immutability-helper';
import {message, Col, Row, Layout, Empty} from 'antd';
import {FileMarkdownOutlined, InfoCircleOutlined} from '@ant-design/icons';

import MainTable from './components/Utils/MainTable';
import MainHeader from './components/Utils/MainHeader';
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
      courses: []
    };
  }

  onItemDrag = (itemUpdate) => {
    this.setState({
      courses: itemUpdate
    });
  };

  onItemDelete = (item) => {
    try {
      const next = core(this.state.courses.filter((i) => i.name !== item), 5);
      this.setState({
        courses: next
      });
    } catch (e) {
      if (e.message === 'selectable course not enough') {
        message.error('删除失败：一般专业课不足').then(() => {
        });
      }
    }
  };

  onDataClear = () => {
    this.setState({
      courses: []
    });
  };

  onDataAppend = (dataUpdate) => {
    if (this.state.courses.find((i) => i.name === dataUpdate.name)) {
      message.error('添加失败：课程名称重复').then(() => {
      });
    } else {
      this.setState({
        courses: core(update(this.state.courses, {
          $push: [dataUpdate]
        }), 5)
      });
    }
  };

  onDataReplace = (dataReplace) => {
    try {
      const next = core(dataReplace, 5);
      this.setState({
        courses: next
      });
    } catch (e) {
      if (e.message === 'selectable course not enough') {
        message.error('导入失败：一般专业课不足').then(() => {
        });
      }
    }
  };

  render() {
    return (
      <Layout>
        <Header className='title-font' style={{backgroundColor: '#f0f2f5', marginBottom: '-20px'}}>
          <MainHeader marginFix={'4vw'} widthLimit={1080}/>
        </Header>
        <Row style={{marginTop: '25px'}}>
          <Col md={0} lg={1} xl={2}/>
          <Col md={18} lg={16} xl={14} style={{paddingLeft: '5px'}}>{
            this.state.courses.length === 0 ?
              <Empty description={'暂无数据'} style={{marginTop: '50px'}}/> :
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
            {this.state.courses.filter((i) => i.optional).length > 5 &&
            <ConfigSider onDataAppend={this.onDataAppend}/>
            }
          </Col>
        </Row>
        <Footer style={{textAlign: 'center', marginBottom: '2vw'}}>
          <MainFooter space={5} title={<InfoCircleOutlined className='title-font'/>} items={[
            {
              url: 'https://www.cnblogs.com/Chenrt/p/16675891.html',
              name: 'Algorithm Description',
              icon: <FileMarkdownOutlined/>
            },
            formatGithubRepo('https://github.com/Chenrt-ggx/ScoreCalculator'),
            formatGithubRepo('https://github.com/Chenrt-ggx/ScoreFrontend')
          ]} marginFix={'2.5vw'}/>
        </Footer>
      </Layout>
    );
  }
}
