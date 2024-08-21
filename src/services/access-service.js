const { ConflictRequestError } = require("../core/error.response");
const { Created, Success } = require("../core/success.response");
const bcrypt = require("bcryptjs");
const users = require("../models/user-model");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { createToken } = require("../auths/createToken");

class Access {
  static register = asyncHandler(async (req, res) => {
    const checkExist = await users.findOne({
      $or: [{ userName: req.body?.userName }, { email: req.body?.email }],
    });
    console.log(checkExist);
    if (checkExist) {
      return new ConflictRequestError(
        "Existing email or user name",
        undefined,
        checkExist
      ).send(res);
    }

    const hashpassword = bcrypt.hashSync(req.body.password, 6);

    const newData = await users.create({
      name: req.body?.name,
      email: req.body?.email,
      userName: req.body?.userName,
      password: hashpassword,
    });
    return new Created("Ok", newData).send(res);
  });

  //////Login
  static login = asyncHandler(async (req, res) => {
    const user = await users.findOne({
      $or: [{ userName: req.body?.userName }, { email: req.body?.email }],
    });

    if (!user)
      return new ConflictRequestError("Not found user", 404, undefined).send(
        res
      );
    let checkpass = bcrypt.compareSync(req.body?.password, user?.password);
    // const token = await createToken({ findUser });
    // console.log(token);

    return checkpass === true
      ? new Success("login success", await createToken({ user })).send(res)
      : new ConflictRequestError("Wrong password").send(res);
  });
}

module.exports = Access;
