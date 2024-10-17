// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// Inicializar Firestore
export const db = getFirestore();

//Todo: Operaciones CRUD
//**Crear tarea (Create) */
export const createTask = (
  title,
  description,
  userName,
  userImage,
  userEmail,
  dateTime
) =>
  addDoc(collection(db, "tasks"), {
    title,
    description,
    userName,
    userImage,
    userEmail,
    dateTime,
  });
//**Leer tarea (Read) */
export const onGetTask = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const getTask = (id) => getDoc(doc(db, "tasks", id));
//**Actualizar tareas (Update) */
export const updateTask = (id, newData) =>
  updateDoc(doc(db, "tasks", id), newData);
//**Borrar tareas (Delete) */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

// Foto de perfil
