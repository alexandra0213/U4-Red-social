
  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar el formulario de registro
    document.getElementById("showRegisterLink").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginSection").classList.add("d-none");
      document.getElementById("registroSection").classList.remove("d-none");
    });

    // Mostrar el formulario de inicio de sesión
    document.getElementById("showLoginLink").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("registroSection").classList.add("d-none");
      document.getElementById("loginSection").classList.remove("d-none");
    });

    // Mostrar la sección de recuperación de contraseña
    document.getElementById("forgotPasswordLink").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginSection").classList.add("d-none");
      document.getElementById("recuperarContainer").classList.remove("d-none");
    });

    // Regresar al inicio de sesión desde la recuperación de contraseña
    document.getElementById("volverBtn").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("recuperarContainer").classList.add("d-none");
      document.getElementById("loginSection").classList.remove("d-none");
    });

    // Mostrar la sección de inicio de sesión con opciones
    document.getElementById("showLoginWith").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginSection").classList.add("d-none");
      document.getElementById("loginwith").classList.remove("d-none");
    });

    // Regresar al inicio de sesión desde las opciones de inicio de sesión
    document.getElementById("backToLogin").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginwith").classList.add("d-none");
      document.getElementById("loginSection").classList.remove("d-none");
    });
  });