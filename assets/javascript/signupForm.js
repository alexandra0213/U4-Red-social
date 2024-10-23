document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#formularioRegistro'); // Asegúrate de que este ID esté correcto
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const signupEmail = document.querySelector('#registroEmail').value;
        const signupUsername = document.querySelector('#username').value;
        const signupPassword = document.querySelector('#registroPassword').value;
        const signupPasswordRepeat = document.querySelector('#registroPasswordRepeat').value;

        if (signupPassword !== signupPasswordRepeat) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Almacenar el usuario
        const newUser = {
            email: signupEmail,
            username: signupUsername,
            password: signupPassword
        };

        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Redirigir a la página de red social
        window.location.href = 'red-social.html';
    });
});
