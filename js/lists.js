// LISTS: "Favourites" and "Reading list"
// Both lists work the same way, so the same functions handle both.
// They are saved in localStorage, so they stay after a refresh.

// The saved books of each list (or an empty list the first time)
let lists = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  readlist: JSON.parse(localStorage.getItem("readlist")) || []
};

// The names shown on the buttons
let listNames = {
  favourites: "favourites",
  readlist: "reading list"
};

// Writes one list into localStorage
function saveList(listName) {
  localStorage.setItem(listName, JSON.stringify(lists[listName]));
}

// true if the book with this key is in the list
function isInList(listName, key) {
  return lists[listName].some(function (book) {
    return book.key === key;
  });
}

// Builds the HTML for one button on a card (used in display.js)
function listButton(listName, book) {
  let text = "Add to " + listNames[listName];
  let className = "list-button";

  if (isInList(listName, book.key)) {
    text = "Remove from " + listNames[listName];
    className = "list-button added";
  }

  return "<button type='button' class='" + className + "' " +
    "onclick=\"toggleInList('" + listName + "', '" + book.key + "', this)\">" +
    text + "</button>";
}

// Called when a list button on a card is clicked
function toggleInList(listName, key, button) {
  let book = books.find(function (book) {
    return book.key === key;
  });

  if (isInList(listName, key)) {
    // Remove it from the list
    lists[listName] = lists[listName].filter(function (book) {
      return book.key !== key;
    });
  } else {
    // Add it to the list
    lists[listName].push(book);
  }

  saveList(listName);
  button.outerHTML = listButton(listName, book); // redraw the button with the new text
}

// Called by the "My favourites" / "My reading list" buttons in index.html
function showList(listName) {
  if (lists[listName].length === 0) {
    showMessage("Your " + listNames[listName] + " is empty. Add a book from the search results.");
    return;
  }
  books = lists[listName].slice(); // copy, so the year filter and sort work here too
  showBooks();
}
