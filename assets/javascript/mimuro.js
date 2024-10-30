import { auth, onGetPost } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const userWallLink = document.getElementById("miMuro");
  const postsContainer = document.getElementById("postsContainer");
  const mainSections = document.querySelectorAll("main > section");
  const regresarButton = document.getElementById("regresarButton");

  userWallLink.addEventListener("click", () => {
    const user = auth.currentUser;

    if (!user) {
      showMessage("Debes iniciar sesión para ver tu muro", "error");
      return;
    }

    mainSections.forEach(section => {
      section.classList.add("hide");
    });

    postsContainer.style.display = "block";
    postsContainer.innerHTML = "";

    onGetPost((snapshot) => {
      snapshot.forEach((doc) => {
        const postData = doc.data();
        if (postData.userEmail === user.email) {
          const postElement = document.createElement("div");
          postElement.classList.add("post");
          postElement.innerHTML = `
            <h5>${postData.userName}</h5>
            <p>${postData.description}</p>
            <span>${postData.dateTime}</span>
          `;
          postsContainer.appendChild(postElement);
        }
      });
      regresarButton.classList.remove("hide");
    });
  });

  regresarButton.addEventListener("click", () => {
    postsContainer.style.display = "none";
    regresarButton.classList.add("hide");
    mainSections.forEach(section => {
      section.classList.remove("hide");
    });
  });
});
