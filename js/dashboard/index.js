import { fetchDataHum, fetchDataTemp } from "../api/sensors.js";
import { createHumidityChart, createTemperatureChart } from "./charts.js";
import { setValues } from "./statusUpdater.js";

const main = async () => {
  const dataTemp = await fetchDataTemp(); 
  const dataHum = await fetchDataHum();

    if (dataTemp && dataTemp.length > 0) {
    const latest = dataTemp[0];
    const latestTemp = parseFloat(latest.temperature);

    if (dataHum && dataHum.length > 0) {
      const latest2 = dataHum[0];
      const latestHum = parseFloat(latest2.humidite);
      setValues(latestTemp, latestHum);
    }
  } else {
    console.error("Aucune donnée de température trouvée.");
  }
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
