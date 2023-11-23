const { Router } = require("express");
const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { authorModel } = require("../models/authorModel");

const authorRouter = express.Router()

//get all authors
authorRouter.get("/", async (req, res) => {
    try {
      const author = await authorModel.find();
      if (author) {
        res.send({authors: author});
      } else {
        res.status(500).send("author not found");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

//get authors by Id
authorRouter.get("/:author_id",async (req, res) => {
    const { author_id } = req.params;
    try {
      const author = await authorModel.find({ _id: author_id });
      if (author) {
        res.send(author);
      } else {
        res.status(500).send("author not found");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

//add author
authorRouter.post("/", async (req, res) => {
    const author = req.body;
    try {
      const newAuthor = new authorModel(author);
      await newAuthor.save();
      res.send({ msg: "Author added successfully", newAuthor });
    } catch (error) {
      res.status(500).send(error);
    }
  });

// delete author by id
authorRouter.delete("/:author_id", async (req, res) => {
    const { author_id } = req.params;
    try {
      const author = await authorModel.findById(author_id);
      if (!author) {
        return res.status(404).send({ msg: "Author not found" });
      }
      await authorModel.findByIdAndDelete(author_id);
      res.send({ msg: "Author Deleted" });
    } catch (error) {
      res.status(500).send({ msg: "Invalid author_id", error });
    }
  });

  module.exports={
    authorRouter
  }