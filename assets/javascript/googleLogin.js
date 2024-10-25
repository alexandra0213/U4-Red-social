import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const googleButton = document.querySelector("#loginWithGoogle");

googleButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  //Forzamos la selección de cuenta
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const credentials = await signInWithPopup(auth, provider);

    showMessage("Sesión iniciada", "success");
    // Redirigir a red-social.html
    window.location.href = "./red-social.html";
  } catch (error) {
    console.log(error);
  }
});
