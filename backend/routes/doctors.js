import { Router } from "express";
import DoctorModel from "../models/Doctor.js";
import mongoose from "mongoose";
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorsControllers.js";

const router = Router();

router.post("/", createDoctor);
router.get("/:id", getDoctor);
router.get("/", getDoctors);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
