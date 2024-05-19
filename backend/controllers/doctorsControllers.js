import DoctorModel from "../models/Doctor.js";
import mongoose from "mongoose";

const createDoctor = async (req, res) => {
  try {
    const { name, speciality } = req.body;
    const doctor = await DoctorModel.create({ name, speciality });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const doctor = await DoctorModel.findById({ _id: id });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const doctor = await DoctorModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const doctor = await DoctorModel.findByIdAndDelete({ _id: id });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor };
