import './app.css';
import React from 'react';
import {InboxOutlined, InfoCircleOutlined, SelectOutlined} from '@ant-design/icons';

import {Button, Divider, Empty} from 'antd';
import {Col, Row, Layout, Space} from 'antd';
import {message, Upload, Form, Radio, Input, InputNumber } from 'antd';

const {Dragger} = Upload;
const {Header, Footer} = Layout;

import Timer from './components/Utils/Timer';
import MainTable from './components/Utils/MainTable';
import ScoreStatistic from './components/Statistic/ScoreStatistic';
import MainFooter, {formatGithubRepo} from './components/Footer/MainFooter';

export default class App extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
          name: 'aaa',
          score: 99,
          credits: 3,
          optional: true,
          selected: false
        },
        {
          name: 'bbb',
          score: 98,
          credits: 4,
          optional: false,
          selected: true
        },
        {
          name: 'ccc',
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
  }

  onItemDelete = (item) => {
    console.log(item);
  }

  onFinish = (values) => {
    console.log(values);
    this.formRef.current.resetFields();
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  handleUpload = async (info) => {
    const {status} = info.file;
    const whiteList = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json'
    ];
    if (whiteList.indexOf(info.file.type.toString()) !== -1) {
      await message.error('错误：不支持的文件类型');
    } else if (status === 'done') {
      await message.success(`'${info.file.name}' 上传成功`);
    } else if (status === 'error') {
      await message.error('文件上传出错');
    }
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
            <Divider style={{marginBottom: '20px'}}>批量操作</Divider>
            <Space>
              <Button type='primary'>清空课程</Button>
              <Button type='primary'>黑暗模式</Button>
            </Space>
            <Divider style={{marginBottom: '30px'}}>上传文件</Divider>
            <div>
              <Dragger beforeUpload={() => false} maxCount={1} onChange={this.handleUpload}>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined/>
                </p>
                <p className='ant-upload-text'>点击或拖拽文件上传</p>
                <p className='ant-upload-hint'>
                  支持上传表格文件和 JSON 文件
                </p>
              </Dragger>
            </div>
            <div style={{marginTop: '25px', paddingLeft: '2px', paddingRight: '2px'}}>
              <Button type='primary'>确认</Button>
              <Space style={{marginTop: '5px', marginLeft: '8px'}}>
                <a>表格示例</a>
                <a>JSON 示例</a>
              </Space>
            </div>
            <Divider style={{marginTop: '30px', marginBottom: '30px'}}>手动添加</Divider>
            <div>
              <Form ref={this.formRef} name='control-ref' onFinish={this.onFinish} initialValues={{
                score: 90,
                credits: 2,
                optional: true
              }}>
                <Form.Item name='name' label='课程名称' rules={[
                  {required: true},
                  {type: 'string', min: 1, max: 80}
                ]}>
                  <Input placeholder={'请输入课程名称'}/>
                </Form.Item>
                <Form.Item name='score' label='课程成绩' rules={[
                  {required: true}
                ]}>
                  <InputNumber min={60} max={100} step={0.5}/>
                </Form.Item>
                <Form.Item name='credits' label='课程学分' rules={[
                  {required: true}
                ]}>
                  <InputNumber min={0.5} max={10} step={0.5}/>
                </Form.Item>
                <Form.Item name='optional' label='一般专业' rules={[
                  {required: true}
                ]}>
                  <Radio.Group>
                    <Radio.Button value={true}>是</Radio.Button>
                    <Radio.Button value={false}>否</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button htmlType='submit' type='primary'>
                      确认
                    </Button>
                    <Button htmlType='button' onClick={this.onReset}>
                      清空
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
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
