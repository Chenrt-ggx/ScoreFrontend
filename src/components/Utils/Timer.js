import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({
        date: new Date()
      }),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (this.state.date.toLocaleString());
  }
}
