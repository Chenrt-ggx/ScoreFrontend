import React from 'react';
import PropTypes from 'prop-types';
import {Progress, Typography} from 'antd';

const {Title} = Typography;

export default class StatisticItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      text: PropTypes.string,
      percent: PropTypes.string
    };
  }

  render() {
    return (
      <Title key={this.props.text} level={4} style={{color: '#030852'}}>
        <span style={{marginRight: '10px'}}>{this.props.text}</span>
        <Progress
          percent={this.props.percent}
          style={{display: 'inline-block', width: '56%'}}
          strokeColor={{from: '#108ee9', to: '#87d068'}}
          format={(percent) => percent + ' / 100'}
          status='active'
        />
      </Title>
    );
  }
}
