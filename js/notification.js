const notifBtn = document.querySelector('.notification');
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

// --- Supprime du DOM toutes les notifications déjà supprimées
window.addEventListener('DOMContentLoaded', () => {
  const deleted = getDeletedNotifications();
  deleted.forEach(id => {
    const item = document.querySelector(`.notif-item[data-id="${id}"]`);
    if (item) item.remove();
  });
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
    e.stopPropagation(); // évite de fermer le menu
  }
});
