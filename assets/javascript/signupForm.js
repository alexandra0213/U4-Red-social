import { auth, updateProfile } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

let users = []; // Array para almacenar los usuarios

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#formularioRegistro");

  signupForm.addEventListener("submit", async (e) => {
    // Evitar que la página se recargue
    e.preventDefault();
    console.log("Formulario enviado");

    // Obtener datos del formulario
    const signupEmail = document.querySelector("#registroEmail").value;
    const signupUsername = document.querySelector("#username").value;
    const signupPassword = document.querySelector("#registroPassword").value;
    const signupPasswordRepeat = document.querySelector(
      "#registroPasswordRepeat"
    ).value;

    if (signupPassword !== signupPasswordRepeat) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Almacenar el usuario
    const newUser = {
      email: signupEmail,
      username: signupUsername,
      password: signupPassword,
    };

    users.push(newUser); // Agregar el nuevo usuario al array
    console.log("Registrado", newUser);

    // Mostrar datos del usuario
    displayUser(newUser);

    // Manejo de errores
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Actualizar el perfil del usuario
      await updateProfile(auth.currentUser, {
        displayName,
      });
      // Limpiar el formulario
      signupForm.reset();

      // Mostrar mensaje de éxito
      showMessage("Usuario registrado", "success");
    } catch (error) {
      // Registro fallido
      console.log(error);
      // Mostrar mensaje de error
      if (error.code === "auth/email-already-in-use") {
        showMessage("El correo ya está en uso", "error");
      } else if (error.code === "auth/invalid-email") {
        showMessage("Correo inválido", "error");
      } else if (error.code === "auth/weak-password") {
        showMessage("Contraseña vulnerable", "error");
      } else if (error.code) {
        showMessage(error.message, "error");
      }
    }
  });

  function displayUser(user) {
    document.getElementById("registroSection").classList.add("d-none");
    document.getElementById("userSection").classList.remove("d-none");
    document.getElementById("displayUsername").innerText = user.username;
    document.getElementById("displayEmail").innerText = user.email;
  }
});
