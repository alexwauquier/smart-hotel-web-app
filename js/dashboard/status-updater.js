const updateStatus = () => {
  const temperatureMin = 25;
  const humidityMax = 60;

  const tempElement = document.querySelector('.summary-card.temperature .card-value');
  const tempStatus = document.querySelector('.summary-card.temperature .card-status');
  const temperature = parseFloat(tempElement.textContent);

  if (temperature > temperatureMin) {
    tempStatus.classList.remove('normal');
    tempStatus.classList.add('high');
    tempStatus.textContent = 'High';
  } else {
    tempStatus.classList.remove('high');
    tempStatus.classList.add('normal');
    tempStatus.textContent = 'Normal';
  }

  const humidityElement = document.querySelector('.summary-card.humidity .card-value');
  const humidityStatus = document.querySelector('.summary-card.humidity .card-status');
  const humidity = parseFloat(humidityElement.textContent);

  if (humidity > humidityMax) {
    humidityStatus.classList.remove('normal');
    humidityStatus.classList.add('high');
    humidityStatus.textContent = 'High';
  } else {
    humidityStatus.classList.remove('high');
    humidityStatus.classList.add('normal');
    humidityStatus.textContent = 'Normal';
  }

  const todayOrdersElement = document.querySelector('.summary-card.orders .card-value');
  const todayOrdersStatus = document.querySelector('.summary-card.orders .card-trend');
};

function setValues(newTemp, newHumidity, newOrderCount) {
  const tempElem = document.querySelector('.summary-card.temperature .card-value');
  const humElem = document.querySelector('.summary-card.humidity .card-value');
  const todayOrdersElem = document.querySelector('.summary-card.orders .card-value');

  // Supprime la classe de chargement
  tempElem.classList.remove('loading-text');
  humElem.classList.remove('loading-text');
  todayOrdersElem.classList.remove('loading-text');

  tempElem.textContent = newTemp + '°C';
  humElem.textContent = newHumidity + '%';
  todayOrdersElem.textContent = newOrderCount;

  updateStatus();
};

export { updateStatus, setValues };
