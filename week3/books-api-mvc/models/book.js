// Remember: This is a simplified example using an in-memory array. In a real-world scenario, you would use a database to store books data persistently.
const books = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];
  
class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    // Static methods allows us to call the utility functions of "Book" without instantiating a "Book" object
    
    static async getAllBooks() {
        return books; 
    }
    
    static async getBookById(id) {
        const books = await this.getAllBooks(); 
        const book = books.find((book) => book.id === id);
        return book;
    }
  
    static async createBook(newBookData) {
        const books = await this.getAllBooks(); 
        const newBook = new Book(
            books.length + 1,
            newBookData.title,
            newBookData.author
        );
     
        books.push(newBook); 
        return newBook;
    }
  
    static async updateBook(id, newBookData) {
        const books = await this.getAllBooks(); 
        const existingBookIndex = books.findIndex((book) => book.id === id);
        if (existingBookIndex === -1) {
            return null; // Book not found
        }
        
        // "..." -> spread operator -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#overriding_properties
        // 1. Spread the fields of the old book
        // 2. Spread the fields of the new book
        // 3. Merge the old book data with the new book data   

        const updatedBook = {
            ...books[existingBookIndex],
            ...newBookData,
        };

        console.log(updatedBook)
    
        books[existingBookIndex] = updatedBook;
        return updatedBook;
    }
  
    static async deleteBook(id) {
        const books = await this.getAllBooks(); 
        const bookIndex = books.findIndex((book) => book.id === id);
        if (bookIndex === -1) {
            return false; // Book not found
        }
    
        books.splice(bookIndex, 1);
        return true;
    }
}
  
module.exports = Book;