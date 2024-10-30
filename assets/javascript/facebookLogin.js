// checkLogin.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

export const checkLogin = (user) => {
  if (user) {
    // Usuario autenticado
    document.getElementById("greeting").style.display = "block";
    document.getElementById("greeting").innerText = `Hola, ${user.email}`;
    document.getElementById("logout").style.display = "block";
  } else {
    // Usuario no autenticado
    document.getElementById("greeting").style.display = "none";
    document.getElementById("logout").style.display = "none";
  }
};

onAuthStateChanged(auth, (user) => {
  checkLogin(user);
});
