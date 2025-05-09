const notifBtn = document.querySelector('.notification');
const notifMenu = document.getElementById('notif-menu');

// Afficher/masquer le menu au clic sur l'icône notification
notifBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  notifMenu.classList.toggle('hidden');
});

// Ferme le menu si clic en dehors, sauf si on clique sur un bouton de suppression
document.addEventListener('click', (e) => {
  if (!notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
    notifMenu.classList.add('hidden');
  }
});

// Écoute le clic sur le bouton de suppression d'une notification
notifMenu.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn-notif')) {
    const notifItem = e.target.closest('.notif-item');
    notifItem.remove();
    // On empêche la fermeture du menu
    e.stopPropagation();
  }
});

// Bouton "Marquer tout comme lu" : applique la classe "read" à toutes les notifications
const markAllBtn = document.getElementById('markAllRead');
markAllBtn.addEventListener('click', () => {
  const notifItems = document.querySelectorAll('.notif-item');
  notifItems.forEach(item => item.classList.add('read'));
  // Ici vous pouvez générer une indication visuelle, par exemple :
  alert('All notifications have been marked as read.');
});
