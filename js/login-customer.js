import config from "../config.js";

document.getElementById("login-form-customer").addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupérer les valeurs des champs
  const lastName = document.getElementById("last-name").value;
  const roomNumber = document.getElementById("space-id").value;

  // Créer l'objet à envoyer dans la requête POST
  const credentials = {
    last_name: lastName,
    space_id: roomNumber
  };    

  try {
    // Effectuer la requête POST vers l'API
    const response = await fetch(`${config.API_BASE_URL}/api/auth/login/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Vérifier la réponse
    if (response.ok) {
      const data = await response.json();
      localStorage.token = data.token;
      console.log("Le token est ", localStorage.token);

      // Affichage de la bulle de succès
      Swal.fire({
        title: "Successful login !",
        text: "Welcome to your space.",
        icon: "success",
        showConfirmButton: false, // Supprime le bouton
        timer: 2000 // Ferme la popup après 2 secondes (2000 ms)
      }).then(() => {
        window.location.href = "pages/dashboard.html"; // Redirection automatique
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
