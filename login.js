document.addEventListener("DOMContentLoaded", function () {
  var loginOpener = document.getElementById("loginOpener");
  var loginButton = document.getElementById("login");
  var cancelButton = document.getElementById("cancel");
  var loginPanel = document.getElementById("loginPanel");
  var inputs = document.querySelectorAll(".login-box input");

  function toggleOverlay(isVisible) {
    var overlay = document.getElementById("overlay");
    overlay.style.display = isVisible ? "block" : "none";
  }

  // Toggle Login Panel
  function toggleLoginPanel(shouldClose) {
    if (shouldClose) {
      loginPanel.style.display = "none";
      inputs.forEach((input) => (input.value = ""));
      toggleOverlay(false);
      console.log("User is logged out.");
    } else {
      loginPanel.style.display = "block";
      toggleOverlay(true);
    }
  }

  // Validate Login Inputs
  function validateInputs() {
    var isValid = true;
    var username = document.querySelector('input[name="username"]');
    var password = document.querySelector('input[name="password"]');

    if (!username.value.trim()) {
      document.getElementById("usernameError").textContent =
        "Benutzername eingeben.";
      isValid = false;
    } else {
      document.getElementById("usernameError").textContent = "";
    }

    if (!password.value.trim()) {
      document.getElementById("passwordError").textContent =
        "Passwort eingeben.";
      isValid = false;
    } else {
      document.getElementById("passwordError").textContent = "";
    }

    return isValid;
  }

  // Login Function
  function login() {
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;

    fetch("http://localhost:2941/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          console.log(`Logged in successfully as ${username}`);
          toggleLoginPanel(true);

          // Show the todo list section
          var todoListSection = document.getElementById("todoList");
          todoListSection.style.display = "block";
        } else {
          document.getElementById("passwordError").textContent =
            "Login failed. Wrong username or password.";
          console.log("Login failed. Wrong username or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("passwordError").textContent =
          "An error occurred during login.";
        console.log("An error occurred during login.");
      });
  }

  // Event Listeners
  loginOpener.addEventListener("click", function (e) {
    e.preventDefault();
    toggleLoginPanel(false);
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateInputs()) {
      login();
    }
  });

  cancelButton.addEventListener("click", function (e) {
    e.preventDefault();
    toggleLoginPanel(true);
  });
});
