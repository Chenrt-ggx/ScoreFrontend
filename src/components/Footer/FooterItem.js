import React from 'react';
import PropTypes from 'prop-types';
import {Card, Divider} from 'antd';
import {LinkOutlined} from '@ant-design/icons';

export default class FooterItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      icon: PropTypes.element,
      url: PropTypes.string,
      name: PropTypes.string
    };
  }

  render() {
    return (
      <a key={this.props.url} href={this.props.url}>
        <Card size='small' style={{width: 300, display: 'inline-block', fontSize: '20px'}}>
          <span style={{float: 'left', marginLeft: '5px'}}>
            {this.props.icon}
            <Divider type='vertical'/>
            <span style={{fontSize: '16px'}}>{this.props.name}</span>
          </span>
          <span style={{float: 'right', marginRight: '5px'}}>
            <LinkOutlined style={{color: '#61dafb'}}/>
          </span>
        </Card>
      </a>
    );
  }
}
