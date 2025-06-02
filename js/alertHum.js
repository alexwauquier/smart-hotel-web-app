import { getSensorMeasurements } from "./api/sensors.js";

let lastHumidityNotificationTimestamp = null; // pour éviter les notifications en doublon

async function checkHumidityAndNotify() {
  const sensorId = 2;
  const result = await getSensorMeasurements(sensorId, "last_24_hours");

  if (!result || !result.data || !result.data.measurements.length) {
    console.log("Pas de données disponibles pour ce capteur d'humidité.");
    return;
  }

  const measurements = result.data.measurements;

  // Trier du plus récent au plus ancien
  const measurementsSorted = [...measurements].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Chercher l'humidité >= 60% (la plus récente)
  const lastOverThreshold = measurementsSorted.find(
    m => parseFloat(m.value) >= 60
  );

  if (lastOverThreshold) {
    if (lastHumidityNotificationTimestamp !== lastOverThreshold.timestamp) {
      const humidity = parseFloat(lastOverThreshold.value).toFixed(1);
      const time = new Date(lastOverThreshold.timestamp).toLocaleTimeString();

      const notifId = lastOverThreshold.timestamp; // ID stable basé sur timestamp

      addNotification(
        notifId,
        "Humidité élevée",
        `Humidité atteinte ${humidity}%`,
        time
      );
      lastHumidityNotificationTimestamp = lastOverThreshold.timestamp;
    }
  } else {
    console.log("Aucune mesure récente à 60% ou plus.");
  }
}

function addNotification(notifId, title, description, time) {
  const notifList = document.querySelector(".notif-list");

  // Récupérer les notifications supprimées
  const deleted = JSON.parse(localStorage.getItem('deletedNotifications')) || [];

  // Si la notification a déjà été supprimée, ne pas l'afficher
  if (deleted.includes(String(notifId))) {
    return;
  }

  const notifItem = document.createElement("div");
  notifItem.classList.add("notif-item");
  notifItem.dataset.id = notifId;

  notifItem.innerHTML = `
    <div class="notification-item">
      <div class="notification-icon alert"></div>
      <div class="notification-details">
        <p class="notification-title">${title}</p>
        <p class="notification-description">${description}</p>
        <p class="notification-time">${time}</p>
      </div>
    </div>
    <button class="delete-btn-notif" title="Delete">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  notifList.prepend(notifItem);
}

// Vérifie immédiatement au chargement
checkHumidityAndNotify();

// Puis toutes les 5 minutes
setInterval(checkHumidityAndNotify, 5 * 60 * 1000);