const express = require("express");
const axios = require("axios");
const { createChat } = require("completions");
require("dotenv").config();

const chatbotRouter = express.Router();

chatbotRouter.post("/", async (req, res) => {
  const { message } = req.body;
  const chat = createChat({
    apiKey: process.env.OPENAI_KEY, // Correct the process variable name
    model: "gpt-3.5-turbo-0613",
    functions: [
      {
        name: "book_suggestion",
        description:
          " This function provides book suggestions based on author names or book titles. It offers book title , author name, and image of book for matched books and provides brief descriptions for books not found in the api or database. Please input the author's name or book title you'd like recommendations for.",
        parameters: {
          type: "object",
          properties: {
            authorName: {
              type: "string",
              description: "authorName",
            },
            bookTitle: {
              type: "string",
              description: "bookTitle",
            },
          },
          required: ["authorName", "bookTitle"],
        },
        function: async ({ authorName, bookTitle }) => {
          console.log(authorName, bookTitle);
          try {
            const response = await axios.get(
              `http://localhost:4800/books?authorName=${authorName}&bookTitle=${bookTitle}`
            );
            return {
              response: response.data,
              title: response.data.title,
              author: response.data.author
            };
          } catch (err) {
            return err;
          }
        },
      },
    ],
    functionCall: "auto",
  });

  const response1 = await chat.sendMessage(message);
  res.json(response1.content);
});

module.exports = {
  chatbotRouter,
};
