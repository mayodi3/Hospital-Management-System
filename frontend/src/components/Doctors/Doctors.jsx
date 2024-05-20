import "./doctors.css";
import axios from "axios";
import DoctorCard from "./card/Card";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", speciality: "" });
  const [selectedDoctor, setselectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function getDoctors() {
      try {
        const { data } = await axios.get("http://localhost:3000/doctors");
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    getDoctors();
  }, []);

  const handleAddDoctor = (event) => {
    async function addDoctor() {
      try {
        event.preventDefault();
        const { data } = await axios.post(
          "http://localhost:3000/doctors",
          newDoctor
        );
        setDoctors([...doctors, data]);
        setNewDoctor({ name: "", speciality: "" });
      } catch (error) {
        console.error("Error adding doctor:", error);
      }
    }
    addDoctor();
  };

  const handleUpdateDoctor = (event) => {
    async function udpateDoctor() {
      try {
        event.preventDefault();
        const { data } = await axios.patch(
          `http://localhost:3000/doctors/${selectedDoctor._id}`,
          selectedDoctor
        );
        const updatedDoctors = doctors.map((doctor) =>
          doctor._id === selectedDoctor._id ? data : doctor
        );
        console.log(data);
        setDoctors(updatedDoctors);
        setselectedDoctor({ name: "", speciality: "" });
        setIsEditMode(false);
      } catch (error) {
        console.error("Error updating doctor:", error);
      }
    }
    udpateDoctor();
  };

  const handleDeleteDoctor = (id) => {
    async function deleteDoctor() {
      try {
        const { data } = await axios.delete(
          `http://localhost:3000/doctors/${id}`
        );
        console.log(data);
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      } catch (error) {
        console.error("Error deleting doctor: ", error);
      }
    }
    deleteDoctor();
  };

  const handleEditDoctor = (doctor) => {
    setselectedDoctor(doctor);
    setIsEditMode(true);
  };

  return (
    <div className="main-doc-container">
      <div className="form-sections">
        <h4>{isEditMode ? "Edit Doctor" : "Add New Doctor"}</h4>
        <form onSubmit={isEditMode ? handleUpdateDoctor : handleAddDoctor}>
          <label>Name : </label>
          <input
            type="text"
            value={isEditMode ? selectedDoctor.name : newDoctor.name}
            onChange={(event) =>
              isEditMode
                ? setselectedDoctor({
                    ...selectedDoctor,
                    name: event.target.value,
                  })
                : setNewDoctor({ ...newDoctor, name: event.target.value })
            }
          />{" "}
          <br />
          <label>Speciality: </label>
          <input
            type="text"
            value={
              isEditMode ? selectedDoctor.speciality : newDoctor.speciality
            }
            onChange={(event) =>
              isEditMode
                ? setselectedDoctor({
                    ...selectedDoctor,
                    speciality: event.target.value,
                  })
                : setNewDoctor({ ...newDoctor, speciality: event.target.value })
            }
          />{" "}
          <br />
          <button type="submit">
            {isEditMode ? "Update Doctor" : "Add Doctor"}
          </button>
        </form>
      </div>
      <div className="doctors-section">
        <h3>Doctors({doctors.length})</h3>
        <div className="doctor-list">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
