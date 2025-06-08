import { getSensorMeasurements } from "../api/sensors.js";
import { createHumidityChart, createTemperatureChart } from "./charts.js";
import { setValues } from "./status-updater.js";

const main = async () => {
  const resultTemp = await getSensorMeasurements(1); 
  const resultHum = await getSensorMeasurements(2);

  const dataTemp = resultTemp.data.measurements;
  const dataHum = resultHum.data.measurements;

  const latestTemp = parseFloat(dataTemp[0].value);
  const latestHum = parseFloat(dataHum[0].value);

  setValues(latestTemp, latestHum);
};

main();

window.addEventListener('load', () => {
  // Récupération des valeurs sauvegardées
  const savedTempValue = localStorage.getItem('temperatureTimeRange') || '24h';
  const savedHumValue = localStorage.getItem('humidityTimeRange') || '24h';

  document.getElementById('temperatureTimeRange').value = savedTempValue;
  document.getElementById('humidityTimeRange').value = savedHumValue;

  function getCount(value) {
    return value === '24h' ? 7 : value === '7d' ? 12 : 16;
  }

  // Premier chargement avec loader
  createTemperatureChart(getCount(savedTempValue), true);
  createHumidityChart(getCount(savedHumValue), true);

  document.getElementById('temperatureTimeRange').addEventListener('change', (event) => {
    const value = event.target.value;
    localStorage.setItem('temperatureTimeRange', value);
    // Pas de loader au changement
    createTemperatureChart(getCount(value), false);
  });

  document.getElementById('humidityTimeRange').addEventListener('change', (event) => {
    const value = event.target.value;
    localStorage.setItem('humidityTimeRange', value);
    // Pas de loader au changement
    createHumidityChart(getCount(value), false);
  });
});

setInterval(() => {
  const tempSelect = document.getElementById('temperatureTimeRange').value;
  const humSelect = document.getElementById('humidityTimeRange').value;

  function getCount(value) {
    return value === '24h' ? 7 : value === '7d' ? 12 : 16;
  }

  createTemperatureChart(getCount(tempSelect));
  createHumidityChart(getCount(humSelect));
}, 60000);
