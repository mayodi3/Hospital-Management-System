import PatientModel from "../models/Patient.js";
import mongoose from "mongoose";

const createPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const patient = await PatientModel.create({ name, age, gender });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Given patient not found" });
    }
    const patient = await PatientModel.findById({ _id: id });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Given patient not found" });
    }
    const patient = await PatientModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Given patient not found" });
    }
    const patient = await PatientModel.findByIdAndDelete({ _id: id });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createPatient, getPatients, getPatient, updatePatient, deletePatient };
