// FILTERS: the year dropdown and the sort dropdown

let yearSelect = document.getElementById("year");
let sortSelect = document.getElementById("sort");

// Takes a list of books and gives back the filtered + sorted list
function filterAndSort(list) {
  let year = yearSelect.value;
  let sort = sortSelect.value;

  // 1. Keep only the books after the chosen year
  let result = list.filter(function (book) {
    return year === "" || book.first_publish_year >= year;
  });

  // 2. Sort the books by year
  if (sort === "newest") {
    result.sort(function (a, b) {
      return (b.first_publish_year || 0) - (a.first_publish_year || 0);
    });
  }
  if (sort === "oldest") {
    result.sort(function (a, b) {
      return (a.first_publish_year || 0) - (b.first_publish_year || 0);
    });
  }

  return result;
}

// When a dropdown changes, show the same books again with the new filter/sort
function updateList() {
  if (books.length === 0) {
    showMessage("Type a book name or pick a subject first.");
    return;
  }
  showBooks();
}

yearSelect.addEventListener("change", updateList);
sortSelect.addEventListener("change", updateList);
