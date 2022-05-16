import { Component } from 'react';
import { ExternalCurrentConditions } from './components/ExternalCurrentConditions/ExternalCurrentConditions';
import InternalCurrentConditions from './components/InternalCurrentConditions/InternalCurrentConditions';
import TimeDisplay from './components/TimeDisplay/TimeDisplay';
import { ExternalHourlyForecastConditions } from './components/ExternalHourlyForecastConditions/ExternalHourlyForecastConditions';
import { ExternalDailyForecastConditions } from './components/ExternalDailyForecastConditions/ExternalDailyForecastConditions';
import InternalHistoricConditionsChart from './components/InternalHistoricConditionsChart/InternalHistoricConditionsChart';
import './App.css';

export default class App extends Component {
  constructor(props: JSON) {
    super(props);
    console.log('Building App component.');

    this.state = {
      dataUpdateIntevalMinutes: 5,
    };
  }

  componentDidMount() {
    console.log('Mounting App...');
    // console.log(`WeatherURI: ${weatherURI}`);
    // console.log(`Measurement system: ${measurementSystem}`);
    // console.log(
    //   `${new Date().toLocaleString()}: Getting initial weather data...`
    // );
    this.getWeatherData();
    this.getNewWeatherData();
  }

  componentWillUnmount() {
    // Clear the wait interval.
    clearInterval(this.getNewForecastConditionsInterval);
  }

  getWeatherData = async () => {
    // Race condition fix for uri not received from main.ts via ipc
    if (weatherURI === '') {
      console.log('No weather uri, waiting...');
      clearTimeout(this.tryGetWeatherData);
      this.tryGetWeatherData = setTimeout(() => {
        console.log('Trying to get data again...');
        this.getWeatherData();
      }, 500);
      return;
    }

    try {
      await fetch(weatherURI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not OK');
          }
          // console.log(res);
          return res.json();
        })
        .then((resData) => {
          // console.log(
          //   `${new Date().toLocaleString()}: Done getting new weather data.`
          // );
          // console.log(resData);
          console.log('Weather data acquired.');
          this.setState({
            weatherData: resData,
          });
          return resData;
        });
    } catch (err: any) {
      console.log(err);
    }
  };

  getNewWeatherData = async () => {
    try {
      this.getNewForecastConditionsInterval = setInterval(async () => {
        // console.log(
        //   `${new Date().toLocaleString()}: Getting new weather data...`
        // );
        this.getWeatherData();
      }, this.state.dataUpdateIntevalMinutes * 60 * 1000);
    } catch (err: any) {
      console.log(err);
    }
  };

  render() {
    if (
      !this.state ||
      !this.state.weatherData ||
      this.state.weatherData === null ||
      this.state.weatherData === undefined
    ) {
      console.log('No weather data.');
      return <div>Loading...</div>;
    }

    return (
      <div>
        <br />
        <br />
        <div className="row border">
          <div className="col-2" />

          <div className="col-8">
            <TimeDisplay />
          </div>

          <div className="col-2" />
        </div>
        <br />
        <br />
        <div className="row border">
          <div className="col-3">
            <div className="boldXLargeFont titleDiv" />
            <div className="boldXLargeFont titleDiv border">
              Inside
              <InternalCurrentConditions />
            </div>
            <br />
            <div className="boldXLargeFont titleDiv border">
              Outside
              <div className="contentDiv">
                <ExternalCurrentConditions
                  forecastData={this.state.weatherData.current}
                />
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="boldXLargeFont titleDiv">
              Indoor Temperature + Humidity (24 hours)
            </div>
            <InternalHistoricConditionsChart />
          </div>
        </div>
        <br />
        <br />
        <div className="row border border-3">
          <div className="boldXLargeFont titleDiv">Hourly Forecast (24 hours)</div>
          <div className="row">
            <ExternalHourlyForecastConditions
              forecastData={this.state.weatherData.hourly.slice(0, 6)}
            />
          </div>
          <div className="row">
            <ExternalHourlyForecastConditions
              forecastData={this.state.weatherData.hourly.slice(6, 12)}
            />
          </div>
          <div className="row">
            <ExternalHourlyForecastConditions
              forecastData={this.state.weatherData.hourly.slice(12, 18)}
            />
          </div>
          <div className="row">
            <ExternalHourlyForecastConditions
              forecastData={this.state.weatherData.hourly.slice(18, 24)}
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row border border-3">
          <div className="boldXLargeFont titleDiv">Daily Forecast</div>
          <div className="row">
            <ExternalDailyForecastConditions
              forecastData={this.state.weatherData.daily.slice(0, 5)}
            />
          </div>
        </div>
      </div>
    );
  }
}
