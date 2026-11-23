const AppError = require('../utils/AppError');
function errorHandler(err, _req, res, _next) {
  if (err && err.code === 11000) return res.status(409).json({ success: false, message: 'A record with this unique value already exists' });
  if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
  if (err && err.name === 'CastError') return res.status(400).json({ success: false, message: 'Invalid ID or value' });
  if (err && err.name === 'ValidationError') return res.status(400).json({ success: false, message: err.message });
  console.error(err);
  return res.status(500).json({ success: false, message: 'Internal server error' });
}
module.exports = { errorHandler };
