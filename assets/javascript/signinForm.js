import { auth, signInWithEmailAndPassword } from "./firebase.js"; 
import { db } from "./firebase.js"; // Importar Firestore
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { showMessage } from "./toastMessage.js"; 

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");

  // Cargar datos de usuario si "Recordarme" está activado
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    document.querySelector("#signin-email").value = user.email;
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
      const userCredential = await signInWithEmailAndPassword(auth, signinEmail, signinPassword);

      // Obtener la información del perfil del usuario desde Firestore
      const userProfile = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userProfile.exists()) {
        // Guardar información del usuario y perfil en localStorage
        const userData = {
          email: userCredential.user.email,
          username: userProfile.data().username, // Asumiendo que hay un campo 'username' en Firestore
          gender: userProfile.data().gender, // Y otros campos como género
          bio: userProfile.data().bio,
        };

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          localStorage.removeItem("user"); // Limpiar datos si no está marcado
        }

        // Redirigir a red-social.html
        window.location.href = 'red-social.html';

        // Mostrar mensaje de éxito
        showMessage("Sesión iniciada con éxito", "success");
      } else {
        showMessage("Perfil no encontrado", "error");
      }
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
