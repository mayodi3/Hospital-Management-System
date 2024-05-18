import { Schema, model } from "mongoose";

const PatientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
});

export default model("Patient", PatientSchema);
