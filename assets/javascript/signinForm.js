import { auth, signInWithEmailAndPassword } from "./firebase.js";
import { db } from "./firebase.js"; // Importar Firestore
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { showMessage } from "./toastMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");

  // Cargar datos de usuario si "Recordarme" está activado
  if (localStorage.getItem("userRemember")) {
    const user = JSON.parse(localStorage.getItem("userRemember"));
    document.querySelector("#signin-email").value = localStorage
      .getItem("userRemember")
      .slice(1, -1);
    document.querySelector("#rememberMe").checked = true;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    // Obtener datos del formulario
    const signinEmail = document.querySelector("#signin-email").value;
    const signinPassword = document.querySelector("#signin-password").value;
    const rememberMe = document.querySelector("#rememberMe").checked;

    // Manejo de errores
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        signinEmail,
        signinPassword
      );

      if (rememberMe) {
        localStorage.setItem("userRemember", JSON.stringify(signinEmail));
      } else {
        localStorage.removeItem("userRemember"); // Limpiar datos si no está marcado
      }

      // Redirigir a red-social.html
      window.location.href = "red-social.html";

      // Mostrar mensaje de éxito
      showMessage("Sesión iniciada con éxito", "success");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        showMessage("Contraseña incorrecta", "error");
      } else if (error.code === "auth/user-not-found") {
        showMessage("No existe un usuario con ese correo", "error");
      } else if (error.code === "auth/invalid-email") {
        showMessage("Correo inválido", "error");
      } else {
        showMessage("Error al iniciar sesión: " + error.message, "error");
      }
    }
  });
});
