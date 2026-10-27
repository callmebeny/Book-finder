// FAVOURITES: the heart button on each card and the "My favourites" button
// The favourites are saved in localStorage, so they stay after a refresh.

// Load the saved favourites (or start with an empty list)
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// Writes the favourites list into localStorage
function saveFavourites() {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

// true if the book with this key is a favourite
function isFavourite(key) {
  return favourites.some(function (book) {
    return book.key === key;
  });
}

// Called by the heart button on a card (see makeCard in display.js)
function toggleFavourite(key, button) {
  if (isFavourite(key)) {
    // Remove it from the list
    favourites = favourites.filter(function (book) {
      return book.key !== key;
    });
    button.textContent = "🤍";
  } else {
    // Find the book in the current results and add it
    let book = books.find(function (book) {
      return book.key === key;
    });
    favourites.push(book);
    button.textContent = "❤️";
  }
  saveFavourites();
}

// Called by the "My favourites" button in index.html
function showFavourites() {
  if (favourites.length === 0) {
    showMessage("No favourites yet. Click 🤍 on a book to save it.");
    return;
  }
  books = favourites.slice(); // copy, so the year filter and sort work here too
  showBooks();
}
