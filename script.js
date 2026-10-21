let form = document.getElementById("form");
let results = document.getElementById("results");
let yearSelect = document.getElementById("year");
let books = [];

function showBooks() {
  let year = yearSelect.value;
  let list = books;

  if (year !== "") {
    list = books.filter(function (book) {
      return book.first_publish_year >= year;
    });
  }

  results.innerHTML = "";
  for (let book of list) {
    let cover = "";
    if (book.cover_i) {
      cover = "<img src='https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg' alt=''>";
    }
    let author = book.author_name ? book.author_name.join(", ") : "Unknown author";
    let published = book.first_publish_year || "Unknown year";
    results.innerHTML += "<p>" + cover + "<span>" +
      "<span class='title'>" + book.title + "</span>" +
      "<span class='author'>by " + author + "</span>" +
      "<span class='year'>Published " + published + "</span>" +
      "</span></p>";
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
      showBooks();
    });
});

yearSelect.addEventListener("change", showBooks);
