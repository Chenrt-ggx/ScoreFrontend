import React from 'react';
import PropTypes from 'prop-types';
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Space, Upload } from 'antd';

import SiderItem from './SiderItem';
import { readJsonFile, readTableFile } from '../../lib/file';
import { jsonCheck, tableCheck, formatCheck } from '../../lib/checker';

const { Dragger } = Upload;

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

  onUpload = async (upload) => {
    const whiteList = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json'
    ];
    const hook = (status, info) => {
      if (status) {
        this.setState({
          buffer: info
        });
        upload.onSuccess();
        message.success('文件上传成功');
      } else {
        this.setState({
          buffer: []
        });
        upload.onError();
        message.error(info);
      }
    };
    if (whiteList.indexOf(upload.file.type) !== -1) {
      if (upload.file.type === whiteList[whiteList.length - 1]) {
        const content = await readJsonFile(upload.file, hook);
        if (content && jsonCheck(content, hook) && formatCheck(content, hook)) {
          hook(true, content);
        }
      } else {
        const content = await readTableFile(upload.file, hook);
        if (content && tableCheck(content, hook) && formatCheck(content, hook)) {
          hook(true, content);
        }
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
      <SiderItem
        title={'上传文件'}
        mt={20}
        mb={30}
        content={
          <div>
            <div>
              <Dragger maxCount={1} customRequest={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件上传</p>
                <p className="ant-upload-hint">支持上传表格文件和 JSON 文件</p>
              </Dragger>
            </div>
            <div style={{ marginTop: '25px', paddingLeft: '2px', paddingRight: '2px', fontSize: '14px' }}>
              <Button type="primary" onClick={this.onDataReplace}>
                确认
              </Button>
              <Space style={{ marginTop: '5px', marginLeft: '8px' }}>
                <a href={require('../../assets/demo_xlsx')} download={'demo.xlsx'}>
                  表格示例
                </a>
                <a href={require('../../assets/demo_json')} download={'demo.json'}>
                  JSON 示例
                </a>
              </Space>
            </div>
          </div>
        }
      />
    );
  }
}
