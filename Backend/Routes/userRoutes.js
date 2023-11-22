const express = require("express");
const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

//Register Route
userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const registeredUser = await userModel.findOne({ email });

  if (registeredUser) {
    res.send({ msg: "Already have Account with this email address" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const newUser = new userModel({ ...req.body, password: hash });
        await newUser.save();
        res.send({ msg: "Registration Successfull", newUser });
      }
    });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { user_id: user._id, username: user.username },
          "masai"
        );
        res.send({
          msg: "Login Successfull",
          username: user.username,
          role: user.role,
          token,
        });
      } else {
        res.status(500).send({ msg: "Incorrect Password" });
      }
    });
  } else {
    res.status(500).send("Incorrect Email");
  }
});

module.exports = {
  userRouter,
};
