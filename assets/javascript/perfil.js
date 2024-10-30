document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user) {
      document.getElementById("gender").value = user.gender || '';
      document.getElementById("bio").value = user.bio || '';
  
      if (user.avatar) {
        document.getElementById("avatarPreview").innerHTML = `<img src="${user.avatar}" alt="Avatar" style="width: 100px; height: auto;">`;
      }
    }
  
    document.getElementById("avatar").addEventListener("change", function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById("avatarPreview").innerHTML = `<img src="${e.target.result}" alt="Avatar" style="width: 100px; height: auto;">`;
  
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.avatar = e.target.result;
          localStorage.setItem('user', JSON.stringify(user));
        };
        reader.readAsDataURL(file);
      }
    });
  
    document.getElementById("perfilForm").addEventListener("submit", function(e) {
      e.preventDefault();
  
      const gender = document.getElementById("gender").value;
      const bio = document.getElementById("bio").value.trim();
      const user = JSON.parse(localStorage.getItem("user"));
  
      const updatedUser = {
        ...user,
        gender,
        bio
      };
  
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      saveUserData(user.uid, updatedUser).then(() => {
        alert("Perfil guardado exitosamente.");
        window.location.href = './red-social.html';
      });
    });
  });
  