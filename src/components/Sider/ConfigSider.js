import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd';

import SiderItem from './SiderItem';

export default class ConfigSider extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onDataAppend: PropTypes.func
    };
  }

  onFinish = (dataUpdate) => {
    this.props.onDataAppend(dataUpdate);
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <SiderItem
        title={'手动添加'}
        mt={30}
        mb={30}
        content={
          <Form
            ref={this.formRef}
            name="control-ref"
            onFinish={this.onFinish}
            initialValues={{
              score: 90,
              credits: 2,
              optional: true
            }}
          >
            <Form.Item name="name" label="课程名称" rules={[{ required: true }, { type: 'string', min: 1, max: 80 }]}>
              <Input placeholder={'请输入课程名称'} />
            </Form.Item>
            <Form.Item name="score" label="课程成绩" rules={[{ required: true }]}>
              <InputNumber min={60} max={100} step={0.5} />
            </Form.Item>
            <Form.Item name="credits" label="课程学分" rules={[{ required: true }]}>
              <InputNumber min={0.5} max={10} step={0.5} />
            </Form.Item>
            <Form.Item name="optional" label="一般专业" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio.Button value={true}>是</Radio.Button>
                <Radio.Button value={false}>否</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  确认
                </Button>
                <Button htmlType="button" onClick={() => this.formRef.current.resetFields()}>
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Form>
        }
      />
    );
  }
}
