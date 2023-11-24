const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      // console.log(decoded)
      if (decoded) {
        req.body.user_id = decoded.user_id;
        req.body.username = decoded.username;
        next();
      } else {
        res.send({ msg: "You are not Authorized" });
      }
    });
  } else {
    res.send({ msg: "Login First" });
  }
};

module.exports = {
  auth,
};


