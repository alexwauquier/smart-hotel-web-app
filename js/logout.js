document.getElementById("logout-btn").addEventListener("click", function() {
    logout();
});

// Fonction de déconnexion
function logout() {
    // Supprimer le token
    localStorage.removeItem("token");

    // Afficher une alerte avec SweetAlert2
    Swal.fire({
        title: "Successful logout",
        text: "You have been disconnected successfully.",
        icon: "success",
        timer: 1500, // La notification disparaît après 1.5 seconde
        showConfirmButton: false,
    });

    // Rediriger vers la page de connexion après un court délai
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1500);
}
