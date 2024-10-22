document.getElementById('avatar').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const preview = document.getElementById('avatarPreview');
        preview.innerHTML = '<img src="' + e.target.result + '" alt="Avatar" />';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});