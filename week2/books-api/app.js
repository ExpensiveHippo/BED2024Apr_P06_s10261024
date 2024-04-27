// import packages
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen'},
];

// middleware to parse json and urlencoded request data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


/* ---------------GET methods--------------- */

// get all books
app.get('/', (req, res) => {
    res.json(books);
});

// get a book
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(i => i.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});


/* ---------------POST methods--------------- */

// create a book
app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook); // 201 -> created
});


/*- --------------PUT methods--------------- */

// update a book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex(i => i.id === bookId);

    // if book is found, update it with the new book data in the req, else send error
    if (index !== -1) {
        updatedBook.id = bookId;
        books[index] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).send('Book not found');
    }

});


/* ---------------DELETE methods--------------- */

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(i => i.id === bookId);

    // if book is found, delete it, else send error 
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send(); // 204 -> no content
    } else {
        res.status(404).send('Book not found')
    }

});