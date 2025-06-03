import { loginCustomer } from "./api/auth.js";

document.getElementById("login-form-customer").addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupérer les valeurs des champs
  const customerLastName = document.getElementById("last-name").value;
  const customerRoomNumber = document.getElementById("space-id").value;
  const rememberMe = document.getElementById("remember").checked;

  // Affiche une alerte de chargement
  Swal.fire({
    title: "Logging in...",
    text: "Please wait while we verify your credentials.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const result = await loginCustomer(customerLastName, customerRoomNumber);
    const token = result.data.token;
    const customerId = result.data.customer.id;
    const firstName = result.data.customer.first_name;
    const lastName = result.data.customer.last_name;
    const arrivalDate = result.data.customer.arrival_date;
    const departureDate = result.data.customer.departure_date;
    const spaceId = result.data.customer.space.id;
    const spaceName = result.data.customer.space.name;

    // Ferme l'alerte de chargement
    Swal.close();

    if (rememberMe) {
      sessionStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("customerId", customerId);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("arrivalDate", arrivalDate);
      localStorage.setItem("departureDate", departureDate);
      localStorage.setItem("spaceId", spaceId);
      localStorage.setItem("spaceName", spaceName);
    } else {
      localStorage.clear();
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("customerId", customerId);
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);
      sessionStorage.setItem("arrivalDate", arrivalDate);
      sessionStorage.setItem("departureDate", departureDate);
      sessionStorage.setItem("spaceId", spaceId);
      sessionStorage.setItem("spaceName", spaceName);
    }

    // Affiche l'alerte de succès
    Swal.fire({
      title: "Successful login!",
      text: "Welcome to your space.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      window.location.href = "pages/dashboard.html"; // Redirection automatique
    });
  } catch (error) {
    // Ferme l'alerte de chargement avant d'afficher l'erreur
    Swal.close();

    Swal.fire({
      title: "Connection failed",
      text: error.message,
      icon: "error",
      confirmButtonText: "Retry",
      confirmButtonColor: '#30A0BD'
    });
  }
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('space-id');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.getAttribute('type') === 'password';

  if (isPassword) {
    passwordInput.setAttribute('type', 'text');
    eyeOpen.style.display = 'none';
    eyeClosed.style.display = 'block';
  } else {
    passwordInput.setAttribute('type', 'password');
    eyeOpen.style.display = 'block';
    eyeClosed.style.display = 'none';
  }
});