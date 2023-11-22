const mongoose = require("mongoose");

const communitySchema = mongoose.Schema(
  {
    discussions: Array({
      discussion_id: Array({
        title: String,
        description: String,
        comments: Array({ user_id: String, comment: Array(String) }),
      }),
    }),
  },
  {
    versionKey: false,
  }
);

const communityModel = mongoose.model("community", communitySchema);

module.exports = {
  communityModel,
};
