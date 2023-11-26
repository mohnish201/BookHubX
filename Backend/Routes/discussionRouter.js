const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { discussionModel } = require("../models/discussionModel");

const discussionRouter = express.Router();

//get all discussions
discussionRouter.get("/", async (req, res) => {
  try {
    const discussions = await discussionModel.find();
    if (discussions) {
      res.send({ discussions: discussions });
    } else {
      res.status(404).send("No discussions are found");
    }
  } catch (error) {
    res.send(500).send(error);
  }
});

//get discussions by Id
discussionRouter.get("/:discussion_id", async (req, res) => {
  const { discussion_id } = req.params;
  try {
    const discussion = await discussionModel.findById(discussion_id);
    if (discussion) {
      res.send(discussion);
    } else {
      res.status(404).send("No discussion found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//add discussions
discussionRouter.patch("/addComment/:book_id", auth, async (req, res) => {
  const { user_id, comment, username } = req.body;
  const { book_id } = req.params;
  try {
    let discussionDoc = await discussionModel.findOne({ book_id });
    let date = new Date()
    let timeStamp = date.toDateString()
    if (!discussionDoc) {
      discussionDoc = await discussionModel.create({
        book_id: book_id,
        userComments: [{ user_id, username, comment, timeStamp:timeStamp}],
      });
    } else {
      // Check if the discussion_id already exists in the array to prevent duplicates

      discussionDoc.userComments.push({ user_id, username, comment, timeStamp:timeStamp});
      await discussionDoc.save();
    }

    res.send({ message: "Comment added to discussion" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  discussionRouter,
};
