document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.username) {
      const greetingElement = document.getElementById("greeting");
      greetingElement.textContent = `¡Hola, ${user.username}! Bienvenido a TalkSpace.`;
      greetingElement.style.display = "block"; // Muestra el saludo
    }
  });
  