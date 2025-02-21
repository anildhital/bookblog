document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("book-form");
  const bookList = document.getElementById("books");

  // Load books from localStorage on page load
  loadBooks();

  // Add book event
  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const bookInput = document.getElementById("book-name");
    const bookName = bookInput.value.trim();

    if (bookName === "") {
      alert("Please enter a book name!");
      return;
    }

    addBook(bookName);
    bookInput.value = ""; // Clear input field
  });

  // Function to add book
  function addBook(name) {
    const li = document.createElement("li");
    li.innerHTML = `
            ${name} 
            <button class="delete-btn">Remove</button>
        `;

    bookList.appendChild(li);
    saveBookToLocalStorage(name);

    // Attach delete event to new button
    li.querySelector(".delete-btn").addEventListener("click", function () {
      removeBook(name, li);
    });
  }

  // Function to remove book
  function removeBook(name, listItem) {
    listItem.remove();
    removeBookFromLocalStorage(name);
  }

  // Save book to localStorage
  function saveBookToLocalStorage(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Load books from localStorage
  function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach((book) => addBook(book));
  }

  // Remove book from localStorage
  function removeBookFromLocalStorage(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter((b) => b !== book);
    localStorage.setItem("books", JSON.stringify(books));
  }
});
