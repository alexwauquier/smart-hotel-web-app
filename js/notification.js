document.addEventListener('DOMContentLoaded', () => {
    const notifBtn = document.querySelector('.notification');
    const notifMenu = document.getElementById('notif-menu');
  
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifMenu.classList.toggle('hidden');
    });
  
    document.addEventListener('click', (e) => {
      if (!notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
        notifMenu.classList.add('hidden');
      }
    });
  });
  