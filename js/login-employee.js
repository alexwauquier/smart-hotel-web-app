import { loginEmployee } from "./api/auth.js";

document.getElementById("login-form-customer").addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupérer les valeurs des champs
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
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
    const result = await loginEmployee(username, password);
    const token = result.data.token;
    const employeeId = result.data.employee.id;
    const firstName = result.data.employee.first_name;
    const lastName = result.data.employee.last_name;
    const typeId = result.data.employee.type.id;
    const typeLabel = result.data.employee.type.label;

    // Ferme l'alerte de chargement
    Swal.close();

    if (rememberMe) {
      sessionStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("employeeId", employeeId);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("typeId", typeId);
      localStorage.setItem("typeLabel", typeLabel);
    } else {
      localStorage.clear();
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("employeeId", employeeId);
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);
      sessionStorage.setItem("typeId", typeId);
      sessionStorage.setItem("typeLabel", typeLabel);
    }

    // Affiche l'alerte de succès
    Swal.fire({
      title: "Successful login!",
      text: "Welcome to your space.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      window.location.href = "dashboard.html";
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
const passwordInput = document.getElementById('password');
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