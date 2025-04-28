import config from "../config.js";

document.getElementById("login-form-customer").addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupérer les valeurs des champs
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("remember").checked; // <- Nouveau

  // Créer l'objet à envoyer dans la requête POST
  const credentials = { username, password };

  try {
    // Effectuer la requête POST vers l'API
    const response = await fetch(`${config.API_BASE_URL}/api/auth/login/employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Vérifier la réponse
    if (response.ok) {
      const data = await response.json();

      // Selon "Remember me", stocker dans localStorage ou sessionStorage
      if (rememberMe) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      console.log("Le token est ", rememberMe ? localStorage.token : sessionStorage.token);

      // Affichage de la bulle de succès
      Swal.fire({
        title: "Successful login!",
        text: "Welcome to your space.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        window.location.href = "dashboard.html"; // Redirection automatique
      });
    } else {
      Swal.fire({
        title: "Connection failed",
        text: "Check your login.",
        icon: "error",
        confirmButtonText: "Retry",
        confirmButtonColor: '#30A0BD'
      });
    }
  } catch (error) {
    console.error("Login error", error);
    alert("An error has occurred. Please try again later.");
  }
});
