document.addEventListener("DOMContentLoaded", (event) => {
  loadToDos();

  function hideAllSections() {
    document.querySelectorAll("main > section").forEach((section) => {
      section.style.display = "none";
    });
  }

  function showSection(id) {
    hideAllSections();

    const section = document.querySelector(id);
    if (section) {
      section.style.display = "block";
    }
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      showSection(targetId);
    });
  });

  hideAllSections();
  showSection("#intro");
});
