import { Component } from 'react';

import './InternalCurrentConditions.css';

export default class InternalCurrentConditions extends Component {
  constructor(props) {
    super(props);
    console.log('Building InternalCurrentConditions component.');

    this.state = {
      currentTemp: 0.0,
      currentHumidity: 0.0,
      dataUpdateIntevalSeconds: 3,
    };
  }

  async componentDidMount() {
    // console.log(
    //   `${new Date().toLocaleString()}: Getting initial sensor data...`
    // );
    this.getSensorData();
    this.getNewSensorData();
  }

  componentWillUnmount() {
    // Clear the wait interval.
    clearInterval(this.loadNewInternalHistoricConditions);
  }

  getSensorData = async () => {
    const internalHistoricConditionsURI = currentInternalConditionsURI;

    try {
      await fetch(internalHistoricConditionsURI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not OK');
          }

          return res.json();
        })
        .then((resData) => {
          let newTempUnit = '';
          switch (measurementSystem) {
            case 'standard':
              newTempUnit = '°K';
              for (let i = 0; i < resData.length; i += 1)
                resData[i].temperature = resData[i].temperature_c;
              break;
            case 'metric':
              newTempUnit = '°C';
              for (let i = 0; i < resData.length; i += 1)
                resData[i].temperature = resData[i].temperature_c;
              break;
            case 'imperial':
              newTempUnit = '°F';
              for (let i = 0; i < resData.length; i += 1)
                resData[i].temperature =
                  (resData[i].temperature_c * 9) / 5 + 32;
              break;
            default:
              return <div />;
          }

          this.setState({ tempUnit: newTempUnit });

          let averageTemp = 0.0;
          for (let i = 0; i < resData.length; i += 1)
            averageTemp += resData[i].temperature;
          averageTemp /= resData.length;

          let averageHumidity = 0.0;
          for (let i = 0; i < resData.length; i += 1)
            averageHumidity += resData[i].relative_humidity;
          averageHumidity /= resData.length;

          this.setState({
            currentTemp: averageTemp,
            currentHumidity: averageHumidity,
          });

          // console.log(
          //   this.state.currentTemp.toFixed(2), this.state.currentHumidity.toFixed(2)
          // );

          // console.log(
          //   `${new Date().toLocaleString()}: Done getting new sensor data.`
          // );
          // console.log(JSON.stringify(resData[resData.length - 1]));
          return resData;
        });
    } catch (err: any) {
      console.log(err);
    }
  };

  getNewSensorData = async () => {
    try {
      clearInterval(this.loadNewInternalHistoricConditions);
      this.loadNewInternalHistoricConditions = setInterval(async () => {
        // console.log(
        //   `${new Date().toLocaleString()}: Getting new sensor data...`
        // );
        this.getSensorData();
      }, this.state.dataUpdateIntevalSeconds * 1000);
    } catch (err: any) {
      console.log(err);
    }
  };

  render() {
    if (!this.state) {
      console.log('No InternalCurrentConditions data.');
      return <div />;
    }

    return (
      <div className="col border m-0 p-2">
        <div className='currentConditionsText'>{this.state.currentTemp.toFixed(1)}{this.state.tempUnit}</div>
        <div className='currentConditionsText'>{this.state.currentHumidity.toFixed(1)}% RH</div>
      </div>
    );
  }
}
