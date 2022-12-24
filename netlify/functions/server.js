const express = require("express");
require("express-async-errors");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogRoutes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

logger.info("Connecting to MongoDB...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected with MongoDB.");
  })
  .catch((error) =>
    logger.error("Error connecting with MongoDB:", error.message)
  );

app.use(middleware.middlewareLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);

const serverless = require("serverless-http");
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
