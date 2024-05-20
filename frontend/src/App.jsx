import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Appointments from "./components/Appointments/Appointments";
import Doctors from "./components/Doctors/Doctors";
import Patients from "./components/Patients/Patients";
import "./App.css";

const App = () => {
  // Function to check if a link is active
  const getActiveClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <Router>
      <div className="container">
        <h1 style={{ color: "green" }}>VCH - Vihiga District Hospital</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/appointments" className={getActiveClass}>
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" className={getActiveClass}>
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/patients" className={getActiveClass}>
                Patients
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
