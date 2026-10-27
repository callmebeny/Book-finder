// THEME: the dark mode button
// Dark mode = the class "dark" on <body>. The dark colors are in base.css.

let themeButton = document.getElementById("theme");

function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "☀️ Light mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeButton.textContent = "🌙 Dark mode";
    localStorage.setItem("theme", "light");
  }
}

themeButton.addEventListener("click", toggleTheme);

// If dark mode was on last time, turn it on again
if (localStorage.getItem("theme") === "dark") {
  toggleTheme();
}
