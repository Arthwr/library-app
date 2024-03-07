const myLibrary = [];
const submitButton = document.getElementById("submit-button");

function Book(name, author, pages, read, year, rating) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.year = year;
  this.rating = rating;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  let form = document.getElementById("book-form");
  let name = form.elements["name"].value;
  let author = form.elements["author"].value;
  let pages = form.elements["pages"].value;
  let readStatus = form.elements["read-status"].value;
  let year = form.elements["year"].value;
  let rating = form.elements["rating"].value;

  const bookData = new Book(name, author, pages, readStatus, year, rating);
  addBookToLibrary(bookData);
});
