const nano = require('nano')('http://drashaax:P4426055z@localhost:5984');
const databaseName = "livres";
const dbInstance = nano.db.use(databaseName);

module.exports = {
    getAllBooks: async () => {
        try {
            const response = await dbInstance.list({ include_docs: true });
            return response.rows.map((row) => row.doc);
        } catch (error) {
            throw error;
        }
    },

    getBookByNumber: async (bookNumber) => {
        try {
            const response = await dbInstance.find({
                selector: { numero: bookNumber },
                limit: 1,
            });
            if (response.docs.length === 0) return null;
            return response.docs[0];
        } catch (error) {
            throw error;
        }
    },

    createBook: async (bookData) => {
        try {
            const response = await dbInstance.insert(bookData);
            return { ...bookData, _id: response.id, _rev: response.rev };
        } catch (error) {
            throw error;
        }
    },

    deleteBook: async (bookNumber) => {
        try {
            const bookToDelete = await module.exports.getBookByNumber(bookNumber);
            if (!bookToDelete) {
                return null;
            }
            await dbInstance.destroy(bookToDelete._id, bookToDelete._rev);
            return bookToDelete;
        } catch (error) {
            throw error;
        }
    },

    updateBook: async (bookNumber, updatedData) => {
        try {
            const existingBook = await module.exports.getBookByNumber(bookNumber);
            if (!existingBook) {
                return null;
            }
            if (typeof updatedData.titre !== "undefined") {
                existingBook.titre = updatedData.titre;
            }
            if (Array.isArray(updatedData.pages)) {
                existingBook.pages = updatedData.pages;
            }
            const response = await dbInstance.insert(existingBook);
            return { ...existingBook, _rev: response.rev };
        } catch (error) {
            throw error;
        }
    },
};
