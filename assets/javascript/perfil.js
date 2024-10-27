document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user) {
      // Llenar los campos del formulario si hay información en localStorage
      document.getElementById("username").value = user.username || '';
      document.getElementById("gender").value = user.gender || '';
      document.getElementById("bio").value = user.bio || '';
      
      // Mostrar la foto de perfil si existe
      if (user.avatar) {
        document.getElementById("avatarPreview").innerHTML = `<img src="${user.avatar}" alt="Avatar" style="width: 100px; height: auto;">`;
      }
    }
  
    // Manejar la subida de foto de perfil
    document.getElementById("avatar").addEventListener("change", function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById("avatarPreview").innerHTML = `<img src="${e.target.result}" alt="Avatar" style="width: 100px; height: auto;">`;
          
          // Guarda la foto de perfil en localStorage
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.avatar = e.target.result; // Guarda la imagen en base64
          localStorage.setItem('user', JSON.stringify(user));
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Manejar el envío del formulario
    document.getElementById("perfilForm").addEventListener("submit", function(e) {
      e.preventDefault();
  
      // Obtener los valores del formulario
      const username = document.getElementById("username").value.trim();
      const gender = document.getElementById("gender").value;
      const bio = document.getElementById("bio").value.trim();
      
      // Guardar los datos en localStorage
      const user = { username, gender, bio, avatar: JSON.parse(localStorage.getItem("user")).avatar };
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirigir o mostrar un mensaje de éxito
      alert("Perfil guardado exitosamente.");
      window.location.href = './red-social.html'; // Redirigir a la página principal
    });
  });
  