import AppointementModel from "../models/appointment.js";
import mongoose from "mongoose";

async function getAllAppiontments(req, res) {
  try {
    const appointments = await AppointementModel.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
}

async function getAnAppointment(req, res) {
  try {
    const { id } = req.params;
    const appointment = await AppointementModel.findById({ _id: id });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createAnAppointment(req, res) {
  try {
    const { patientName, doctorName } = req.body;
    const newAppointment = await AppointementModel.create({
      patientName,
      doctorName,
    });
    res.status(200).json(newAppointment);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
}

async function updateAnAppointment(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such appoitment" });
    }
    const appoitment = await AppointementModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(appoitment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteAnAppointment(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Appiontment not found" });
    }
    const appoitment = await AppointementModel.findByIdAndDelete({ _id: id });
    res.status(200).json(appoitment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  getAllAppiontments,
  getAnAppointment,
  createAnAppointment,
  updateAnAppointment,
  deleteAnAppointment,
};
