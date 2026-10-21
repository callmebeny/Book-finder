let form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let search = document.getElementById("search").value;
  let results = document.getElementById("results");

  fetch("https://openlibrary.org/search.json?q=" + search + "&limit=10")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      results.innerHTML = "";
      for (let book of data.docs) {
        results.innerHTML += "<p>" + book.title + "</p>";
      }
    });
});