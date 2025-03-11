    // Fonction de déconnexion
    function logout() {
        // Supprimer le token de session (si utilisé)
        localStorage.removeItem('token');
        
        // Vous pouvez aussi appeler une API pour informer le serveur que l'utilisateur se déconnecte
        // await fetch('https://api.example.com/logout', { method: 'POST' });

        // Rediriger vers la page de connexion
        window.location.href = '../index.html'; // Redirection vers la page de login
    }