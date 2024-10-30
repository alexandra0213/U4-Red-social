import { auth, recoverPassword } from './firebase.js'; 

// Manejo del formulario de recuperación
document.addEventListener("DOMContentLoaded", () => {
  const recuperarForm = document.getElementById('recuperarForm');

  if (recuperarForm) {
    recuperarForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evitar el envío del formulario

      const email = document.getElementById('recuperarEmail').value;

      recoverPassword(email)
        .then(() => {
          // Notificación de éxito
          Toastify({
            text: "Se han enviado instrucciones a tu correo para restablecer la contraseña.",
            duration: 3000,
            gravity: "top",
            position: 'center',
            backgroundColor: "green",
          }).showToast();
        })
        .catch((error) => {
          console.error("Error al enviar el correo:", error); // Para depuración
          let errorMessage = error.message;
          Toastify({
            text: errorMessage,
            duration: 3000,
            gravity: "top",
            position: 'center',
            backgroundColor: "red",
          }).showToast();
        });
    });
  }
});
