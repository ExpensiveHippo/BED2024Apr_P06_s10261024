async function fetchBooks() {
    const response = await fetch("/books"); 
    const data = await response.json();
  
    const bookList = document.getElementById("book-list");
  
    data.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book"); 
  
      // Create elements for title, author, etc. and populate with book data
      const titleElement = document.createElement("h2");
      titleElement.textContent = book.title;
  
      const authorElement = document.createElement("p");
      authorElement.textContent = `By: ${book.author}`;

      bookItem.appendChild(titleElement);
      bookItem.appendChild(authorElement);

      bookList.appendChild(bookItem);
    });
  }
  
  fetchBooks(); // Call the function to fetch and display book data