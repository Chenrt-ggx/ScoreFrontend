import './app.css';
import React from 'react';
import {GithubOutlined, InboxOutlined, InfoCircleOutlined, LinkOutlined, SelectOutlined} from '@ant-design/icons';

import update from 'immutability-helper';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider, useDrag, useDrop} from 'react-dnd';

import {Col, Row, Layout, Space} from 'antd';
import {Button, Card, Divider, Empty, Table, Tag, Progress} from 'antd';
import {message, Upload, Form, Radio, Input, InputNumber, Typography } from 'antd';

const {Dragger} = Upload;
const { Title } = Typography;
const {Header, Footer} = Layout;

const calculateScore = (buf) => {
  const creditsSum = buf.reduce((now, next) => now + next['credits'], 0);
  const scoreSum = buf.reduce((now, next) => now + next['score'] * next['credits'], 0);
  return (scoreSum / creditsSum).toFixed(3);
};

const columns = [
  {
    title: '课程名称',
    dataIndex: 'name',
    key: 'name',
    sorter: (l, r) => l < r ? -1 : l > r ? 1 : 0,
    ellipsis: true,
    width: 160
  },
  {
    title: '课程成绩',
    dataIndex: 'score',
    key: 'score',
    sorter: (l, r) => l.score - r.score,
    width: 110
  },
  {
    title: '课程学分',
    dataIndex: 'credits',
    key: 'credits',
    sorter: (l, r) => l.credits - r.credits,
    width: 110
  },
  {
    title: '课程类型',
    dataIndex: 'optional',
    key: 'optional',
    render: (_, item) => (
      <Space>
        <Tag color={item.optional ? 'geekblue' : 'green'} key={item.optional}>
          {item.optional ? '一般专业' : '非一般专业'}
        </Tag>
        { item.selected &&
        <Tag color={'orange'} key={item.selected}>
          {'计入'}
        </Tag>
        }
      </Space>
    ),
    sorter: (l, r) => r.optional - l.optional,
    width: 150
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Button danger>删除</Button>
    ),
    align: 'center',
    width: 80
  }
];

// eslint-disable-next-line react/prop-types
const DraggableBodyRow = ({index, moveRow, className, style, ...restProps}) => {
  const ref = React.useRef(null);
  const [{isOver, dropClassName}, drop ] = useDrop({
    accept: 'DraggableBodyRow',
    collect: (monitor) => {
      const {index: dragIndex} = monitor.getItem() || {};
      return dragIndex === index ? {} : {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
      };
    },
    drop: (item) => moveRow(item.index, index)
  });
  const [ , drag ] = useDrag({
    type: 'DraggableBodyRow',
    item: {index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{cursor: 'move', ...style}}
      {...restProps}
    />
  );
};

const formatName = (repo) => {
  const split = repo.split('/');
  const name = split[split.length - 1];
  let result = name[0];
  for (let i = 1; i < name.length; ++i) {
    if ('a' <= name[i - 1] && name[i - 1] <= 'z' && 'A' <= name[i] && name[i] < 'Z') {
      result += ' ' + name[i];
    } else {
      result += name[i];
    }
  }
  return {url: repo, name: result};
};

export default class App extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
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

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({
        date: new Date()
      }),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
    const repos = [
      formatName('https://github.com/Chenrt-ggx/ScoreCalculator'),
      formatName('https://github.com/Chenrt-ggx/ScoreFrontend')
    ];
    const statistics = [
      {text: '不计选择的一般专业：', filter: (item) => !item.optional},
      {text: '计入选择的一般专业：', filter: (item) => item.selected}
    ];
    return (
      <Layout>
        <Header className='title-font' style={{backgroundColor: '#f0f2f5', marginBottom: '-20px'}}>
          <span style={{float: 'left', marginLeft: '2vw'}}>
            <SelectOutlined/>
            <Divider type='vertical' style={{height: '2vw', marginTop: '-0.1vw'}}/>
            Score Calculator and General Professional Course Selector for BUAA Computer Science
          </span>
          <span style={{float: 'right', marginRight: '2vw'}}>
            {this.state.date.toLocaleString()}
          </span>
        </Header>
        <Row style={{marginTop: '25px'}}>
          <Col md={0} lg={1} xl={2}/>
          <Col md={18} lg={16} xl={14} style={{paddingLeft: '5px'}}>{
            this.state.courses.length === 0 ?
              <Empty description={'暂无数据'}/> :
              <div style={{marginRight: '2vw'}}>
                {
                  statistics.map((i) =>
                    <Title key={i.text} level={4} style={{color: '#030852'}}>
                      <span style={{marginRight: '10px'}}>{i.text}</span>
                      <Progress
                        percent={calculateScore(this.state.courses.filter(i.filter))}
                        style={{display: 'inline-block', width: '56%'}}
                        strokeColor={{from: '#108ee9', to: '#87d068'}}
                        format={(percent) => percent + ' / 100'}
                        status='active'
                      />
                    </Title>
                  )
                }
                <DndProvider backend={HTML5Backend}>
                  <Table
                    id={'main-table'}
                    columns={columns}
                    dataSource={this.state.courses.map((i) => {
                      return {...i, key: i.name};
                    })}
                    size='middle'
                    pagination={false}
                    style={{marginTop: '25px'}}
                    components={{body: {row: DraggableBodyRow}}}
                    onRow={(record, index) => ({
                      index,
                      moveRow: (dragIndex, hoverIndex) => {
                        const dragRow = this.state.courses[dragIndex];
                        this.setState({
                          courses: update(this.state.courses, {
                            $splice: [[ dragIndex, 1 ], [ hoverIndex, 0, dragRow ]]
                          })
                        });
                      }
                    })}
                  />
                </DndProvider>
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
          <Divider plain style={{marginBottom: '2.5vw'}}>
            <InfoCircleOutlined className='title-font'/>
          </Divider>
          <Space size={'middle'}>{
            repos.map((i) =>
              <a key={i.url} href={i.url}>
                <Card size='small' style={{width: 300, display: 'inline-block', fontSize: '1.2vw'}}>
                  <span style={{float: 'left', marginLeft: '0.7vw'}}>
                    <GithubOutlined/>
                    <Divider type='vertical'/>
                    <span style={{fontSize: '1vw'}}>{i.name}</span>
                  </span>
                  <span style={{float: 'right', marginRight: '0.7vw'}}>
                    <LinkOutlined style={{color: '#61dafb'}}/>
                  </span>
                </Card>
              </a>
            )
          }</Space>
        </Footer>
      </Layout>
    );
  }
}
