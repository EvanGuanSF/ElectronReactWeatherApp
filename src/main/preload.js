const { contextBridge, ipcRenderer } = require('electron');

window.ipcRenderer = require('electron').ipcRenderer;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    getMeasurementSystem() {
      ipcRenderer.send(
        'get-measurement-system',
        'Measurement system req from preload/renderer.'
      );
    },
    getWeatherURI() {
      ipcRenderer.send('get-weather-uri',
        'Get Weather URI req from preload/renderer.'
      );
    },
    getCurrentInternalConditionsURI() {
      ipcRenderer.send('get-current-internal-conditions-uri',
        'Get Current Internal Conditions URI req from preload/renderer.'
      );
    },
    getHistoricInternalConditionsURI() {
      ipcRenderer.send('get-historic-internal-conditions-uri',
        'Get Historic Internal Conditions URI req from preload/renderer.'
      );
    },
    on(channel, func) {
      const validChannels = [
        "get-measurement-system",
        "get-weather-uri",
        "get-current-internal-conditions-uri",
        "get-historic-internal-conditions-uri",
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = [
        "get-measurement-system",
        "get-weather-uri",
        "get-current-internal-conditions-uri",
        "get-historic-internal-conditions-uri",
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
