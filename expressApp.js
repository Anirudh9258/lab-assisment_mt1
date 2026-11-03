// Import Express
import express from "express";

// Create Express application
const app = express();

// Server port
const PORT = 4000;

// Middleware to read JSON data
app.use(express.json());

// Array containing sample books
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        category: "Fiction"
    },

    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        price: 250,
        category: "Biography"
    },

    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        price: 450,
        category: "Self-help"
    }
];

// 1. GET - Retrieve all books
app.get("/books", (req, res) => {

    res.status(200).json(books);

});


// 2. GET BY ID - Retrieve a particular book
app.get("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {

        return res.status(404).json({
            message: "Book not found"
        });

    }

    res.status(200).json(book);

});


// 3. POST - Add a new book
app.post("/books", (req, res) => {

    const { id, title, author, price, category } = req.body;

    // Validate book details
    if (
        id === undefined ||
        !Number.isInteger(Number(id)) ||
        !title ||
        !author ||
        price === undefined ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {

        return res.status(400).json({
            message: "Please provide valid book details"
        });

    }

    // Check duplicate ID
    const existingBook = books.find(
        b => b.id === Number(id)
    );

    if (existingBook) {

        return res.status(409).json({
            message: "Book ID already exists"
        });

    }

    // Create new book
    const newBook = {
        id: Number(id),
        title: title,
        author: author,
        price: Number(price),
        category: category || "General"
    };

    // Add book to array
    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });

});


// 4. PUT - Update existing book
app.put("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex(
        b => b.id === id
    );

    if (!Number.isInteger(id) || index === -1) {

        return res.status(404).json({
            message: "Book not found"
        });

    }

    const { title, author, price, category } = req.body;

    if (
        !title ||
        !author ||
        price === undefined ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {

        return res.status(400).json({
            message: "Please provide valid book details"
        });

    }

    // Update book details
    books[index] = {
        id: id,
        title: title,
        author: author,
        price: Number(price),
        category: category || books[index].category
    };

    res.status(200).json({
        message: "Book updated successfully",
        book: books[index]
    });

});


// 5. DELETE - Delete a book
app.delete("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex(
        b => b.id === id
    );

    if (!Number.isInteger(id) || index === -1) {

        return res.status(404).json({
            message: "Book not found"
        });

    }

    // Remove book from array
    const deletedBook = books.splice(index, 1)[0];

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook
    });

});


// Handle invalid JSON
app.use((err, req, res, next) => {

    if (err instanceof SyntaxError && err.status === 400) {

        return res.status(400).json({
            message: "Invalid JSON format"
        });

    }

    next(err);

});


// Handle invalid routes
app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


// Start Express server
app.listen(PORT, () => {

    console.log(
        `Express Server running at http://localhost:${PORT}`
    );

});