


<img align="left" src="https://evanguan.com/img/ERWA.png" width="120" height="120">

# Electron+React Weather App

The goal of this application is to display current and future weather and environmental conditions in a kiosk-like presentation.
This app uses Electron and React web technologies to fetch and display data from the free openweather.org "Current Weather Data" api and self-made data apis.
A Fritizing wiring diagram is made available which in conjunction with some extra supporting programs allows for a single-power-cable appliance-like deployment.

## Images

<img src="https://evanguan.com/img/ElectronWeatherApp.png" height="300">
<img src="https://evanguan.com/img/ERWA-Diagram.png" height="300">

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
  sudo apt install fonts-noto-color-emoji
```


4) Setup and customize
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
* Components can be disabled by commenting them out in `/src/renderer/App.tsx`.

5) Start the app

```bash
  npm start
```

6) Package the project for the local system
	a) Build the program for the local system architecture.
	```bash
	  npm run package
	  # The built executable will be in release/build/
	  # If on Windows, you may need to manually add an executable file extension (.exe)
	```
	b) [Optional] After building, run the install script after building to enable the app to be run at startup.
	```bash
	  sudo ./install_erwa.sh
	```
	c) [Optional] To add HC-SR04 sonar range detection to turn on the screen as seen in the above diagram, see my other repository: https://github.com/EvanGuanSF/HC-SR04-Sonar-Screen-Controller
	d) [Optional] To get and log your own data using a BME680 sensor, see my other repository: https://github.com/EvanGuanSF/Pi-Sensor-Data

7) Other considerations
a) A simple way to hide the taskbar on a Raspberry Pi running Raspberry Pi OS is to right click task bar -> Panel Settings -> Advanced -> Under "Automatic Hiding"  check "Minimize panel when not in use" and set "Size when minimized" to 0 pixels.
This allows you to go full screen kiosk mode without removing taskbar functionality altogether.
b) Screen blanking (turning off render output after inactivity) is on by default on RPi OS. Turn it off by going to the Applications Menu -> Preferences -> Raspberry Pi Configuration -> Display -> toggle Screen Blanking off.

## Acknowledgements

 - [Electron + React Boilerplate project that this app is built on. Very useful!](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
