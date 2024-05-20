import moment from "moment";
import "./card.css";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  const formattedDate = moment(appointment.createdAt).format(
    "MMMM Do YYYY, h:mm a"
  );

  return (
    <div className="appointment-card">
      <p>
        <span>Patient: </span>
        {appointment.patientName}
      </p>
      <p>
        <span>Doctor: </span>
        {appointment.doctorName}
      </p>
      <p>
        <span>Date: </span>
        {formattedDate}
      </p>
      <div className="btn-container">
        <button
          onClick={() => {
            onEdit(appointment);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(appointment._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
