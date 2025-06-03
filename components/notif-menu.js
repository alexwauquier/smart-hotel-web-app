class NotifMenuComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div id="notif-menu" class="notif-menu hidden">
        <!-- En-tête du menu -->
        <div class="notif-header">
          <span class="notif-title">Notifications</span>
        </div>
        <!-- Liste des notifications fictives -->
        <div class="notif-list">
          
          <div class="notif-item" data-id="1">

          <div class="notification-item">
            <div class="notification-icon order"></div>
            <div class="notification-details">
              <p class="notification-title">New order received</p>
              <p class="notification-description">Room 302 ordered 2 cocktails</p>
              <p class="notification-time">10 minutes ago</p>
            </div>
          </div>

            <button class="delete-btn-notif" title="Delete">
              <!-- Petite icône "X" pour supprimer -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FF0000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="notif-item" data-id="2">

            <div class="notification-item">
              <div class="notification-icon employee"></div>
              <div class="notification-details">
                <p class="notification-title">Staff check-in</p>
                <p class="notification-description">Sophie Moreau started shift</p>
                <p class="notification-time">1 hour ago</p>
              </div>
            </div>

            <button class="delete-btn-notif" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FF0000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="notif-list">
            <!-- Les notifications s’ajoutent ici -->
            <p class="no-notifications-message" style="display:none;">You have no notification.</p>
          </div>

        </div>
      </div>
    `;
  }
};

customElements.define('notif-menu-component', NotifMenuComponent);
