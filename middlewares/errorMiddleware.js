const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = error.message || "Something went wrong!";

  res.status(statusCode).json({
    message: message,
  });
};

export default errorMiddleware;
