// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Autenticación
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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
  appId: "1:394527922940:web:3111c88b3846724fdd5579"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Inicializar Autenticacion de Firebase y obtener una referencia del servicio
export const auth = getAuth(app);
// Inicializar Firestore
export const db = getFirestore();