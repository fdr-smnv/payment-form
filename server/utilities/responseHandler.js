export function responseHandler(
  data = null,
  message = "",
  status = 200,
  name = "OK"
) {
  this.status(status).json({
    status: name,
    message,
    data,
    error: null,
  });
}
