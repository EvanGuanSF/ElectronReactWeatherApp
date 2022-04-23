import PropTypes from 'prop-types';
import './ExternalDailyForecastConditions.css';

export const ExternalDailyForecastConditions = (props) => {
  const { forecastData } = props;
  console.log('Building ExternalDailyForecastConditions component.');

  if (!forecastData) {
    return <div />;
  }

  const curDateTimeSeconds = Math.floor(Date.now() / 1000);
  const colWidth = Math.min(1, Math.floor(12 / forecastData.length));

  let tempStringPart = '';
  let speedStringPart = '';
  let precipStringPart = '';
  switch (measurementSystem) {
    case 'standard':
      tempStringPart = '°K';
      speedStringPart = 'kph';
      precipStringPart = 'cm';
      break;
    case 'metric':
      tempStringPart = '°C';
      speedStringPart = 'kph';
      precipStringPart = 'cm';
      break;
    case 'imperial':
      tempStringPart = '°F';
      speedStringPart = 'mph';
      precipStringPart = 'in';
      break;
    default:
      return <div />;
  }

  return forecastData.map((forecastInfo, index) => (
    <div
      className="col border m-0 p-2"
      key={index}
      style={{
        backgroundImage: "url(" + "https://openweathermap.org/img/wn/" + forecastInfo.weather[0].icon + "@4x.png" + ")",
        backgroundPosition: '125% -50%',
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="boldXLargeFont">
        {new Date(forecastInfo.dt * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </div>
      <div className="smallFont">
        {forecastInfo.weather[0].description.toString()}
      </div>
      <div className="boldLargeFont">
        🌡️ {forecastInfo.temp.min.toFixed(0)}-{forecastInfo.temp.max.toFixed(0)}
        {tempStringPart}
      </div>
      <div className="mediumFont">{forecastInfo.humidity.toFixed(0)}% RH</div>
      <div className="mediumFont">
        💨 {Math.round(forecastInfo.wind_speed)}-{Math.round(forecastInfo.wind_gust)} {speedStringPart}
      </div>
      <div className="mediumFont">💧 {(forecastInfo.pop * 100).toFixed(0)}%</div>
    </div>
  ));
};

// PropTypes
ExternalDailyForecastConditions.propTypes = {
  forecastData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExternalDailyForecastConditions;
