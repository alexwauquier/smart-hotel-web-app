class UserProfileComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="user-profile">
        <img src="../images/titi.png" alt="Profile">
        <div class="user-info">
          <div class="user-name"></div>
          <div class="user-type-label"></div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // Tenter de récupérer les données d'abord dans localStorage, puis sessionStorage
    const firstName = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName') || sessionStorage.getItem('lastName');
    const typeLabel = localStorage.getItem('typeLabel') || sessionStorage.getItem('typeLabel');

    const userNameDiv = this.querySelector('.user-name');
    const userTypeDiv = this.querySelector('.user-type-label');

    userNameDiv.textContent = `${firstName} ${lastName}`;

    if (typeLabel) {
      userTypeDiv.textContent = typeLabel;
    } else {
      userTypeDiv.textContent = "Customer";
    }
  }
}

customElements.define('user-profile', UserProfileComponent);
