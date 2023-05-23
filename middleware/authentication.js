const UnAuthenticatedRequest = require("../errors/unauthenticated_request");

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticatedRequest("Authentication invalid");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {userId:payload.userId,name:payload.name}
    next( )
  } catch (error) {
    new UnAuthenticatedRequest('Authentication invalid')
  }
};

module.exports = auth;
