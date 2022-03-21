import mongoose from "mongoose";
import "./connect.js";

const PaymentRecordSchema = new mongoose.Schema({
  CardNumber: {
    type: String,
    required: true,
    match: new RegExp("^[0-9]{16}$"),
  },
  ExpDate: {
    type: String,
    required: true,
    match: new RegExp("^0[1-9]|1[0-2]/[0-9]{4}$"),
  },
  // Можно отпарсить ExpDate для надежности хранения и пользования
  // ExpDate: {
  //   type: Date,
  //   required: true,
  // },
  Cvv: {
    type: String,
    required: true,
    match: new RegExp("^[0-9]{3}$"),
  },
  Amount: {
    type: Number,
    required: true,
    min: 1
  },
});

export const PaymentRecord = mongoose.model(
  "PaymentRecord",
  PaymentRecordSchema
);
