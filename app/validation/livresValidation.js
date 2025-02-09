const Joi = require("joi");

const bookSchema = Joi.object({
    numero: Joi.number().required(),
    titre: Joi.string().required(),
    pages: Joi.array().items(Joi.string()).required(),
});

function validateBook(book) {
    return bookSchema.validate(book);
}

module.exports = {
    validateBook,
};
