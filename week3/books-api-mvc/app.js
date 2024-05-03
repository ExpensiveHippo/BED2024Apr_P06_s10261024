// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController");
const validateBook = require("./middlewares/validateBook")

// Initialize app
const app = express();

// Configure middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook);
app.put("/books/:id",validateBook,  booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

// Define port
const port = process.env.port || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


