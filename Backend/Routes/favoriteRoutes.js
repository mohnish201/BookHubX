const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { favoriteModel } = require("../models/favoriteModel");

const favoriteRouter = express.Router();

//add book to favorite
favoriteRouter.patch("/addBook", auth, async (req, res) => {
  const { bookId } = req.body; // Assuming you pass the book ID in the request body
  const userId = req.user.id; // Assuming you store user ID in req.user.id after authentication

  try {
    let favoriteDoc = await favoriteModel.find({ user_id: userId });

    if (!favoriteDoc) {
      // If no favorites exist for the user, create a new favorite document
      favoriteDoc = await favoriteModel.create({
        user_id: userId,
        favorite_books: [req.body],
      });
    } else {
      // Check if the bookId already exists in the array to prevent duplicates
      if (favoriteDoc.favorite_books.includes(bookId)) {
        return res.status(400).send("Book already exists in favorites");
      }

      favoriteDoc.favorite_books.push(req.body);
      await favoriteDoc.save();
    }

    res.send({ message: "Book added to favorites" });
  } catch (error) {
    res.status(500).send(error);
  }
});


//get favorite book list
favoriteRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.body.user_id; // Assuming you store user ID in req.user.id after authentication
    const userFavorites = await favoriteModel.find({ user_id: userId }); // Filter by user ID

    if (userFavorites.length > 0) {
      res.send({ favoriteBooks: userFavorites });
    } else {
      res.status(404).send({msg:"No favorite books found for this user"});
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete favorite book from Array
favoriteRouter.delete("/removeBook/:book_id", auth, async (req, res) => {
    const {book_id } = req.params;
    const {userId} = req.body
    try {
      const favoriteDoc = await favoriteModel.find({user_id:userId});
      if (!favoriteDoc) {
        return res.status(404).send("Favorite not found");
      }
  
      const bookIndex = favoriteDoc.favorite_books.indexOf(book_id);
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
