import { Component } from 'react';
import './TimeDisplay.css';

export default class TimeDisplay extends Component {
  constructor(props) {
    super(props);
    console.log('Building TimeDisplay component.');

    this.state = {
      currentDate: new Date(Date.now()).toLocaleDateString('en-US', {
        dateStyle: 'full',
      }),
      currentTime: new Date(Date.now()).toLocaleTimeString(),
    };
  }

  async componentDidMount() {
    this.getNewCurrentTime();
  }

  componentWillUnmount() {
    // Clear the wait interval.
    clearInterval(this.getNewCurrentTimeInterval);
  }

  getNewCurrentTime = async () => {
    try {
      this.getNewCurrentTimeInterval = setInterval(async () => {
        this.setState({
          currentDate: new Date(Date.now()).toLocaleDateString('en-US', {
            dateStyle: 'full',
          }),
          currentTime: new Date(Date.now()).toLocaleTimeString(),
        });
      }, 1000);
    } catch (err: any) {
      console.log(err);
    }
  };

  render() {
    if (!this.state || !this.state.currentDate || !this.state.currentTime) {
      console.log('No TimeDisplay data.');
      return <div />;
    }

    const { currentDate, currentTime } = this.state;

    return (
      <div>
        <div className="boldXXLargeFont text-center">{currentDate}</div>
        <div className="boldXXLargeFont text-center">{currentTime}</div>
      </div>
    );
  }
}
