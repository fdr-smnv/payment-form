import mongoose from "mongoose";
import config from "../config.js";

mongoose
  .connect(config[config.env].uri, config[config.env].dbOptions)
  .catch((err) => {
    process.nextTick(() => {
      throw err;
    });
  });
