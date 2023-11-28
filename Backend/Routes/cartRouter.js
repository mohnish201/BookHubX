const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { cartModel } = require("../models/cartModel");

const cartRouter = express.Router();

//add book to favorite
cartRouter.patch("/addBook", auth, async (req, res) => {
  const { user_id, username } = req.body;
  const newBook = req.body.book;

  try {
    let user = await cartModel.findOne({ user_id });

    if (!user) {
      user = await cartModel.create({
        user_id,
        username, 
        cart_books: [newBook],
      });
      return res
        .status(201)
        .send({ message: "Book added to cart for a new user" });
    }

    const bookExists = user.cart_books.some(
      (book) => book._id === newBook._id
    );

    if (bookExists) {
      return res.send({ message: "Book already exists in cart" });
    }

    user.cart_books.push(newBook);
    await user.save();

    res.send({ message: "Book added to cart" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//get favorite book list
cartRouter.get("/",auth, async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id)
  try {
    let userCart = await cartModel.findOne({user_id});
    console.log(userCart);
    if (userCart) {
      res.send({ userCart: userCart});
    } else {
      res.status(404).send({ msg: "Cart is Empty" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});


//delete favorite book from Array
cartRouter.delete("/removeBook/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;
  const { user_id } = req.body;
  try {
    const favoriteDoc = await cartModel.findOne({user_id});
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
  cartRouter,
};
