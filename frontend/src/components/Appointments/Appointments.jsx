import { useEffect, useState } from "react";
import axios from "axios";
import "./appointments.css";
import AppointmentCard from "./card/card";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const { data } = await axios.get("http://localhost:3000/appointments");
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    }
    fetchAppointments();
  }, []);

  const handleAddAppointment = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/appointments",
        newAppointment
      );
      console.log(data);
      setAppointments([...appointments, data]);
      setNewAppointment({ patientName: "", doctorName: "" });
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleUpdateAppointment = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/appointments/${selectedAppointment._id}`,
        selectedAppointment
      );

      const updatedAppointments = appointments.map((appointment) =>
        appointment._id === selectedAppointment._id ? data : appointment
      );

      console.log(data);
      setAppointments(updatedAppointments);
      setSelectedAppointment({ patientName: "", doctorName: "" });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDeleteAppointment = (id) => {
    async function deleteAppointment() {
      try {
        const { data } = await axios.delete(
          `http://localhost:3000/appointments/${id}`
        );
        console.log(data);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      } catch (error) {
        console.error("Error deleting appointment: ", error);
      }
    }
    deleteAppointment();
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  return (
    <div>
      <div className="flex-row" style={{ width: "100%" }}>
        <div className="flex-column">
          <div className="add-form">
            <h4>{isEditMode ? "Edit Appointment" : "Add New Appointment"}</h4>
            <form
              className="appointment-form"
              onSubmit={
                isEditMode ? handleUpdateAppointment : handleAddAppointment
              }
            >
              <label>Patient Name:</label>
              <input
                type="text"
                value={
                  isEditMode
                    ? selectedAppointment.patientName
                    : newAppointment.patientName
                }
                onChange={(event) =>
                  isEditMode
                    ? setSelectedAppointment({
                        ...selectedAppointment,
                        patientName: event.target.value,
                      })
                    : setNewAppointment({
                        ...newAppointment,
                        patientName: event.target.value,
                      })
                }
              />
              <label>Doctor Name:</label>
              <input
                type="text"
                value={
                  isEditMode
                    ? selectedAppointment.doctorName
                    : newAppointment.doctorName
                }
                onChange={(event) =>
                  isEditMode
                    ? setSelectedAppointment({
                        ...selectedAppointment,
                        doctorName: event.target.value,
                      })
                    : setNewAppointment({
                        ...newAppointment,
                        doctorName: event.target.value,
                      })
                }
              />
              <button type="submit">
                {isEditMode ? "Update Appointment" : "Add Appointment"}
              </button>
            </form>
          </div>
        </div>
        <div className="appointments">
          <h3>Appointments ({appointments.length})</h3>
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onEdit={handleEditAppointment}
                onDelete={handleDeleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
