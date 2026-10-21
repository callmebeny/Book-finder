let form = document.getElementById("form");
let results = document.getElementById("results");
let books = [];

function showBooks(list) {
  results.innerHTML = "";
  for (let book of list) {
    results.innerHTML += "<p>" + book.title + " (" + (book.first_publish_year || "?") + ")</p>";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let search = document.getElementById("search").value;

  fetch("https://openlibrary.org/search.json?q=" + search + "&limit=10")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      books = data.docs;
      showBooks(books);
    });
});

document.getElementById("filterButton").addEventListener("click", function () {
  let year = document.getElementById("year").value;

  if (year === "") {
    showBooks(books);
    return;
  }

  let filtered = books.filter(function (book) {
    return book.first_publish_year >= year;
  });
  showBooks(filtered);
});
