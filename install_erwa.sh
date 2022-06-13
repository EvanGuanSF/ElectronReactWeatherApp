#!/bin/bash

# Set up variables.
CUR_DIR=$(pwd)
INSTALL_DIR=/usr/local/sbin/electron_react_weather_app
AUTOSTART_DIR=/etc/xdg/autostart

# Create a directory to hold files.
sudo mkdir -p "$INSTALL_DIR"
sudo chmod 777 "$INSTALL_DIR"

# Copy the files to the sbin folder.
sudo cp -f "$CUR_DIR"/release/build/ElectronReactWeatherApp "$INSTALL_DIR"
sudo chmod 777 "$INSTALL_DIR"/ElectronReactWeatherApp

# Copy the desktop autostart file to the appropriate directory.
sudo cp -f "$CUR_DIR"/erwa.desktop "$AUTOSTART_DIR"