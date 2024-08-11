const jwt = require("jsonwebtoken");
const { success, error } = require("../UTILS/responseWrapper");
const userDB = require("../SCHEMA/userSchema");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req._id = decode.id;

    const user = await userDB.findById(decode.id);
    if (!user) return res.send(error(404, "User not found"));

    next();
  } catch (err) {
    return res.send(error(401, "Invalid access"));
  }
};
