import { auth, updateProfile } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#formularioRegistro");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const signupEmail = document.querySelector("#registroEmail").value.trim();
    const signupUsername = document.querySelector("#username").value.trim();
    const signupPassword = document.querySelector("#registroPassword").value;
    const signupPasswordRepeat = document.querySelector("#registroPasswordRepeat").value;

    if (signupPassword !== signupPasswordRepeat) {
      showMessage("Las contraseñas no coinciden", "error");
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await updateProfile(userCredentials.user, { displayName: signupUsername });
      signupForm.reset();
      localStorage.setItem('user', JSON.stringify({ email: signupEmail, username: signupUsername }));
      window.location.href = 'red-social.html';
      showMessage("Usuario registrado con éxito", "success");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      showMessage("Error: " + error.message, "error");
    }
  });
});
