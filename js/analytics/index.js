import { getSensorMeasurements } from "../api/sensors.js";
import { createCharts, getDataCountFromValue } from "./charts.js";

const main = async () => {
  const tempValueElement = document.querySelector('.temp-card:nth-of-type(1) .metric-value');
  const humValueElement = document.querySelector('.temp-card:nth-of-type(2) .metric-value');

  // Min et Max pour Temp
  const tempMinElement = document.querySelector('.temp-card:nth-of-type(1) .detail-item:nth-of-type(1) .value');
  const tempMaxElement = document.querySelector('.temp-card:nth-of-type(1) .detail-item:nth-of-type(2) .value');

  // Min et Max pour Humidité
  const humMinElement = document.querySelector('.temp-card:nth-of-type(2) .detail-item:nth-of-type(1) .value');
  const humMaxElement = document.querySelector('.temp-card:nth-of-type(2) .detail-item:nth-of-type(2) .value');

  // Afficher shimmer (animation loading) sur toutes ces valeurs
  [
    tempValueElement, humValueElement,
    tempMinElement, tempMaxElement,
    humMinElement, humMaxElement
  ].forEach(el => {
    el.textContent = '';
    el.classList.add('loading-text');
  });

  try {
    const resultTemp = await getSensorMeasurements(1); 
    const resultHum = await getSensorMeasurements(2);

    const dataTemp = resultTemp.data.measurements;
    const dataHum = resultHum.data.measurements;

    // Enlever shimmer uniquement si on a des données valides
    if (dataTemp.length > 0 || dataHum.length > 0) {
      [
        tempValueElement, humValueElement,
        tempMinElement, tempMaxElement,
        humMinElement, humMaxElement
      ].forEach(el => el.classList.remove('loading-text'));
    }

    if (dataTemp.length <= 0 && dataHum.length <= 0) {
      console.error("Aucune donnée disponible pour la température ou l'humidité.");
      // Ne rien faire pour garder le shimmer actif
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    // Ne rien faire pour garder le shimmer actif
  }
};

main(); // exécuter la fonction principale

window.addEventListener('load', () => {
  const savedTempValue = localStorage.getItem('temperatureTimeRange') || '24h';
  const savedHumValue = localStorage.getItem('humidityTimeRange') || '24h';

  const tempSelect = document.getElementById('temperatureTimeRange');
  const humSelect = document.getElementById('humidityTimeRange');

  if (tempSelect) tempSelect.value = savedTempValue;
  if (humSelect) humSelect.value = savedHumValue;

  createCharts(
    getDataCountFromValue(savedTempValue),
    getDataCountFromValue(savedHumValue),
    true // loader visible au premier chargement
  );
});

document.getElementById('temperatureTimeRange').addEventListener('change', (event) => {
  const value = event.target.value;
  localStorage.setItem('temperatureTimeRange', value);
  const tempCount = getDataCountFromValue(value);
  const humCount = getDataCountFromValue(document.getElementById('humidityTimeRange').value || '24h');
  createCharts(tempCount, humCount, false); // pas de loader au changement
});

document.getElementById('humidityTimeRange').addEventListener('change', (event) => {
  const value = event.target.value;
  localStorage.setItem('humidityTimeRange', value);
  const humCount = getDataCountFromValue(value);
  const tempCount = getDataCountFromValue(document.getElementById('temperatureTimeRange').value || '24h');
  createCharts(tempCount, humCount, false); // pas de loader au changement
});

setInterval(() => {
  const tempValue = localStorage.getItem('temperatureTimeRange') || '24h';
  const humValue = localStorage.getItem('humidityTimeRange') || '24h';
  createCharts(
    getDataCountFromValue(tempValue),
    getDataCountFromValue(humValue),
    false // pas de loader au refresh automatique
  );
}, 60000);
