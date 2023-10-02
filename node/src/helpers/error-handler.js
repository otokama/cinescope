
function errorHandler(err, res, req, next) {
  if (err.message && err.statusCode) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({message: err});
}

export default errorHandler;