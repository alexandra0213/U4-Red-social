// Importamos la app
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import { checkLogin } from "./checkLogin.js";
import { setupPost } from "./setupTasks.js";

onAuthStateChanged(auth, async (user) => {
  console.log(user);
  checkLogin(user);
});

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Red social js");
  setupPost.user;

  if (user && user.username) {
    const greetingElement = document.getElementById("greeting");
    greetingElement.textContent = `¡Hola, ${user.username}! Bienvenido a TalkSpace.`;
    greetingElement.style.display = "block"; // Muestra el saludo
  }
});
