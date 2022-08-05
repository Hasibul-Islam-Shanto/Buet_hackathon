// @ts-nocheck
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const errorController = require("./controllers/errorController");
const appError = require("./utils/appError");

const userRouter = require("./routes/userRouter");
const speechRouter = require("./routes/speechRouter");
const phaseOne = require('./routes/phaseOne')

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/speechtotext", speechRouter);
app.use("/api/phaseone",phaseOne);

app.get("/", (req, res) => {
  
  res.status(200).json({
    status: "success",
    ipAddress: req.ip,
    message: "Welcome to the API",
  });
});

app.all("*", (req, res, next) => {
  next(
    new appError(
      `Can't find this route (${req.originalUrl}) on the server`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
