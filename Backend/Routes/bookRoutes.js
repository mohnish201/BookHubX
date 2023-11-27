const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { bookModel } = require("../models/bookModel");

const bookRouter = express.Router();

//get all books
bookRouter.get("/", async (req, res) => {
  const { q, limit, bookTitle, authorName, category } = req.query;

  let query = {};

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } },
    ];
  }
  if(category){
    query.category = category
  }

  if (bookTitle) {
    query.title = { $regex: bookTitle, $options: "i" };
  } else if (authorName) {
    query.author = { $regex: authorName, $options: "i" };
  } else if (authorName && bookTitle) {
    query.$or = [
      { title: { $regex: bookTitle, $options: "i" } },
      { author: { $regex: authorName, $options: "i" } },
    ];
  }

  console.log(query);
  try {
    const books = await bookModel.find(query).limit(limit);
    if (books) {
      res.send(books);
    } else {
      res.send("No Book are available in database");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//get book details by id

bookRouter.get("/:book_id", auth, async (req, res) => {
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

bookRouter.post("/", auth, async (req, res) => {
  const book = req.body;
  try {
    const newBook = new bookModel(book);
    await newBook.save();
    res.status(201).send({ msg: "Book added successfully", newBook });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update book by id
bookRouter.patch("/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;
  try {
    const book = await bookModel.findById(book_id);
    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }
    await bookModel.findByIdAndUpdate(book_id, req.body);
    res.send({ msg: "Book Updated" });
  } catch (error) {
    res.status(500).send({ msg: "Invalid book_id", error });
  }
});

//delete book by id
bookRouter.delete("/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;
  try {
    const book = await bookModel.findById(book_id);
    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }
    await bookModel.findByIdAndDelete(book_id);
    res.send({ msg: "Book Deleted" });
  } catch (error) {
    res.status(500).send({ msg: "Invalid book_id", error });
  }
});

module.exports = {
  bookRouter,
};
