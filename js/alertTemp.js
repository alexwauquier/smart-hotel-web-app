import { getSensorMeasurements } from "./api/sensors.js";

let lastTemperatureNotificationTimestamp = null; // pour éviter les notifications en doublon

async function checkTemperatureAndNotify() {
  const sensorId = 1;
  const result = await getSensorMeasurements(sensorId, "last_24_hours");

  if (!result || !result.data || !result.data.measurements.length) {
    console.log("Pas de données disponibles pour ce capteur.");
    return;
  }

  const measurements = result.data.measurements;

  // Trier du plus récent au plus ancien
  const measurementsSorted = [...measurements].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Chercher la température >= 25°C (la plus récente)
  const lastOverThreshold = measurementsSorted.find(
    m => parseFloat(m.value) >= 25
  );

  if (lastOverThreshold) {
    if (lastTemperatureNotificationTimestamp !== lastOverThreshold.timestamp) {
      const temperature = parseFloat(lastOverThreshold.value).toFixed(1);
      const time = new Date(lastOverThreshold.timestamp).toLocaleTimeString();

      const notifId = lastOverThreshold.timestamp; // ID stable

      addNotification(
        notifId,
        "Temperature alert",
        `Temperature reached ${temperature}°C`,
        time
      );
      lastTemperatureNotificationTimestamp = lastOverThreshold.timestamp;
    }
  } else {
    console.log("Aucune mesure récente à 25°C ou plus.");
  }
}

function addNotification(notifId, title, description, time) {
  const notifList = document.querySelector(".notif-list");

  // Vérifie que la notification n'a pas déjà été supprimée
  const deleted = JSON.parse(localStorage.getItem('deletedNotifications')) || [];
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
checkTemperatureAndNotify();

// Puis toutes les 1 minutes
setInterval(checkTemperatureAndNotify, 5 * 60 * 1000);