import {
  createPost,
  onGetPost,
  deletePost,
  updatePost,
  getPost,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const postForm = document.querySelector("#post-form");
const postsContainer = document.querySelector("#post-container");

// Variables para la edición
let editStatus = false;
let editId = "";

export const setupPost = (user) => {
  console.log(user);

  //CREATE
  postForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const description = postForm["description"].value;

    // Obtener la fecha y hora actual
    const dateTime = new Date().toLocaleString();

    // Crear y/o editar un nuevo post
    try {
      if (!editStatus) {
        // Crear post
        await createPost(
          description,
          user.displayName,
          user.photoURL,
          user.email,
          dateTime
        );
        // Mostrar mensaje de éxito
        showMessage("Post creado", "success");
      } else {
        // Actualizar post (con fecha y hora)
        await updatePost(editId, { description, dateTime });
        // Mostrar mensaje de éxito
        showMessage("Post actualizado", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar  el id de edición
        editId = "";

        // Modificamos lo que muestra el formulario
        document.getElementById("post-title").innerHTML =
          "Añadir un nuevo post";
        postForm["btn-agregar"].value = "Publicar";
      }

      // Limpiar el formulario
      postForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });

  // READ
  onGetPost((querySnapshot) => {
    let postsHtml = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      postsHtml += `
      <article class="post-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <img class="task-profile-picture rounded-circle" src="${
              data.userImage ? data.userImage : "./assets/img/default.pfp.png"
            }" alt="${data.userName}" />
            <p class="m-0">${data.userName}</p>
            <div id=fechayhora>${data.dateTime}</div>
          </div>
          ${
            user.email === data.userEmail
              ? `<div>
            <button class="btn btn-warning btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i></button>
            <button class="btn btn-danger btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i></button>
          </div>`
              : `<div></div>`
          }
        </header>
        <hr />
        <h4>${data.title}</h4>
        <p>${data.description}</p>
      </article>
      `;
    });

    // Mostrar los posts en el DOM
    postsContainer.innerHTML = postsHtml;
    // Todo: C R U D
    // *Update
    // Obtenemos los botones de editar
    const btnsEditar = document.querySelectorAll(".btn-editar");
    // Iteramos sobre cada botón
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        // Obtenemos el documento
        const doc = await getPost(dataset.id);
        // Obtenemos los datos
        const post = doc.data();

        // Llenamos el formulario con los datos
        postForm["description"].value = task.description;
        // Actualizamos el estado de edición y el id edición
        editStatus = true;
        editId = doc.id;
        // Cambiamos lo que muestra el formulario
        document.getElementById("post-title").innerHTML = "Editar post";
        postForm["btn-agregar"].value = "Guardar cambios";
      });
    });
    // !Delete
    // Obtenemos todos los botones
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteramos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deletePost(dataset.id);
        showMessage("Post eliminado", "success");
      });
    });
  });
};
