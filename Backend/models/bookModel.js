const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    isbn: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: Object, required: true },
    image: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const bookModel = mongoose.model("book", bookSchema);

module.exports = {
  bookModel,
};
