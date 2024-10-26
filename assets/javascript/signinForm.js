import { auth, signInWithEmailAndPassword } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");

  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    document.querySelector("#signin-email").value = user.email;
    document.querySelector("#rememberMe").checked = true;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const signinEmail = document.querySelector("#signin-email").value;
    const signinPassword = document.querySelector("#signin-password").value;
    const rememberMe = document.querySelector("#rememberMe").checked;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, signinEmail, signinPassword);
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify({
          email: userCredential.user.email,
          username: userCredential.user.displayName || "Usuario",
        }));
      } else {
        localStorage.removeItem("user");
      }
      window.location.href = 'red-social.html';
      showMessage("Sesión iniciada con éxito", "success");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      showMessage("Error: " + error.message, "error");
    }
  });
});
