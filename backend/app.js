// @ts-nocheck
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();
const ExpressCache = require("express-cache-middleware");
const cacheManager = require("cache-manager");

const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
    store: "memory",
    max: 10000,
    ttl: 3600,
  })
);

const errorController = require("./controllers/errorController");
const appError = require("./utils/appError");

const userRouter = require("./routes/userRouter");
const speechRouter = require("./routes/speechRouter");
const phaseOne = require("./routes/phaseOne");
const noteapi = require("./routes/noteapi")

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Management API",
      version: "1.0.0",
      description: "Note Managing Api For User",
      contact: {
        name: "Moksedur Rahman Sohan",
        email: "moksedur.rahman.sohan@gmail.com",
      },
      servers: ["http://localhost:4000"],
    },
  },
  apis: ["./routes/noteapi.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
cacheMiddleware.attach(app);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api", noteapi);
app.use("/api/user", userRouter);
app.use("/api/speechtotext", speechRouter);
app.use("/api/phaseone", phaseOne);

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
