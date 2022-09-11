import React from 'react';
import PropTypes from 'prop-types';
import StatisticItem from './StatisticItem';

const calculateScore = (buf) => {
  const creditsSum = buf.reduce((now, next) => now + next['credits'], 0);
  const scoreSum = buf.reduce((now, next) => now + next['score'] * next['credits'], 0);
  return (scoreSum / creditsSum).toFixed(3);
};

export default class ScoreStatistic extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      rows: PropTypes.array,
      display: PropTypes.array
    };
  }

  render() {
    return (
      this.props.display.map((i) => (
        <StatisticItem text={i.text} key={i.text} percent={calculateScore(this.props.rows.filter(i.filter))}/>
      ))
    );
  }
}
