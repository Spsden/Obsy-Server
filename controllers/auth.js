const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad_request");
const User = require("../models/user");


const register = async (req, res) => {
  //const { username, email, password } = req.body;
  // console.log(username);
  // console.log(email);

  // if (!username || !email || !password) {
  //   console.log("yo");
  //   throw new BadRequestError("Provide data in all fields");
  // }
 
  
  const user = await User.create({ ...req.body });
  const token = user.createJWT()
  console.log("reached here")
  res.status(StatusCodes.CREATED).json({ user:{name:user.username},token });
};

const login = async (req, res) => {

  const {username,password}  = req.body;

  if(!username || !password){
    console.log("some error")
    throw new BadRequestError('Please provide email and password')
  }

  
  res.send(username);

};

module.exports = {
  register,
  login,
};
