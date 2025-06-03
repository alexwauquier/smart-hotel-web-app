const notifBtn = document.querySelector('.icon-btn'); // ⬅️ Ne vise plus `.notification` ici
const notifMenu = document.getElementById('notif-menu');

// --- Récupère la liste des notifications supprimées depuis le localStorage
function getDeletedNotifications() {
  return JSON.parse(localStorage.getItem('deletedNotifications')) || [];
}

// --- Sauvegarde une notification supprimée
function saveDeletedNotification(id) {
  const deleted = getDeletedNotifications();
  if (!deleted.includes(id)) {
    deleted.push(id);
    localStorage.setItem('deletedNotifications', JSON.stringify(deleted));
  }
}

// --- Met à jour l'affichage du badge de notification
function updateNotificationBadge() {
  const hasNotifications = notifMenu.querySelectorAll('.notif-item').length > 0;
  notifBtn.classList.toggle('notification', hasNotifications);
}

// --- Affiche ou cache le message "Vous n'avez aucune notification"
function updateNoNotificationsMessage() {
  const notifList = document.querySelector(".notif-list");
  const noNotifMsg = notifList.querySelector(".no-notifications-message");
  const notifCount = notifList.querySelectorAll(".notif-item").length;

  if (notifCount === 0) {
    noNotifMsg.style.display = "block";
  } else {
    noNotifMsg.style.display = "none";
  }
}

// --- Supprime du DOM toutes les notifications déjà supprimées au chargement
window.addEventListener('DOMContentLoaded', () => {
  const deleted = getDeletedNotifications();
  deleted.forEach(id => {
    const item = document.querySelector(`.notif-item[data-id="${id}"]`);
    if (item) item.remove();
  });

  updateNotificationBadge();
  updateNoNotificationsMessage();  // ← Ajout ici
});

// --- Affiche/masque le menu au clic sur l’icône notification
notifBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  notifMenu.classList.toggle('hidden');
});

// --- Ferme le menu si clic en dehors
document.addEventListener('click', (e) => {
  if (!notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
    notifMenu.classList.add('hidden');
  }
});

// --- Supprime la notification du DOM + la sauvegarde comme supprimée
notifMenu.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn-notif')) {
    const notifItem = e.target.closest('.notif-item');
    const notifId = notifItem.dataset.id;
    saveDeletedNotification(notifId);
    notifItem.remove();

    updateNotificationBadge();
    updateNoNotificationsMessage();  // ← Ajout ici

    e.stopPropagation(); // évite de fermer le menu
  }
});

// Mets à jour l'affichage quand une notification est ajoutée (via événement custom)
document.addEventListener('notificationsUpdated', () => {
  updateNotificationBadge();
  updateNoNotificationsMessage();
});
