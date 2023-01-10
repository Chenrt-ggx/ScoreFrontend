import React from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import { GithubOutlined } from '@ant-design/icons';

import FooterItem from './FooterItem';

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
  return { url: repo, name: result, icon: <GithubOutlined /> };
};

export default class MainFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      title: PropTypes.element,
      items: PropTypes.array,
      space: PropTypes.number,
      marginFix: PropTypes.string
    };
  }

  render() {
    return (
      <div>
        <Divider plain style={{ marginBottom: this.props.marginFix }}>
          {this.props.title}
        </Divider>
        {this.props.items.map((i) => (
          <FooterItem key={i.url} space={this.props.space} {...i} />
        ))}
      </div>
    );
  }
}
