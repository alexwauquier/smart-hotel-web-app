document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si aucun token n'est trouvé, rediriger vers la page de connexion
    window.location.href = "../index.html"; // Remplace par la page de connexion si différent
  }
});
