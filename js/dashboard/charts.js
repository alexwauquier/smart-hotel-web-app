import { fetchDataHum, fetchDataTemp } from "../api/sensors.js";

let temperatureChartInstance = null;
let humidityChartInstance = null;

async function createHumidityChart(dataCount = 7, showLoader = true) {
  const loader = document.querySelector('#humidityChart').previousElementSibling;
  const canvas = document.getElementById('humidityChart');

  if (showLoader) {
    loader.style.display = 'block';
    canvas.style.display = 'none';
  }

  const result = await fetchDataHum();

  const humData = result.data.measurements.map(measurement => ({
    humidity: measurement.value,
    timestamp: new Date(measurement.timestamp).toLocaleTimeString("es-ES")
  }));

  if (!humData) {
    if (showLoader) loader.style.display = 'none';
    return;
  }

  const lastHumData = humData.slice(0, dataCount);
  const labels = lastHumData.map(entry => entry.timestamp);
  const humidityValues = lastHumData.map(entry => entry.humidity);

  if (humidityChartInstance) humidityChartInstance.destroy();

  const minHum = Math.min(...humidityValues);
  const maxHum = Math.max(...humidityValues);

  humidityChartInstance = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels.reverse(),
      datasets: [{
        label: 'Humidity (%)',
        data: humidityValues.reverse(),
        borderColor: '#26c6da',
        backgroundColor: 'rgba(38, 198, 218, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#26c6da',
        tension: 0.4,
        fill: true
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
          min: minHum - 0.1,
          max: maxHum + 0.1
        }
      }
    }
  });

  if (showLoader) {
    loader.style.display = 'none';
    canvas.style.display = 'block';
  } else {
    canvas.style.display = 'block';
  }
};

async function createTemperatureChart(dataCount = 7, showLoader = true) {
  const loader = document.querySelector('#temperatureChart').previousElementSibling;
  const canvas = document.getElementById('temperatureChart');

  if (showLoader) {
    loader.style.display = 'block';
    canvas.style.display = 'none';
  }

  const result = await fetchDataTemp();

  const tempData = result.data.measurements.map(measurement => ({
    temperature: measurement.value,
    timestamp: new Date(measurement.timestamp).toLocaleTimeString("es-ES")
  }));

  if (!tempData) {
    if (showLoader) loader.style.display = 'none';
    return;
  }

  const lastTempData = tempData.slice(0, dataCount);
  const labels = lastTempData.map(entry => entry.timestamp);
  const temperatureValues = lastTempData.map(entry => entry.temperature);

  if (temperatureChartInstance) temperatureChartInstance.destroy();

  const minTemp = Math.min(...temperatureValues);
  const maxTemp = Math.max(...temperatureValues);

  temperatureChartInstance = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels.reverse(),
      datasets: [{
        label: 'Temperature (°C)',
        data: temperatureValues.reverse(),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#ff9800',
        tension: 0.4,
        fill: true
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
          min: minTemp - 0.1,
          max: maxTemp + 0.1
        }
      }
    }
  });

  if (showLoader) {
    loader.style.display = 'none';
    canvas.style.display = 'block';
  } else {
    canvas.style.display = 'block';
  }
};

export { createHumidityChart, createTemperatureChart };
