import React from 'react';
import Timer from './Timer';
import PropTypes from 'prop-types';
import {Col, Divider, Row} from 'antd';
import {SelectOutlined} from '@ant-design/icons';

export default class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true
    };
  }

  static get propTypes() {
    return {
      marginFix: PropTypes.string,
      widthLimit: PropTypes.number
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({
        flag: !this.state.flag
      });
    };
  }

  render() {
    return (
      <Row>
        <Col md={0} lg={1} xl={2}/>
        <Col md={24} lg={22} xl={20}>
          <span style={{float: 'left', marginLeft: '-' + this.props.marginFix}}>
            <SelectOutlined/>
            <Divider type='vertical' style={{height: '32px', marginTop: '-2px'}}/>
            Score Calculator and General Professional Course Selector for BUAA Computer Science
          </span>
          {
            document.body.clientWidth >= this.props.widthLimit && (
              <span style={{float: 'right', marginRight: '-' + this.props.marginFix}}>
                <Timer/>
              </span>
            )
          }
        </Col>
      </Row>
    );
  }
}
