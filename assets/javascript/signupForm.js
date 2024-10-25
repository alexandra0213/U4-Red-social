import { auth, updateProfile } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#formularioRegistro");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const signupEmail = document.querySelector("#registroEmail").value.trim();
    const signupUsername = document.querySelector("#username").value.trim();
    const signupPassword = document.querySelector("#registroPassword").value;
    const signupPasswordRepeat = document.querySelector("#registroPasswordRepeat").value;

    // Validar que las contraseñas coincidan
    if (signupPassword !== signupPasswordRepeat) {
      showMessage("Las contraseñas no coinciden", "error");
      return;
    }

    // Manejo de errores
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);

      // Actualizar el perfil del usuario
      await updateProfile(userCredentials.user, {
        displayName: signupUsername,
      });

      // Limpiar el formulario
      signupForm.reset();

      // Guardar la información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify({
        email: signupEmail,
        username: signupUsername,
      }));

      // Debugging: Mensaje antes de redirigir
      console.log("Registro exitoso, redirigiendo a red-social.html...");

      // Redirigir a red-social.html
      window.location.href = 'red-social.html';

      // Mostrar mensaje de éxito
      showMessage("Usuario registrado con éxito", "success");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      if (error.code === "auth/email-already-in-use") {
        showMessage("El correo ya está en uso", "error");
      } else if (error.code === "auth/invalid-email") {
        showMessage("Correo inválido", "error");
      } else if (error.code === "auth/weak-password") {
        showMessage("La contraseña debe tener al menos 6 caracteres", "error");
      } else {
        showMessage("Error inesperado: " + error.message, "error");
      }
    }
  });
});
