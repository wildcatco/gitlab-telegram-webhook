import { ErrorRequestHandler } from 'express';

const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send({
    error: err,
  });
};

export default ErrorHandler;
