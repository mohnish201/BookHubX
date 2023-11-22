const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected to db"))
  .catch((error) => console.log(error));


  module.exports={
    connection
  }