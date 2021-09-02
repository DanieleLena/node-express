const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  //demo id, normally provideded by DB
  const id = new Date().getDate();

  //try to keep payload small
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => { 
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `Here your lucky number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};