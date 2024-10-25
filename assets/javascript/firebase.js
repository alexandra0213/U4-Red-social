// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Autenticación
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl8sxovu7G-Lou6yDeNt1Yxq4iwar4V6I",
  authDomain: "talkspace-1192c.firebaseapp.com",
  projectId: "talkspace-1192c",
  storageBucket: "talkspace-1192c.appspot.com",
  messagingSenderId: "394527922940",
  appId: "1:394527922940:web:3111c88b3846724fdd5579",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Autenticacion de Firebase y obtener una referencia del servicio
export const auth = getAuth(app);
// Inicializar Firestore
export const db = getFirestore();

// Todo: Operaciones CRUD
// Crear post (Create)
export const createPost = (description, userName, userImage, userEmail, dateTime) =>
  addDoc(collection(db, "posts"), {
    description,
    userName,
    userImage,
    userEmail,
    dateTime,
  });

// Leer post (Read)
export const onGetPost = (callback) =>
  onSnapshot(collection(db, "posts"), callback);

export const getPost = (id) => getDoc(doc(db, "posts", id));

// Actualizar posts (Update)
export const updatePost = (id, newData) =>
  updateDoc(doc(db, "posts", id), newData);

// Borrar posts (Delete)
export const deletePost = (id) => deleteDoc(doc(db, "posts", id));

// Foto de perfil
export { updateProfile, signInWithEmailAndPassword };

// Red-social
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos todos los botones de responder
  const replyButtons = document.querySelectorAll(".reply-btn");

  // Agregamos un evento de clic a cada botón de respuesta
  replyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Mostramos el área de respuesta asociada
      const replyForm = button.nextElementSibling; // Se asume que el div de respuesta sigue al botón
      replyForm.style.display =
        replyForm.style.display === "none" ? "block" : "none";
    });
  });
});
