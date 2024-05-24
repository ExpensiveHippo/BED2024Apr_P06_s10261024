// Import node modules
const express = require("express");
const sql = require("mssql");
const bp = require("body-parser");

// Import controller
const booksController = require("./controllers/booksController");
const usersController = require("./controllers/usersController");

// Import database login configuration
const dbConfig = require("./dbConfig");

// Import validation middleware
const validateBook = require("./middlewares/validateBook");

// Create app
const app = express();
const PORT = process.env.PORT || 3000;

// Static file serving
const staticMiddleware = express.static("public")

// Middleware to handle request body
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(staticMiddleware);

// Routes - Books
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook); 
app.put("/books/:id", validateBook, booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

// Routes - Users
app.post("/users", usersController.createUser); 
app.get("/users", usersController.getAllUsers); 
app.get("/users/search", usersController.searchUsers); 
app.get("/users/with-books", usersController.getUsersWithBooks);
app.get("/users/:id", usersController.getUserById); 
app.put("/users/:id", usersController.updateUser);  
app.delete("/users/:id", usersController.deleteUser);

app.listen(PORT, async() => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1) // 1 = error
    }

    console.log(`Server listening on port ${PORT}`);
});

// Close the connection - SIGINT is usually generated from Ctrl + C when terminating a process.
process.on("SIGINT", async () => {
    console.log("Server is shutting down");

    // Close database connection
    await sql.close();
    console.log("Database connection closed");
    process.exit(0) // 0 = normal

}) 

