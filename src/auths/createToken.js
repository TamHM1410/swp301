require("dotenv").config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.DEV_KEY;
////create token
const createToken = async (payload) => {
  let token = await jwt.sign(payload, secretKey, {
    expiresIn: 36000,
  });
  return {
    token: token,
    payload,
  };
};

module.exports = { createToken };
