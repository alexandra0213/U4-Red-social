// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Autenticación
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
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

// Inicializar Autenticación de Firebase y obtener una referencia del servicio
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore();

// Función para guardar datos del usuario
export const saveUserData = (userId, userData) => {
  return setDoc(doc(db, "users", userId), userData, { merge: true });
};

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

// Función para iniciar sesión con GitHub
export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        gender: '',
        bio: ''
      };

      saveUserData(user.uid, userData).then(() => {
        window.location.href = 'red-social.html';
      });
    })
    .catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.email;
        console.error("La cuenta ya existe con un proveedor diferente. Intenta iniciar sesión con otro método.");
      } else {
        console.error("Error de autenticación con GitHub:", error);
      }
    });
};

// Red-social
document.addEventListener("DOMContentLoaded", function () {
  const replyButtons = document.querySelectorAll(".reply-btn");

  replyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const replyForm = button.nextElementSibling;
      replyForm.style.display =
        replyForm.style.display === "none" ? "block" : "none";
    });
  });

  document.getElementById('loginWithGit').addEventListener('click', loginWithGitHub);
});
