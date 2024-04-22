class Book {
  constructor(name, author, pages, year, read, rating) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.year = year;
    this.rating = rating;
  }
  toggleStatus() {
    this.read = this.read === "Read" ? "Not read yet" : "Read";
  }
}

class Library {
  static mockData = [
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

  // prettier-ignore
  constructor() {
    this.bookCollection = [];
    this.tableBody = document.querySelector("tbody");
    this.bookPropertyOrder = ["name", "author", "pages", "year", "rating", "read"];
  }

  addBook(book) {
    this.bookCollection.push(book);
    const index = this.bookCollection.indexOf(book);
    this.createAndPopulateTableRow(book, index);
  }

  createAndPopulateTableRow(book, index) {
    // Create book data row
    const tableRow = document.createElement("tr");
    this.tableBody.appendChild(tableRow);

    // Populate book data row
    for (let key of this.bookPropertyOrder) {
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
        action: () => {
          book.toggleStatus();
          const readCell = tableRow.querySelector("td:nth-child(6)");
          readCell.textContent = book.read;
        },
      },
      {
        text: "Remove",
        action: () => {
          this.bookCollection.splice(index, 1);
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
  init() {
    Library.mockData.forEach((book) => {
      const myBook = new Book(
        book.name,
        book.author,
        book.pages,
        book.year,
        book.read,
        book.rating
      );
      this.addBook(myBook);
    });
  }
}

// Create and init new library
const myLibrary = new Library();
myLibrary.init();

// Retrieve form data and populate library
const form = document.getElementById("book-form");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isFormValid()) return;

  let name = form.elements["name"].value;
  let author = form.elements["author"].value;
  let pages = form.elements["pages"].value;
  let year = form.elements["year"].value;
  let rating = form.elements["rating"].value;
  let readStatus = form.elements["read-status"].checked
    ? "Read"
    : "Not read yet";

  const bookData = new Book(name, author, pages, year, readStatus, rating);
  myLibrary.addBook(bookData);
});

// Form validation
const errorMessages = {
  name: "Please enter the name of the book",
  author: "Please enter the author's name",
  pages: "Please enter the number of pages",
  year: "Please enter the year published",
};

const getErrorMessage = (inputElement) => {
  return errorMessages[inputElement.name] || "Invalid input.";
};

const showFormError = (inputElement, errorMessage, clear = false) => {
  const parentDiv = inputElement.closest("div");
  const errorSpan = parentDiv.querySelector(".error");
  if (clear) {
    errorSpan.textContent = "";
    errorSpan.classList.remove("active");
  } else {
    if (errorSpan && !errorSpan.classList.contains("active")) {
      errorSpan.textContent = errorMessage;
      errorSpan.classList.add("active");
    }
  }
};

const checkInput = (inputElement) => {
  let errorMessage = "";
  let isValid = true;

  // Check for type mismatch for pages input (letters instead of numbers)
  if (inputElement.name === "pages" && isNaN(inputElement.value)) {
    errorMessage = "Please enter a valid number of pages.";
    isValid = false;
  }
  // Check for min and max limits for number inputs
  else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    if (inputElement.validity.tooShort) {
      errorMessage = `Value must be at least ${inputElement.minLength} numbers length`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `Value must be no more than ${inputElement.maxLength} numbers length`;
    }
    isValid = false;
  }

  // Check inputs for other errors
  else if (!inputElement.validity.valid) {
    errorMessage = getErrorMessage(inputElement);
    isValid = false;
  }

  if (errorMessage) {
    showFormError(inputElement, errorMessage);
  } else {
    showFormError(inputElement, "", true);
  }

  return isValid;
};

const isFormValid = () => {
  let formIsValid = true;

  for (let i = 0; i < form.elements.length; i++) {
    const inputElement = form.elements[i];
    if (
      inputElement.tagName === "INPUT" &&
      inputElement.name !== "rating" &&
      inputElement.name !== "read-status"
    ) {
      if (!checkInput(inputElement)) {
        formIsValid = false;
      }
    }
  }

  return formIsValid;
};

const formArray = [...form.elements];
formArray.forEach((inputElement) => {
  if (
    inputElement.tagName === "INPUT" &&
    inputElement.name !== "rating" &&
    inputElement.name !== "read-status"
  ) {
    inputElement.addEventListener("blur", () => checkInput(inputElement));
  }
});
