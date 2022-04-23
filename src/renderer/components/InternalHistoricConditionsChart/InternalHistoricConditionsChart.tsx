import { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import './InternalHistoricConditionsChart.css';

function formatDateTimeForChart(dateTimeString) {
  const now = new Date(dateTimeString);
  return now.toLocaleTimeString().replace(':00 ', '');
}

function formatYAxis(floatVal: number) {
  return floatVal.toFixed(0);
}

export default class InternalHistoricConditionsChart extends Component {
  constructor(props) {
    super(props);
    console.log('Building InternalHistoricConditionsChart component.');

    this.state = {
      piTempHumData: null,
      dataUpdateIntevalMinutes: 5,
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
    const internalHistoricConditionsURI = historicInternalConditionsURI;

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
              newTempUnit = 'Kelvin';
              for (let i = 0; i < resData.length; i += 1)
                resData[i].temperature = resData[i].temperature_c;
              break;
            case 'metric':
              newTempUnit = 'Celsius';
              for (let i = 0; i < resData.length; i += 1)
                resData[i].temperature = resData[i].temperature_c;
              break;
            case 'imperial':
              newTempUnit = 'Farenheit';
              for (let i = 0; i < resData.length; i += 1)
                resData[i].temperature =
                  (resData[i].temperature_c * 9) / 5 + 32;
              break;
            default:
              return <div />;
          }

          this.setState({ tempUnit: newTempUnit });

          for (let i = 0; i < resData.length; i += 1)
            resData[i].timestamp = new Date(resData[i].timestamp).valueOf();

          this.setState({
            piTempHumData: resData,
          });

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
      this.loadNewInternalHistoricConditions = setInterval(async () => {
        // console.log(
        //   `${new Date().toLocaleString()}: Getting new sensor data...`
        // );
        this.getSensorData();
      }, this.state.dataUpdateIntevalMinutes * 60 * 1000);
    } catch (err: any) {
      console.log(err);
    }
  };

  render() {
    if (
      !this.state ||
      !this.state.piTempHumData ||
      this.state.piTempHumData === null ||
      this.state.piTempHumData === undefined
    ) {
      return <div />;
    }

    return (
      <ResponsiveContainer
        width='100%'
        height='90%'
        minWidth='750'
        minHeight='200'
      >
        <LineChart
          className="dht-chart"
          data={this.state.piTempHumData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="4 2" stroke="grey" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickCount="10"
            scale="time"
            tickSize="5"
            tickFormatter={formatDateTimeForChart}
            style={{ fontSize: '80%', fill: 'black' }}
          />
          <YAxis tickCount="10"
            domain={['dataMin - 5.0', 'dataMax + 5.0']}
            tickFormatter={formatYAxis}
            style={{ fontSize: '80%', fill: 'black' }}
          />
          {/* <Tooltip /> */}
          <Legend className="dht-legend" verticalAlign="top" />
          <Line
            className="temperature-chart-line"
            type="monotone"
            dot={false}
            dataKey="temperature"
            name={this.state.tempUnit}
            stroke="var(--tempColor)"
            activeDot={{ className: 'temperature-active-dot' }}
          />
          <Line
            className="humidity-chart-line"
            type="monotone"
            dot={false}
            dataKey="relative_humidity"
            name="Humidity"
            stroke="var(--humColor)"
            activeDot={{ className: 'humidity-active-dot' }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
