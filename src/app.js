const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const webApi = require("./routes/index");
const instance = require("./config/instance");
const error_handler = require("./middlewares/Errorhandle");
const cors = require("cors");

const app = express();
///dependencies

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "ws://127.0.0.1:58202/Y0K-wQ8gR60=/ws",
      "https://booking-tour-zeta.vercel.app",
      "https://localhost:3000",
      "https://hella-booking-ant.vercel.app",
    ],
    credentials: true,
  })
);

////routes
webApi(app);

///db
instance();

// Error handling middleware
app.use(error_handler);

module.exports = app;
