import { Schema, model } from "mongoose";

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
});

export default model("Doctor", DoctorSchema);
