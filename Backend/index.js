const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./Routes/userRoutes");
const { bookRouter } = require("./Routes/bookRoutes");
const { favoriteRouter } = require("./Routes/favoriteRoutes");
const { authorRouter } = require("./Routes/authorRoutes");
const { discussionRouter } = require("./Routes/discussionRouter");
const { reviewRouter } = require("./Routes/reviewRouter");
const {chatbotRouter} = require("./Routes/chatbotRouter");
const { cartRouter } = require("./Routes/cartRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/books", bookRouter);
app.use("/favorite", favoriteRouter);
app.use("/authors", authorRouter);
app.use("/discussion", discussionRouter);
app.use("/reviews", reviewRouter);
app.use("/chatbot", chatbotRouter)
app.use("/cart", cartRouter)

//get all_review by book_id
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(4800, async () => {
  try {
    await connection;
    console.log("Server is Running on port 4800");
  } catch (error) {
    console.log(error);
  }
});
