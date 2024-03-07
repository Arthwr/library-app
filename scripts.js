const myLibrary = [];
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

function addBookToLibrary(book) {
  myLibrary.push(book);
  createAndPopulateTableRow(book);
}

function createAndPopulateTableRow(book) {
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

  // Create buttons
  const actionButtons = [
    { text: "Change status", action: () => console.log("Clicked") },
    { text: "Remove", action: () => console.log("Clicked") },
  ];

  actionButtons.forEach((buttonData) => {
    const button = document.createElement("a");
    button.textContent = buttonData.text;
    button.addEventListener("click", buttonData.action);
    actionsWrapper.appendChild(button);
  });
}

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
