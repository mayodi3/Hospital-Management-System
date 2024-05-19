import { Router } from "express";

import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from "../controllers/patientContollers.js";

const router = Router();

router.post("/", createPatient);
router.get("/:id", getPatient);
router.get("/", getPatients);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
