const myLibrary = [];

document.get

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
