import React from 'react';
import {Divider} from 'antd';
import PropTypes from 'prop-types';

export default class SiderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      mt: PropTypes.number,
      mb: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.element
    };
  }

  render() {
    return (
      <div>
        <Divider style={{marginTop: this.props.mt + 'px', marginBottom: this.props.mb + 'px'}}>
          {this.props.title}
        </Divider>
        {this.props.content}
      </div>
    );
  }
}
