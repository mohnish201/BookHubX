const mongoose = require("mongoose");

const chatbotSchema = mongoose.Schema(
  {
    user_id: { type: String, required: true },
    conversation: Array({
      message: { type: String, required: true },
      response: { type: String, required: true },
    }),
  },
  {
    versionKey: false,
  }
);

const chatbotModel = mongoose.model("chatbot", chatbotSchema);

module.exports = {
  chatbotModel,
};
