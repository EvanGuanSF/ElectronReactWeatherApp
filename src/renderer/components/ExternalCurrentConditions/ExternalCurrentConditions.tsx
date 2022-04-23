import PropTypes from 'prop-types';

export const ExternalCurrentConditions = (props) => {
  const { forecastData } = props;
  console.log('Building ExternalCurrentConditions component.');

  if (!forecastData) {
    return <div />;
  }

  let tempStringPart = '';
  let speedStringPart = '';
  switch (measurementSystem) {
    case 'standard':
      tempStringPart = '°K';
      speedStringPart = 'kph';
      break;
    case 'metric':
      tempStringPart = '°C';
      speedStringPart = 'kph';
      break;
    case 'imperial':
      tempStringPart = '°F';
      speedStringPart = 'mph';
      break;
    default:
      return <div />;
  }

  return (
    <div
      className="col border m-0 p-2"
      style={{
        backgroundImage: "url(" + "https://openweathermap.org/img/wn/" + forecastData.weather[0].icon + "@4x.png" + ")",
        backgroundPosition: '110% 0%',
        backgroundSize: '50%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>{forecastData.weather[0].description.toString()}</div>
      <div>
        {forecastData.temp.toFixed(1)}
        {tempStringPart}
      </div>
      <div className="boldLargeFont">
        {forecastData.humidity.toFixed(0)}% RH
      </div>
      <div className="boldLargeFont">
        Wind: {Math.round(forecastData.wind_speed)}
        {speedStringPart}
      </div>
      <div className="boldLargeFont">
        Gust: {Math.round(forecastData.wind_gust)}
        {speedStringPart}
      </div>
    </div>
  );
};

// PropTypes
ExternalCurrentConditions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  forecastData: PropTypes.object.isRequired,
};

export default ExternalCurrentConditions;
