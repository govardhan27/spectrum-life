import { Request, Response, NextFunction } from "express";
import { Prisma } from "@generated/prisma/client";
import { ZodError } from "zod";
import { AppError } from "@utils/error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) return next();

  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res
      .status(400)
      .json({ success: false, error: "Validation failed", errors });
  }

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" });
    }
    if (err.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, error: "GP contact not found" });
    }
  }

  console.error(err);
  return res
    .status(500)
    .json({ success: false, error: "Internal server error" });
};
