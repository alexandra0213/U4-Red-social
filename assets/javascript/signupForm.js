let users = []; // Array para almacenar los usuarios

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#formularioRegistro');
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

        users.push(newUser); // Agregar el nuevo usuario al array
        console.log('Registrado', newUser);

        // Mostrar datos del usuario
        displayUser(newUser);
    });

    
    function displayUser(user) {
        document.getElementById('registroSection').classList.add('d-none');
        document.getElementById('userSection').classList.remove('d-none');
        document.getElementById('displayUsername').innerText = user.username;
        document.getElementById('displayEmail').innerText = user.email;
    }
});