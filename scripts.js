document.addEventListener("DOMContentLoaded", function () {
    //Login Panel
    var loginOpener = document.getElementById("loginOpener");
    var loginButton = document.getElementById("login");
    var cancelButton = document.getElementById("cancel");
    var loginPanel = document.getElementById("loginPanel");
    var inputs = document.querySelectorAll(".login-box input");
  
    function toggleOverlay(isVisible) {
      var overlays = document.querySelectorAll(".overlay");
      overlays.forEach(function (overlay) {
        overlay.style.display = isVisible ? "block" : "none";
      });
    }
  
    function toggleLoginPanel(shouldClose) {
      if (shouldClose) {
        loginPanel.style.display = "none";
        inputs.forEach((input) => (input.value = ""));
        clearErrorMessages();
        toggleOverlay(false); // Close the overlay
      } else {
        loginPanel.style.display = "block";
        toggleOverlay(true); // Open the overlay
      }
    }
  
    function clearErrorMessages() {
      var errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach(function (message) {
        message.textContent = "";
      });
    }
  
    function validateInputs() {
        var isValid = true;
        var username = document.querySelector('input[name="username"]');
        var email = document.querySelector('input[name="email"]');
        var password = document.querySelector('input[name="password"]');
    
        if (!username.value.trim()) {
            document.getElementById('usernameError').textContent = 'Benutzername eingeben.';
            isValid = false;
        } else {
            document.getElementById('usernameError').textContent = '';
        }
    
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            document.getElementById('emailError').textContent = 'E-Mail Addresse eingeben.';
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            document.getElementById('emailError').textContent = 'Bitte eine gültige E-Mail Addresse eingeben.';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }
    
        if (!password.value.trim()) {
            document.getElementById('passwordError').textContent = 'Passwort eingeben.';
            isValid = false;
        } else {
            document.getElementById('passwordError').textContent = '';
        }
    
        return isValid;
    }
  
    loginOpener.addEventListener("click", function (e) {
      e.preventDefault();
      toggleLoginPanel(false);
    });
  
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (validateInputs()) {
        toggleLoginPanel(true);
      }
    });
  
    cancelButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleLoginPanel(true);
    });

  });
  