// Importamos la app
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Importamos el archivo de registro
import "./signupForm.js";
import "./signinForm.js";
import { checkLogin } from "./checkLogin.js";

// Manejo de autenticación
onAuthStateChanged(auth, async (user) => {
  console.log(user);
  checkLogin(user);
});
