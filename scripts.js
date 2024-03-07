const mockData = [
  {
    name: "The Lord of The Rings",
    author: "J.R.R. Tolkien",
    pages: "1178",
    year: "1954",
    read: "Read",
    rating: "5",
  },
  {
    name: "The Witcher Trilogy",
    author: "Andrzej Sapkowski",
    pages: "3017",
    year: "1986",
    read: "Read",
    rating: "5",
  },
];
const myLibrary = [];

//     "The Lord of The Rings",
"J.R.R. Tolkien", 1178, 1954, "Read", 5;
const bookPropertyOrder = ["name", "author", "pages", "year", "rating", "read"];

const submitButton = document.getElementById("submit-button");
const tableBody = document.querySelector("tbody");

function Book(name, author, pages, year, read, rating) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.year = year;
  this.rating = rating;
}

Book.prototype.toggleStatus = function () {
  this.read = this.read === "Read" ? "Not read yet" : "Read";
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  const index = myLibrary.indexOf(book);
  createAndPopulateTableRow(book, index);
}

function createAndPopulateTableRow(book, index) {
  // Create book data row
  const tableRow = document.createElement("tr");
  tableBody.appendChild(tableRow);

  // Populate book data row
  for (let key of bookPropertyOrder) {
    const tableData = document.createElement("td");
    tableRow.appendChild(tableData);
    tableData.textContent = book[key];
  }

  // Create action buttons row
  const tableActions = document.createElement("td");
  const actionsWrapper = document.createElement("div");
  actionsWrapper.classList.add("actions-wrapper");
  tableRow.appendChild(tableActions);
  tableActions.appendChild(actionsWrapper);

  // Create buttons and assign actions
  const actionButtons = [
    {
      text: "Change status",
      action: function () {
        book.toggleStatus();
        const readCell = tableRow.querySelector("td:nth-child(6)");
        readCell.textContent = book.read;
      },
    },
    {
      text: "Remove",
      action: function () {
        myLibrary.splice(index, 1);
        tableRow.remove();
      },
    },
  ];

  actionButtons.forEach((buttonData) => {
    const button = document.createElement("a");
    button.textContent = buttonData.text;
    button.addEventListener("click", buttonData.action);
    actionsWrapper.appendChild(button);
  });
}

// Populate library with initial mock data
function init() {
  mockData.forEach((book) => {
    const myBook = new Book(
      book.name,
      book.author,
      book.pages,
      book.year,
      book.read,
      book.rating
    );
    addBookToLibrary(myBook);
  });
}

init();

// Retrieve form data and populate library
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  let form = document.getElementById("book-form");
  let name = form.elements["name"].value;
  let author = form.elements["author"].value;
  let pages = form.elements["pages"].value;
  let year = form.elements["year"].value;
  let rating = form.elements["rating"].value;
  let readStatus = form.elements["read-status"].checked
    ? "Read"
    : "Not read yet";

  const bookData = new Book(name, author, pages, year, readStatus, rating);
  addBookToLibrary(bookData);
});
