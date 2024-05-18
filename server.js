import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRouter from "./routes/appointment.js";
import doctorRouter from "./routes/doctors.js";
import patientRouter from "./routes/patients.js";

dotenv.config();
const URI = process.env.URI;
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to Hospital management system");
});
app.use("/appointments", appointmentRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);

// connect to server and mongodb
async function connectServerAndDb() {
  try {
    await connect(URI);
    app.listen(PORT, () => {
      console.log(
        `Connected to DB and listening on http://localhost:${PORT}...`
      );
    });
  } catch (error) {
    console.error(error);
  }
}
connectServerAndDb();
