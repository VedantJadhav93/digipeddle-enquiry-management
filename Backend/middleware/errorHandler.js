
const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;

  // Log the full error on the server, not in the public response.
  console.error("API error:", error);

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Something went wrong. Please try again later."
        : error.message,
  });
};

module.exports = errorHandler;