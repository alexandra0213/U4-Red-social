import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");

// Variables para la edición
let editStatus = false;
let editId = "";

export const setupTasks = (user) => {
  console.log("Setup tasks");

  console.log(user);
  console.log(user.displayName);

  //CREATE
  taskForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();
    console.log(1);

    // Obtener los datos del formulario
    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    // Obtener la fecha y hora actual
    const dateTime = new Date().toLocaleString();

    // Crear y/o editar una nueva tarea
    try {
      if (!editStatus) {
        // Crear tarea
        await createTask(
          title,
          description,
          user.displayName,
          user.photoURL,
          user.email,
          dateTime
        );
        // Mostrar mensaje de éxito
        showMessage("Post creado", "success");
      } else {
        // Actualizar tarea (con fecha y hora)
        await updateTask(editId, { title, description, dateTime });
        // Mostrar mensaje de éxito
        showMessage("Post actualizado", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar  el id de edición
        editId = "";

        // Modificamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML =
          "Añadir un nuevo post";
        taskForm["btn-agregar"].value = "Postear";
      }

      // Limpiar el formulario
      taskForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });

  // READ
  onGetTask((querySnapshot) => {
    let tasksHtml = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      tasksHtml += `
      <article class="task-container border border-2 rounded-2 p-3 my-3">
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

    // Mostrar las tareas en el DOM
    tasksContainer.innerHTML = tasksHtml;
    // Todo: C R U D
    // *Update
    // Obtenemos los botones de editar
    const btnsEditar = document.querySelectorAll(".btn-editar");
    // Iteramos sobre cada botón
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        // Obtenemos el documento
        const doc = await getTask(dataset.id);
        // Obtenemos los datos
        const task = doc.data();

        // Llenamos el formulario con los datos
        taskForm["title"].value = task.title;
        taskForm["description"].value = task.description;
        // Actualizamos el estado de edición y el id edición
        editStatus = true;
        editId = doc.id;
        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML = "Editar post";
        taskForm["btn-agregar"].value = "Guardar cambios";
      });
    });
    // !Delete
    // Obtenemos todos los botones
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteramos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        showMessage("Tarea eliminada", "success");
      });
    });
  });
};

setupTasks(null);
