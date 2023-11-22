const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./Routes/userRoutes");
const { bookRouter } = require("./Routes/bookRoutes");
const { favoriteRouter } = require("./Routes/favoriteRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/books", bookRouter);
app.use("/favorite", favoriteRouter);

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