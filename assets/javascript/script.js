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
});
