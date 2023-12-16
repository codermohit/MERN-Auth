import { StatusCodes } from "http-status-codes";

export const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route not found" });
};
