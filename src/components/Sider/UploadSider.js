import React from 'react';
import PropTypes from 'prop-types';
import SiderItem from './SiderItem';
import {InboxOutlined} from '@ant-design/icons';
import {Button, message, Space, Upload} from 'antd';

const {Dragger} = Upload;

export default class UploadSider extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      onDataReplace: PropTypes.func
    };
  }

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
      <SiderItem title={'上传文件'} mt={20} mb={30} content={
        <div>
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
              <a href={require('../../assets/demo_xlsx')} download={'demo.xlsx'}>表格示例</a>
              <a href={require('../../assets/demo_json')} download={'demo.json'}>JSON 示例</a>
            </Space>
          </div>
        </div>
      }/>
    );
  }
}
