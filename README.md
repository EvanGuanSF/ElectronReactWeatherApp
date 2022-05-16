



# Electron+React Weather App

The goal of this application is to display current and future weather and environmental conditions in a kiosk-like presentation.
This app uses Electron and React web technologies to fetch and display data from the free openweather.org "Current Weather Data" api and self-made data apis.  

<img src="https://evanguan.com/img/ERWA.png"  width="120" height="120">  

## Screenshot

<img src="https://evanguan.com/img/ElectronWeatherApp.png" height="300">

## Running the App

1) Clone the project

```bash
  git clone https://github.com/EvanGuanSF/ElectronReactWeatherApp
```

2) Go to the project directory

```bash
  cd ElectronReactWeatherApp
```

3) Install dependencies

```bash
  npm install
  # On Raspberry Pis, You may need to install a font with emojis for some icons to display properly.
  # I recommend noto for its clean look in this application.
  sudo apt install fonts-nono-color-emoji
```


4) Modify the environment variables file.
* Make a copy of the `env_template.json` file in src/main and rename it to `env.json`.  
* Modify the variables in the file.  
* Note that the indoors data URIs consumed require json objects of format e.g.:
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
* Components can be easily disabled by commenting them out in `App.tsx` file.

5) Start the app

```bash
  npm start
```

6) Package the project for the local system

```bash
  npm run package
  # The built executable will be in release/build/
  # .exe for windows and .appimage for linux
```

7) Other considerations
a) A simple way to hide the taskbar on a Raspberry Pi running Raspberry Pi OS is to right click task bar -> Panel Settings -> Advanced -> Under "Automatic Hiding"  check "Minimize panel when not in use" and set "Size when minimized" to 0 pixels.
This allows you to go full screen kiosk mode without removing taskbar functionality altogether.

## Acknowledgements

 - [Electron + React Boilerplate project that this app is built on](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
