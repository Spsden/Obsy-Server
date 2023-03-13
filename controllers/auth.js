const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad_request");
const UnAuthenticatedRequest = require("../errors/unauthenticated_request");
const { findOne } = require("../models/user");
const User = require("../models/user");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.debug(email);

  if (!email || !password) {
    throw new BadRequestError("please provide email and pw");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedRequest("Invalid Credentials");
  }
  const isPasswordCorrect  = await user.comparePassword(password);
  if(!isPasswordCorrect){
    throw new UnAuthenticatedRequest("Invalid Credentials")
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
};

module.exports = {
  register,
  login,
};
