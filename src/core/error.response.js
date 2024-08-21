"use strict";
const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL: 500,
};
const ReasonStatusCode = {
  FORBIDDEN: "For bidden action!",
  CONFLICT: "Conflict",
  INTERNAL: "INTERNAL SERVER!",
};

class ErrorResponse {
  constructor(message, statusCode, errorLog) {
    this.message = message;
    this.statusCode = statusCode;
  }
  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.CONFLICT,
    errorLog = {}
  ) {
    super(message, statusCode);

    this.errorLog = errorLog;
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
    this.message = message;
  }
}
class InternalError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.INTERNAL,
    statusCode = StatusCode.INTERNAL
  ) {
    super(message, statusCode);
  }
}
class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
    (this.message = message), (this.statusCode = statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  InternalError,
  ForbiddenError,
};
