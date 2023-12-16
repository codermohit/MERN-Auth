import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Internal Server Error",
  };
  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} already in use`;
    customError.statusCode = 400;
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, errorMsg: customError.msg });
};
