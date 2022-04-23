
# Electron+React Weather App

The goal of this application is to display current and future weather and environmental conditions in a kiosk-like presentation.
This app uses Electron and React web technologies to fetch and display data from the free openweather.org "Current Weather Data" api and self-made data apis.  

<img src="https://evanguan.com/img/ERWA.png"  width="120" height="120">  

## Screenshot

<img src="https://evanguan.com/img/ElectronWeatherApp.png" height="300">

## Running the App

1) Clone the project

```bash
  git clone https://link-to-project
```

2) Go to the project directory

```bash
  cd my-project
```

3) Install dependencies

```bash
  npm install
```

4) Modify the environment variables file.
Make a copy of the `env_template.json` file in src/main and rename it to `env.json`.  
Modify the variables in the file.  
Note that the data URIs consumed require json objects of format e.g.:
```bash
  {
    {
      "timestamp": "2022-04-23T03:42:00.000Z",
      "temperature_c": 23.41,
      "relative_humidity": 43.82
    },
    {
      "timestamp": "2022-04-23T03:41:58.000Z",
      "temperature_c": 23.41,
      "relative_humidity": 43.81
    }, [...]
  }
```
`CURRENT_INTERNAL_CONDITIONS_URI` needs at least 1 datapoint.  
`HISTORIC_INTERNAL_CONDITIONS_URI` needs 24 datapoints.

5) Start the app

```bash
  npm run start
```

6) Package the project for the local system

```bash
  npm run package
```

## Acknowledgements

 - [Electron + React Boilerplate project that this app is built on](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
