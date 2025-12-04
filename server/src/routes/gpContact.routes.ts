import { Router } from "express";
import {
  createGpContact,
  getGpContact,
  getAllGpContacts,
  updateGpContact,
  deleteGpContact,
} from "@controllers/gpContact.controller";

const router = Router();

router.post("/", createGpContact);
router.get("/", getAllGpContacts);
router.get("/:id", getGpContact);
router.put("/:id", updateGpContact);
router.delete("/:id", deleteGpContact);

export default router;
