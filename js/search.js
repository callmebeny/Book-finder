// SEARCH: the search box, the Clear button and the subject buttons

let form = document.getElementById("form");
let searchInput = document.getElementById("search");
let clearButton = document.getElementById("clear");

// Asks Open Library for books and then shows them
function searchBooks(query) {
  showMessage("Searching...");

  fetch("https://openlibrary.org/search.json?q=" + encodeURIComponent(query) + "&limit=10")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      books = data.docs;
      showBooks(); // from display.js
    })
    .catch(function () {
      showMessage("Something went wrong. Check your internet and try again.");
    });
}

// Called by the subject buttons in index.html
function searchSubject(subject) {
  searchInput.value = "";
  searchBooks("subject:" + subject);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchBooks(searchInput.value);
});

clearButton.addEventListener("click", function () {
  searchInput.value = "";
  books = [];
  results.innerHTML = "";
  searchInput.focus();
});
