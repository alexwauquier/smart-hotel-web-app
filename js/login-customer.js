import { loginCustomer } from "./api/auth.js";

document.getElementById("login-form-customer").addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  Swal.showLoading();

  // Récupérer les valeurs des champs
  const lastName = document.getElementById("last-name").value;
  const roomNumber = document.getElementById("space-id").value;
  const rememberMe = document.getElementById("remember").checked;

  try {
    const data = await loginCustomer(lastName, roomNumber);
    const token = data.token;

    // Selon "Remember me", stocker dans localStorage ou sessionStorage
    if (rememberMe) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }

    // Affichage de la bulle de succès
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
    // Affichage de la bulle d'erreur
    Swal.fire({
      title: "Connection failed",
      text: error.message,
      icon: "error",
      confirmButtonText: "Retry",
      confirmButtonColor: '#30A0BD'
    });
  }
});
