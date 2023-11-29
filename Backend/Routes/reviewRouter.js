const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { reviewModel } = require("../models/reviewModel");

const reviewRouter = express.Router();

//get All reviews by book_id
reviewRouter.get("/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;

  try {
    const reviews = await reviewModel.findOne({ book_id });
    if (!reviews) {
      return res.send({ msg: "No reviews are posted on this book , be the first to review" });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

//post review on particular book
reviewRouter.patch("/addReview/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;
  const { user_id, rating, reviewText, username } = req.body;

  try {
    let reviewDoc = await reviewModel.findOne({ book_id });
    let date = new Date();
    let timeStamp = date.toDateString()
    if (!reviewDoc) {
      reviewDoc = await reviewModel.create({
        book_id,
        reviews: [
          {
            book_id,
            user_id,
            username,
            rating,
            reviewText,
            timeStamp: timeStamp,
          },
        ],
      });
    } else {
      const reviewExist = reviewDoc.reviews.some(
        (review) => review.user_id === user_id
      );

      if (reviewExist) {
        return res.send({ msg: "You already reviewed the book" });
      }

      reviewDoc.reviews.push({
        user_id,
        username,
        rating,
        reviewText,
        timeStamp: timeStamp,
      });
      await reviewDoc.save();
    }
    res.send({ msg: "Thankyou for review and rating" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  reviewRouter,
};
