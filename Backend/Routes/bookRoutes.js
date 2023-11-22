const express = require("express");
const { bookModel } = require("../models/bookModel");

const bookRouter = express.Router();

//get all books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await bookModel.find();
    if (books) {
      res.send({ TotalBooks: books.length, books: books });
    } else {
      res.send("No Book are available in database");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//get book details by id

bookRouter.get("/:book_id", async (req, res) => {
  const { book_id } = req.params;
  try {
    const book = await bookModel.find({ _id: book_id });
    if (book) {
      res.send(book);
    } else {
      res.status(500).send("Book not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//add book to database

bookRouter.post("/", async (req, res) => {
  const book = req.body;
  try {
    const newBook = new bookModel(book);
    await newBook.save();
    res.send({ msg: "Book added successfully", newBook });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update book by id
bookRouter.patch("/:book_id", async (req, res) => {
    const { book_id } = req.params;
    try {
      const book = await bookModel.findById(book_id);
      if (!book) {
        return res.status(404).send({ msg: "Book not found" });
      }
      await bookModel.findByIdAndUpdate(book_id, req.body);
      res.send({ msg: "Book Updated" });
    } catch (error) {
        res.status(500).send({msg:"Invalid book_id", error});
    }
  });
  

//delete book by id
bookRouter.delete("/:book_id", async (req, res) => {
    const { book_id } = req.params;
    try {
      const book = await bookModel.findById(book_id);
      if (!book) {
        return res.status(404).send({ msg: "Book not found" });
      }
      await bookModel.findByIdAndDelete(book_id);
      res.send({ msg: "Book Deleted" });
    } catch (error) {
      res.status(500).send({msg:"Invalid book_id", error});
    }
  });
  

module.exports = {
  bookRouter,
};
