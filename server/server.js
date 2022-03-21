"use strict";

import express from "express";
import config from "./config.js";
import router from "./router.js";
import { responseHandler } from "./utilities/responseHandler.js";
import { globalErrorHandler } from "./utilities/globalErrorHandler.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(globalErrorHandler);
app.use((req, res, next) => {
  res.responseHandler = responseHandler;
  return next();
});

app.use("/", router);

app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`);
});
