import "./signupForm.js";

localStorage.setItem('currentUser', JSON.stringify(newUser));

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Mostrar el formulario de registro
    document.getElementById('showRegisterLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginSection').classList.add('d-none');
        document.getElementById('registroSection').classList.remove('d-none');
    });

    // Mostrar el formulario de inicio de sesión
    document.getElementById('showLoginLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('registroSection').classList.add('d-none');
        document.getElementById('loginSection').classList.remove('d-none');
    });

    // Mostrar la sección de recuperación de contraseña
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginSection').classList.add('d-none');
        document.getElementById('recuperarContainer').classList.remove('d-none');
    });

    // Regresar al inicio de sesión desde la recuperación de contraseña
    document.getElementById('volverBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('recuperarContainer').classList.add('d-none');
        document.getElementById('loginSection').classList.remove('d-none');
    });

    // Mostrar opciones de inicio de sesión con otros servicios
    document.getElementById('showLoginWith').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginSection').classList.add('d-none');
        document.getElementById('loginwith').classList.remove('d-none');
    });

    // Regresar al inicio de sesión desde las opciones de inicio de sesión
    document.getElementById('backToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginwith').classList.add('d-none');
        document.getElementById('loginSection').classList.remove('d-none');
    });

    // Mostrar información del usuario si está registrado
    if (currentUser) {
        document.getElementById('displayUsername').innerText = currentUser.username;
        document.getElementById('displayEmail').innerText = currentUser.email;

        // Cambiar el texto del encabezado
        document.getElementById('headerGreeting').innerText = `Un lugar seguro para ${currentUser.username}`;
        
        // Mostrar un saludo personalizado
        document.getElementById('userGreeting').innerText = `¡Hola, ${currentUser.username}! Bienvenido a tu espacio.`;
    } else {
        // Si no hay usuario, redirigir a la página de registro
        window.location.href = 'registro.html';
    }


});

