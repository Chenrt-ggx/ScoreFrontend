import React from 'react';
import PropTypes from 'prop-types';
import {Button, Space} from 'antd';
import SiderItem from './SiderItem';

export default class OperateSider extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onDataClear: PropTypes.func
    };
  }

  render() {
    return (
      <SiderItem title={'批量操作'} mt={20} mb={20} content={
        <Space>
          <Button type='primary' onClick={this.props.onDataClear}>清空课程</Button>
          <Button type='primary' onClick={() => location.href = 'https://www.bilibili.com/video/BV1uT4y1P7CX'}>
            黑暗模式
          </Button>
        </Space>
      }/>
    );
  }
}
