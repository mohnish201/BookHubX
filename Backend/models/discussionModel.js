const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema(
  {
    book_id: { type: String, required: true },
    userComments: Array({
      user_id: { type: String, required: true },
      username:{type:String, required:true},
      comment: { type: String, required: true },
      timeStamp: {type:String, required:true}
    }),
  },
  {
    versionKey: false,
  }
);

const discussionModel = mongoose.model("discussion", discussionSchema);

module.exports = {
  discussionModel,
};
