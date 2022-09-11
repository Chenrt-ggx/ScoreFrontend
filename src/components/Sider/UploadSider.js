import React from 'react';
import PropTypes from 'prop-types';
import SiderItem from './SiderItem';
import {readJsonFile} from '../../lib/file';
import {InboxOutlined} from '@ant-design/icons';
import {Button, message, Space, Upload} from 'antd';

const {Dragger} = Upload;

export default class UploadSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: []
    };
  }

  static get propTypes() {
    return {
      onDataReplace: PropTypes.func
    };
  }

  handleJson = async (file, hook) => {
    try {
      const content = await readJsonFile(file);
      console.log(content);
      hook(true, '文件上传成功');
    } catch (exception) {
      hook(false, '错误：JSON 未成功解析');
    }
  };

  handleTable = async (file, hook) => {
    console.log(file);
    hook(true, '文件上传成功');
  };

  onUpload = async (upload) => {
    const whiteList = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json'
    ];
    const hook = (status, text) => {
      if (status) {
        upload.onSuccess();
        message.success(text);
      } else {
        this.setState({
          buffer: []
        });
        upload.onError();
        message.error(text);
      }
    };
    if (whiteList.indexOf(upload.file.type) !== -1) {
      if (upload.file.type === whiteList[whiteList.length - 1]) {
        await this.handleJson(upload.file, hook);
      } else {
        await this.handleTable(upload.file, hook);
      }
    } else {
      hook(false, '错误：不支持的文件类型');
    }
  };

  onDataReplace = async () => {
    if (this.state.buffer.length !== 0) {
      this.props.onDataReplace(this.state.buffer);
      this.setState({
        buffer: []
      });
    } else {
      message.error('无法应用此文件');
    }
  };

  render() {
    return (
      <SiderItem title={'上传文件'} mt={20} mb={30} content={
        <div>
          <div>
            <Dragger maxCount={1} customRequest={this.onUpload}>
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
