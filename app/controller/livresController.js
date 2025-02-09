const BookModel = require("../model/livresModel");
const { validateBook } = require("../validation/livresValidation");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getBookByNumber = async (req, res) => {
    const bookNumber = parseInt(req.params.numlivre);
    try {
        const book = await BookModel.getBookByNumber(bookNumber);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getBookPages = async (req, res) => {
    const bookNumber = parseInt(req.params.numlivre);
    try {
        const book = await BookModel.getBookByNumber(bookNumber);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book.pages);
    } catch (error) {
        console.error("Error fetching book pages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getBookPageByNumber = async (req, res) => {
    const bookNumber = parseInt(req.params.numlivre);
    const pageNumber = parseInt(req.params.numpage);
    try {
        const book = await BookModel.getBookByNumber(bookNumber);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        if (pageNumber < 1 || pageNumber > book.pages.length) {
            return res.status(404).json({ error: "Page not found" });
        }
        res.json({ page: book.pages[pageNumber - 1] });
    } catch (error) {
        console.error("Error fetching book page:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createBook = async (req, res) => {
    const { error, value: validatedBookData } = validateBook(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const existingBook = await BookModel.getBookByNumber(validatedBookData.numero);
        if (existingBook) {
            return res.status(400).json({ error: "A book with that number already exists" });
        }
        const newBook = await BookModel.createBook(validatedBookData);
        res.status(201).json(newBook);
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteBook = async (req, res) => {
    const bookNumber = parseInt(req.params.numlivre);
    try {
        const deletedBook = await BookModel.deleteBook(bookNumber);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(deletedBook);
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateBook = async (req, res) => {
    const bookNumber = parseInt(req.params.numlivre);
    const { titre, pages } = req.body;
    try {
        const updatedBook = await BookModel.updateBook(bookNumber, { titre, pages });
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
