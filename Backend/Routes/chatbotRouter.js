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
          "Provide book title and author with brief and concise summary suggestions to user based on author name or book title and if the book is not present in database then provide some details of that book like brief and concise description of that book ",
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
              title: response.data.books.title,
              author: response.data.books.author,
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
  res.send(response1.content);
});

module.exports = {
  chatbotRouter,
};
