import express from "express";
import { formatCreatePaymentResponse } from "./utilities/formatResponse.js";

import { PaymentRecord } from "./models/PaymentRecord.js";
import { PaymentService } from "./services/paymentService.js";

const paymentServiceInstance = new PaymentService(PaymentRecord);
const router = express.Router();

router.post("/api/payment/create", async (req, res) => {
  try {
    const result = await paymentServiceInstance.createNewPayment(req);
    res.responseHandler(formatCreatePaymentResponse(result));
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e);
  }
});

export default router;
