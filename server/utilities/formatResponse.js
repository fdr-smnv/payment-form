export const formatCreatePaymentResponse = ({ _id, Amount }) => {
  return {
    RequestId: _id.toString(),
    Amount,
  };
};
