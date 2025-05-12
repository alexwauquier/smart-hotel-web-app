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
    const data = await loginEmployee(username, password);
    const token = data.token;

    // Ferme l'alerte de chargement
    Swal.close();

    if (rememberMe) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
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
