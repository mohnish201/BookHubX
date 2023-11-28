const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { favoriteModel } = require("../models/favoriteModel");

const favoriteRouter = express.Router();

//add book to favorite
favoriteRouter.patch("/addBook", auth, async (req, res) => {
  const { user_id, username } = req.body;
  const newBook = req.body.book;

  try {
    let user = await favoriteModel.findOne({ user_id });

    if (!user) {
      user = await favoriteModel.create({
        user_id,
        username, 
        favorite_books: [newBook],
      });
      return res.send({ message: "Book added to favorites for a new user" });
    }

    const bookExists = user.favorite_books.some(
      (book) => book._id === newBook._id
    );

    if (bookExists) {
      return res.send({ message: "Book already exists in favorites" });
    }

    user.favorite_books.push(newBook);
    await user.save();

    res.send({ message: "Book added to favorites" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//get favorite book list
favoriteRouter.get("/",auth, async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id)
  try {
    let userFavorites = await favoriteModel.findOne({user_id});
    console.log(userFavorites);
    if (userFavorites) {
      res.send({ userFavorites: userFavorites });
    } else {
      res.status(404).send({ msg: "No favorite books found for this user" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});


//delete favorite book from Array
favoriteRouter.delete("/removeBook/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;
  const { user_id } = req.body;
  try {
    const favoriteDoc = await favoriteModel.findOne({user_id});
    if (!favoriteDoc) {
      return res.status(404).send("Favorite not found");
    }

    const bookIndex = favoriteDoc.favorite_books.findIndex((book)=> book._id === book_id);
    // console.log(bookIndex)
    if (bookIndex === -1) {
      return res.status(404).send("Book not found in favorites");
    }

    favoriteDoc.favorite_books.splice(bookIndex, 1);
    await favoriteDoc.save();

    res.send({ message: "Book removed from favorites" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  favoriteRouter,
};
