
document.addEventListener("DOMContentLoaded", (event) => {
  function isLoggedIn() {
    return localStorage.getItem("accessToken") !== null;
  }

  function hideAllSections() {
    document.querySelectorAll("main > section").forEach((section) => {
      section.style.display = "none";
    });
  }

  function showSectionIfLoggedIn(id) {
    const loginPanel = document.getElementById("loginPanel");
    const overlay = document.getElementById("overlay");

    if (isLoggedIn()) {
      hideAllSections();
      const section = document.querySelector(id);
      if (section) {
        section.style.display = "block";
        loginPanel.style.display = "none";
        overlay.style.display = "none";
      }
    } else {
      hideAllSections();
      loginPanel.style.display = "block";
      overlay.style.display = "block";
    }
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      showSectionIfLoggedIn(targetId);
    });
  });

  hideAllSections();
  const currentLocation = window.location.hash;
  if (currentLocation === "#todolist" && isLoggedIn()) {
    document.getElementById("todolist-id").style.display = "block";
  } else {
    if (!isLoggedIn()) {
      document.getElementById("loginPanel").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    } else {
      showSectionIfLoggedIn("#intro");
    }
  }
});
