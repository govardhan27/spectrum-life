import { Request, Response, NextFunction } from "express";
import { db } from "@config/database";
import { AppError } from "@utils/error";
import {
  CreateGpContactSchema,
  UpdateGpContactSchema,
} from "@validators/gpContact.validator";

export const createGpContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = CreateGpContactSchema.parse(req.body);

    const gpContact = await db.gpContact.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      data: gpContact,
    });
  } catch (error) {
    next(error);
  }
};

export const getGpContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const gpContact = await db.gpContact.findUnique({
      where: { id },
    });

    if (!gpContact) {
      throw new AppError(404, "GP contact not found");
    }

    res.json({
      success: true,
      data: gpContact,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllGpContacts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gpContacts = await db.gpContact.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: gpContacts,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGpContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateGpContactSchema.parse(req.body);

    const gpContact = await db.gpContact.update({
      where: { id },
      data: validatedData,
    });

    res.json({
      success: true,
      data: gpContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGpContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await db.gpContact.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "GP contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
