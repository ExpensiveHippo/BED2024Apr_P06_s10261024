const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title; 
        this.author = author;
    }

    // RETRIEVE ALL BOOKS
    static async getAllBooks() {

        // Establish connection with database server
        const connection = await sql.connect(dbConfig);
        
        const sqlQuery = `SELECT * FROM Books`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        // Create Book objects from data in each row and return them.
        // https://www.npmjs.com/package/mssql#request
        return result.recordset.map((row) => 
            new Book(row.id, row.title, row.author)
        );
    }

    // RETRIEVE A BOOK BY ITS ID
    static async getBookById(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Books WHERE id = @id`; 

        const request = connection.request();

        // Add parameter for request
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0] ? new Book(result.recordset[0].id, result.recordset[0].title, result.recordset[0].author) : null;
    }

    // INSERT A NEW BOOK
    static async createBook(newBookData) {

        // Establish connection with database
        const connection = await sql.connect(dbConfig);

        // Insert new book, then retrieve id of the inserted record with SCOPE_IDENTITY()     
        // Parameterized query to prevevnt SQL injection
        const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id`;
        
        // Create new request object
        const request = connection.request();

        // Add parameter for request
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);

        // Run query and wait for results
        const result = await request.query(sqlQuery);

        // Close connection with database
        connection.close();

        // Return newly created book using its ID to show that the book has been successfully added
        return this.getBookById(result.recordset[0].id);
    }

    // UPDATE AN EXISTING BOOK
    static async updateBook(id, newBookData) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `UPDATE Books SET title = @title, author = @author WHERE id = @id`;

        const request = connection.request();
        request.input("title", newBookData.title || null);
        request.input("author", newBookData.author || null);
        request.input("id", id);

        await request.query(sqlQuery);

        connection.close();

        return this.getBookById(id);
    }

    // DELETE AN EXISTING BOOK
    static async deleteBook(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `DELETE FROM Books WHERE id = @id`;

        const request = connection.request();
        request.input("id", id);

        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0;
    }
}
module.exports = Book;