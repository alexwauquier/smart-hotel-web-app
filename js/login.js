// Fonction de connexion
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const lastname = document.getElementById('username').value;
    const roomNumber = document.getElementById('password').value;

    try {
        const response = await fetch('https://api.example.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastname: lastname,
                roomNumber: roomNumber,
            }),
        });

        const data = await response.json();
        
        if (data.success) {
            // Si la connexion réussit, stocker le token et rediriger l'utilisateur
            localStorage.setItem('token', data.token);
            window.location.href = '../pages/dashboard.html'; // Rediriger vers le tableau de bord
        } else {
            alert('Invalid login credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});