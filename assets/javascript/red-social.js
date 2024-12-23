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
  console.log(user);
  setupPost.user;

  if (user) {
    const greetingElement = document.getElementById("greeting");
    greetingElement.textContent = `¡Hola, ${user.displayName}! Bienvenido a TalkSpace.`;
    greetingElement.style.display = "block"; // Muestra el saludo
  }
});

const links = document.querySelectorAll('#links-list a');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(item => item.classList.remove('selected'));
    link.classList.add('selected');
  });
});
