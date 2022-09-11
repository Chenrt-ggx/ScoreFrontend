import React from 'react';
import PropTypes from 'prop-types';
import SiderItem from './SiderItem';
import {InboxOutlined} from '@ant-design/icons';
import {Button, message, Space, Upload} from 'antd';

const {Dragger} = Upload;

export default class UploadSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      buffer: []
    };
  }

  static get propTypes() {
    return {
      onDataReplace: PropTypes.func
    };
  }

  onChange = async ({file}) => {
    if (file.status === 'done') {
      await message.success(this.state.description);
    } else if (file.status === 'error') {
      await message.error(this.state.description);
    }
  };

  onUpload = async (upload) => {
    const whiteList = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json'
    ];
    if (whiteList.indexOf(upload.file.type) !== -1) {
      this.setState({
        description: '文件上传成功'
      });
      upload.onSuccess();
    } else {
      this.setState({
        description: '错误：不支持的文件类型'
      });
      upload.onError();
    }
  };

  onDataReplace = async () => {
    if (this.state.description === '文件上传成功') {
      this.props.onDataReplace(this.state.buffer);
      this.setState({
        description: '',
        buffer: []
      });
    } else {
      await message.error('无法应用此文件');
    }
  };

  render() {
    return (
      <SiderItem title={'上传文件'} mt={20} mb={30} content={
        <div>
          <div>
            <Dragger maxCount={1} customRequest={this.onUpload} onChange={this.onChange}>
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
            <Button type='primary' onClick={this.onDataReplace}>确认</Button>
            <Space style={{marginTop: '5px', marginLeft: '8px'}}>
              <a href={require('../../assets/demo_xlsx')} download={'demo.xlsx'}>表格示例</a>
              <a href={require('../../assets/demo_json')} download={'demo.json'}>JSON 示例</a>
            </Space>
          </div>
        </div>
      }/>
    );
  }
}
