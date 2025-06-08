import { getSensorMeasurements } from "../api/sensors.js";
import { setValues } from "./status-updater.js";

let temperatureChartInstance = null;
let humidityChartInstance = null;

const createCharts = async (tempDataCount = 7, humDataCount = 7, showLoader = true) => {
  const tempLoader = document.querySelector('#temperatureChart').previousElementSibling;
  const humLoader = document.querySelector('#humidityChart').previousElementSibling;
  const tempCanvas = document.getElementById('temperatureChart');
  const humCanvas = document.getElementById('humidityChart');

  if (showLoader) {
    tempLoader.style.display = 'block';
    tempCanvas.style.display = 'none';
    humLoader.style.display = 'block';
    humCanvas.style.display = 'none';
  }

  const resultTemp = await getSensorMeasurements(1); 
  const resultHum = await getSensorMeasurements(2);

  const dataTemp = resultTemp.data.measurements.map(measurement => ({
    temperature: measurement.value,
    timestamp: new Date(measurement.timestamp).toLocaleTimeString("es-ES")
  }));
  const dataHum = resultHum.data.measurements.map(measurement => ({
    humidity: measurement.value,
    timestamp: new Date(measurement.timestamp).toLocaleTimeString("es-ES")
  }));

  if (!dataTemp || !dataHum) {
    if (showLoader) {
      tempLoader.style.display = 'none';
      humLoader.style.display = 'none';
    }
    return;
  }

  const lastTempData = dataTemp.slice(0, tempDataCount);
  const lastHumData = dataHum.slice(0, humDataCount);

  const labelsTemp = lastTempData.map(entry => entry.timestamp);
  const labelsHum = lastHumData.map(entry => entry.timestamp);

  const temperatureValues = lastTempData.map(entry => entry.temperature);
  const humidityValues = lastHumData.map(entry => entry.humidity);

  setValues(lastTempData, lastHumData);

  if (temperatureChartInstance) temperatureChartInstance.destroy();
  if (humidityChartInstance) humidityChartInstance.destroy();

  temperatureChartInstance = new Chart(tempCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labelsTemp.reverse(),
      datasets: [{
        label: 'Température',
        data: temperatureValues.reverse(),
        borderColor: '#FF6B6B',
        backgroundColor: '#ff6b6b20',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#FF6B6B',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 6, autoSkip: true } },
        y: {
          grid: { color: '#f0f0f0' },
          ticks: { maxTicksLimit: 5 },
          beginAtZero: false,
          min: Math.min(...temperatureValues) - 0.1,
          max: Math.max(...temperatureValues) + 0.1
        }
      }
    }
  });

  humidityChartInstance = new Chart(humCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labelsHum.reverse(),
      datasets: [{
        label: 'Humidité',
        data: humidityValues.reverse(),
        borderColor: '#4DABF7',
        backgroundColor: '#4dabf720',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#4DABF7',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 6, autoSkip: true } },
        y: {
          grid: { color: '#f0f0f0' },
          ticks: { maxTicksLimit: 5 },
          beginAtZero: false,
          min: Math.min(...humidityValues) - 0.1,
          max: Math.max(...humidityValues) + 0.1
        }
      }
    }
  });

  if (showLoader) {
    tempLoader.style.display = 'none';
    humLoader.style.display = 'none';
    tempCanvas.style.display = 'block';
    humCanvas.style.display = 'block';
  } else {
    tempCanvas.style.display = 'block';
    humCanvas.style.display = 'block';
  }
};

function getDataCountFromValue(value) {
  switch (value) {
    case '24h': return 7;
    case '7d': return 12;
    case '30d': return 16;
    default: return 7;
  }
}

export { createCharts, getDataCountFromValue };
