// Importamos la app
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

//funcionalidad de ancors

$(document).ready(function() {
    $('#showRegisterLink').click(function(e) {
        e.preventDefault();
        $('#loginSection').addClass('d-none');
        $('#registroSection').removeClass('d-none');
    });

    $('#showLoginLink').click(function(e) {
        e.preventDefault();
        $('#registroSection').addClass('d-none');
        $('#loginSection').removeClass('d-none');
    });

    $('#forgotPasswordLink').click(function(e) {
        e.preventDefault();
        $('#loginSection').addClass('d-none');
        $('#recuperarContainer').removeClass('d-none');
    });

    $('#volverBtn').click(function(e) {
        e.preventDefault();
        $('#recuperarContainer').addClass('d-none');
        $('#loginSection').removeClass('d-none');
    });

    $('#showLoginWith').click(function(e) { // Cambié el ID aquí
        e.preventDefault();
        $('#loginSection').addClass('d-none');
        $('#loginwith').removeClass('d-none'); // Asegúrate de que esto sea el ID correcto
    });

    $('#backToLogin').click(function(e) {
        e.preventDefault();
        $('#loginwith').addClass('d-none');
        $('#loginSection').removeClass('d-none');
    });
});


