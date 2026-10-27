let form = document.getElementById("form");
let results = document.getElementById("results");
let yearSelect = document.getElementById("year");
let books = [];

function showMessage(text) {
  results.innerHTML = "<div class='message'>" + text + "</div>";
}

function showBooks() {
  let year = yearSelect.value;
  let list = books;

  if (year !== "") {
    list = books.filter(function (book) {
      return book.first_publish_year >= year;
    });
  }

  if (list.length === 0) {
    showMessage("No books found. Try another search or year.");
    return;
  }

  results.innerHTML = "";
  for (let book of list) {
    let cover = "";
    if (book.cover_i) {
      cover = "<img src='https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg' alt=''>";
    }
    let author = book.author_name ? book.author_name.join(", ") : "Unknown author";
    let published = book.first_publish_year || "Unknown year";
    let link = "https://openlibrary.org" + book.key;
    results.innerHTML += "<p>" + cover + "<span>" +
      "<a class='title' href='" + link + "' target='_blank'>" + book.title + "</a>" +
      "<span class='author'>by " + author + "</span>" +
      "<span class='year'>Published " + published + "</span>" +
      "</span></p>";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let search = document.getElementById("search").value;
  showMessage("Searching...");

  fetch("https://openlibrary.org/search.json?q=" + encodeURIComponent(search) + "&limit=10")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      books = data.docs;
      showBooks();
    })
    .catch(function () {
      showMessage("Something went wrong. Check your internet and try again.");
    });
});

yearSelect.addEventListener("change", function () {
  if (books.length > 0) {
    showBooks();
  }
});
