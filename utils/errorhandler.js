exports.throwError = (
  res,
  statusCode = 400,
  message = 'Something went wrong',
) => {
  return res.status(statusCode).json({ message })
}
