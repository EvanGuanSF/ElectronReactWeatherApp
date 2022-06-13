#!/bin/bash

# Set up variables.
INSTALL_DIR=/usr/local/sbin/electron_react_weather_app
AUTOSTART_DIR=/etc/xdg/autostart

# Stop services.
#sudo systemctl stop electron_react_weather_app
#sudo systemctl disable electron_react_weather_app

# Stop any old running instance of the scripts/programs.
sudo pkill -f ".*ElectronReactWeatherApp"

# Clear old files.
sudo rm -rf "$INSTALL_DIR"
sudo rm -f "$AUTOSTART_DIR"/erwa.desktop