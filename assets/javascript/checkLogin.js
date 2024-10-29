import { setupPost } from "./setupTasks.js";

const LoggedOut = document.querySelectorAll(".logged-out");

export const checkLogin = (user) => {
  // Modificamos el nav dependiendo si el usuario está logueado o no
  console.log(user);
  if (user) {
    LoggedOut.forEach((element) => (element.style.display = "none"));

    // Cargamos las tareas
    setupPost(user);
  } else {
    LoggedOut.forEach((element) => (element.style.display = "block"));
  }
};
