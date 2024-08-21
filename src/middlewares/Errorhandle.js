const { InternalError } = require("../core/error.response");

const ErrorHandler = (err, req, res, next) => {
  let message = new InternalError();
  console.log(message.message, message.statusCode);
  res
    .status(message.statusCode || 500)
    .json({ message: message.message, statusCode: 500, error: err.message });
};

module.exports = ErrorHandler;
