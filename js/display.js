// DISPLAY: everything that puts things on the page

let results = document.getElementById("results");

// The books we got from the last search (filled in by search.js)
let books = [];

// Shows a grey text message in the results area
function showMessage(text) {
  results.innerHTML = "<div class='message'>" + text + "</div>";
}

// Shows the books on the page
function showBooks() {
  let list = filterAndSort(books); // from filters.js

  if (list.length === 0) {
    showMessage("No books found. Try another search or year.");
    return;
  }

  results.innerHTML = "<div class='message'>Found " + list.length + " books</div>";
  for (let book of list) {
    results.innerHTML += makeCard(book);
  }
}

// Builds the HTML for one book card
function makeCard(book) {
  let cover = "<div class='no-cover'>📕</div>";
  if (book.cover_i) {
    cover = "<img src='https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg' alt=''>";
  }
  let author = book.author_name ? book.author_name.join(", ") : "Unknown author";
  let published = book.first_publish_year || "Unknown year";
  let link = "https://openlibrary.org" + book.key;

  // Small green tags under the author (only if the info exists)
  let tags = "<span class='tag'>Published " + published + "</span>";
  if (book.number_of_pages_median) {
    tags += "<span class='tag'>" + book.number_of_pages_median + " pages</span>";
  }
  if (book.edition_count) {
    tags += "<span class='tag'>" + book.edition_count + " editions</span>";
  }
  if (book.ratings_average) {
    tags += "<span class='tag'>⭐ " + book.ratings_average.toFixed(1) + "</span>";
  }

  // The first 4 subjects of the book
  let subjects = "No subjects listed";
  if (book.subject) {
    subjects = book.subject.slice(0, 4).join(", ");
  }

  // The two list buttons under the tags (see lists.js)
  let buttons = "<span class='card-buttons'>" +
    listButton("favourites", book) +
    listButton("readlist", book) +
    "</span>";

  return "<p>" + cover + "<span>" +
    "<a class='title' href='" + link + "' target='_blank'>" + book.title + "</a>" +
    "<span class='author'>by " + author + "</span>" +
    "<span class='subjects-line'>" + subjects + "</span>" +
    tags +
    buttons +
    "</span></p>";
}
