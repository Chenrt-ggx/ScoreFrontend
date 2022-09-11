import React from 'react';
import PropTypes from 'prop-types';
import {Divider, Space} from 'antd';
import FooterItem from './FooterItem';
import {GithubOutlined} from '@ant-design/icons';

export const formatGithubRepo = (repo) => {
  const split = repo.split('/');
  const name = split[split.length - 1];
  let result = name[0];
  for (let i = 1; i < name.length; ++i) {
    if ('a' <= name[i - 1] && name[i - 1] <= 'z' && 'A' <= name[i] && name[i] < 'Z') {
      result += ' ' + name[i];
    } else {
      result += name[i];
    }
  }
  return {url: repo, name: result, icon: <GithubOutlined/>};
};

export default class MainFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      title: PropTypes.element,
      items: PropTypes.array,
      space: PropTypes.string
    };
  }

  render() {
    return (
      <div>
        <Divider plain style={{marginBottom: '2.5vw'}}>
          {this.props.title}
        </Divider>
        <Space size={this.props.space}>{
          this.props.items.map((i) => <FooterItem key={i.url} {...i}/>)
        }
        </Space>
      </div>
    );
  }
}
