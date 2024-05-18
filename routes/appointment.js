import { Router } from "express";
import {
  createAnAppointment,
  deleteAnAppointment,
  getAllAppiontments,
  getAnAppointment,
  updateAnAppointment,
} from "../controllers/appointmentControllers.js";

const router = Router();

router.post("/", createAnAppointment);
router.get("/", getAllAppiontments);
router.get("/:id", getAnAppointment);
router.patch("/:id", updateAnAppointment);
router.delete("/:id", deleteAnAppointment);

export default router;
