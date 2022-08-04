// @ts-nocheck
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require('colors');

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// if (process.env.NODE_ENV == "production") {
//   dotenv.config({ path: ".env.production" });
// } else {
dotenv.config({ path: ".env" })
// }

const port = process.env.PORT || 4000;

const app = require("./app.js");
const DB = process.env.DATABASE_REMOTE || process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((cons) => {
    //console.log(cons.connections);
    console.log("MONGODB connected successfully".brightCyan);
  })
  .catch((err) => {
    console.log("Database connection unsuccessful!".red,err);
  });

const server = app.listen(port, () => {
  console.log(`App running on ${port} in ${process.env.NODE_ENV} mode....`.brightMagenta);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
