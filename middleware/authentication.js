const UnAuthenticatedRequest = require("../errors/unauthenticated_request");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  console.log("came to auth");
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticatedRequest("Authentication invalid");
  }
  const token = authHeaders.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    console.log(payload.userId )
    console.log(payload.name )

    next();
  } catch (error) {
    throw new UnAuthenticatedRequest("Authentication invalid 2");
  }
};

module.exports = auth;
