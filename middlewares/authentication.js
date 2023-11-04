const { User } = require("../models/user");
const { decode } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);
    if (!authorization) {
      throw new Error("Unauthorized");
    }

    const access_token = authorization.split(" ")[1];
    // console.log(access_token, ">>>>>>>");
    if (!access_token) {
      throw new Error("Unauthorized");
    }
    // console.log(decode(access_token));
    const { id, email, role } = decode(access_token);
    // console.log(decode(access_token));

    req.loginInfo = { id, email, role };
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authentication;
