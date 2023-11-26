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
      return res
        .status(404)
        .send({ msg: "No reviews are posted on this book" });
    }

    res.send({ reviews });
  } catch (error) {
    res.status(500).send(error);
  }
});

//post review on particular book
reviewRouter.patch("/addReview/:book_id", auth, async (req, res) => {
  const { book_id } = req.params;
  const { user_id, rating, reviewText } = req.body;

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
        return res.status(400).send({ msg: "You already reviewed the book" });
      }

      reviewDoc.reviews.push({
        user_id,
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
