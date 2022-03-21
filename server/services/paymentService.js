export class PaymentService {
  constructor(paymentModel) {
    this.paymentModel = paymentModel;
  }

  async createNewPayment(req) {
    return this.paymentModel.create(req.body);
  }
}
