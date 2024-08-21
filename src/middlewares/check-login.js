require("dotenv").config();
const { ForbiddenError } = require("../core/error.response");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const secretKey = process.env.DEV_KEY;

const checkLogin = asyncHandler(async (req, res, next) => {
  let check = await jwt.verify(req.headers["token"], secretKey);
  if ((Date.now() >= check?.exp * 1000) | !req.headers["token"]) {
    return new ForbiddenError().send(res);
  }
  next();
});

module.exports = { checkLogin };
