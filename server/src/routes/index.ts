import { Router } from "express";
import gpContactRoutes from "@routes/gpContact.routes";

const router = Router();

router.use("/gp-contacts", gpContactRoutes);

export default router;
