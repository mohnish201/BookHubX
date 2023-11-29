const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    book_id: { type: String, required: true },
    reviews: Array({
      user_id: { type: String, required: true },
      username: { type: String, required: true },
      rating: { type: String, required: true },
      reviewText: { type: String, required: true },
      timeStamp: { type: String, required: true },
    }),
  },
  {
    versionKey: false,
  }
);

const reviewModel = mongoose.model("review", reviewSchema);

module.exports = {
  reviewModel,
};
