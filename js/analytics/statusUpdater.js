const updateStatus = () => {
  // Seuils définis pour la température et l'humidité
  const temperatureMin = 25;
  const humidityMax = 60;

  // Récupération de l'élément DOM contenant la valeur de température
  const tempElement = document.querySelector('.temp-card:nth-of-type(1) .metric-value');
  const tempStatus = document.querySelector('.temp-card:nth-of-type(1) .status');
  const temperature = parseFloat(tempElement.textContent); // Conversion du texte en nombre

  // Vérification si la température dépasse le seuil minimum
  if (temperature > temperatureMin) {
    // Mise à jour de la classe CSS pour indiquer un état d'alerte
    tempStatus.classList.remove('normal');
    tempStatus.classList.add('warning');
    tempStatus.textContent = 'High'; // Texte d'état
  } else {
    // Retour à l'état normal si la température est correcte
    tempStatus.classList.remove('warning');
    tempStatus.classList.add('normal');
    tempStatus.textContent = 'Normal';
  }

  // Récupération de l'élément DOM contenant la valeur d'humidité
  const humidityElement = document.querySelector('.temp-card:nth-of-type(2) .metric-value');
  const humidityStatus = document.querySelector('.temp-card:nth-of-type(2) .status');
  const humidity = parseFloat(humidityElement.textContent); // Conversion en nombre

  // Vérification si l'humidité dépasse le seuil maximum
  if (humidity > humidityMax) {
    humidityStatus.classList.remove('normal');
    humidityStatus.classList.add('warning');
    humidityStatus.textContent = 'High'; // Humidité trop élevée
  } else {
    humidityStatus.classList.remove('warning');
    humidityStatus.classList.add('normal');
    humidityStatus.textContent = 'Normal';
  }
};

const setValues = (newTempData, newHumData) => {
  // Extraire les valeurs minimales et maximales pour la température et l'humidité
  const minTemp = Math.min(...newTempData.map(entry => parseFloat(entry.temperature)));
  const maxTemp = Math.max(...newTempData.map(entry => parseFloat(entry.temperature)));

  const minHum = Math.min(...newHumData.map(entry => parseFloat(entry.humidite)));
  const maxHum = Math.max(...newHumData.map(entry => parseFloat(entry.humidite)));

  // Mettre à jour les valeurs affichées pour la température et l'humidité
  document.querySelector('.temp-card:nth-of-type(1) .metric-value').textContent = newTempData[0].temperature + '°C'; // Dernière température
  document.querySelector('.temp-card:nth-of-type(2) .metric-value').textContent = newHumData[0].humidite + '%'; // Dernière humidité

  // Mettre à jour les valeurs Min et Max correctement dans les éléments respectifs
  document.querySelector('.temp-card:nth-of-type(1) .detail-item:nth-of-type(1) .value').textContent = `${minTemp}°C`; // Min Temp
  document.querySelector('.temp-card:nth-of-type(1) .detail-item:nth-of-type(2) .value').textContent = `${maxTemp}°C`; // Max Temp

  document.querySelector('.temp-card:nth-of-type(2) .detail-item:nth-of-type(1) .value').textContent = `${minHum}%`; // Min Hum
  document.querySelector('.temp-card:nth-of-type(2) .detail-item:nth-of-type(2) .value').textContent = `${maxHum}%`; // Max Hum

  updateStatus(); // Mettre à jour l'état (Normal/High) en fonction des valeurs
};

export { updateStatus, setValues };
