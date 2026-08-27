import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [page, setPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ================= DOCTORS =================

  const [doctors, setDoctors] = useState([]);
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [doctorError, setDoctorError] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    department: "",
    phone: "",
  });

  // ================= PATIENTS =================

  const [patients, setPatients] = useState([]);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientError, setPatientError] = useState("");

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  // ================= APPOINTMENTS =================

  const [appointments, setAppointments] = useState([]);
  const [appointmentLoading, setAppointmentLoading] =
    useState(false);
  const [appointmentError, setAppointmentError] =
    useState("");

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    department: "",
    date: "",
    time: "",
  });

  // ================= EMERGENCIES =================

  const [emergencies, setEmergencies] = useState([]);
  const [emergencyLoading, setEmergencyLoading] =
    useState(false);
  const [emergencyError, setEmergencyError] =
    useState("");

  const [newEmergency, setNewEmergency] = useState({
    patient: "",
    phone: "",
    type: "",
    location: "",
    priority: "",
  });

  // ================= LOAD DATA =================

  useEffect(() => {
    loadDoctors();
    loadPatients();
    loadAppointments();
    loadEmergencies();
  }, []);

  // ================= DOCTOR API =================

  const loadDoctors = async () => {
    try {
      setDoctorLoading(true);
      setDoctorError("");

      const response = await fetch(`${API_URL}/doctors`);

      if (!response.ok) {
        throw new Error("Failed to load doctors");
      }

      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setDoctorError(
        "Could not connect to the doctor backend."
      );
    } finally {
      setDoctorLoading(false);
    }
  };

  const addDoctor = async (event) => {
    event.preventDefault();

    try {
      setDoctorError("");

      const response = await fetch(`${API_URL}/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add doctor"
        );
      }

      setDoctors((current) => [...current, data]);

      setNewDoctor({
        name: "",
        department: "",
        phone: "",
      });
    } catch (err) {
      setDoctorError(err.message);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      setDoctorError("");

      const response = await fetch(
        `${API_URL}/doctors/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete doctor"
        );
      }

      setDoctors((current) =>
        current.filter((doctor) => doctor.id !== id)
      );
    } catch (err) {
      setDoctorError(err.message);
    }
  };

  // ================= PATIENT API =================

  const loadPatients = async () => {
    try {
      setPatientLoading(true);
      setPatientError("");

      const response = await fetch(`${API_URL}/patients`);

      if (!response.ok) {
        throw new Error("Failed to load patients");
      }

      const data = await response.json();
      setPatients(data);
    } catch (err) {
      setPatientError(
        "Could not connect to the patient backend."
      );
    } finally {
      setPatientLoading(false);
    }
  };

  const addPatient = async (event) => {
    event.preventDefault();

    try {
      setPatientError("");

      const patientData = {
        name: newPatient.name,
        age: Number(newPatient.age),
        gender: newPatient.gender,
        phone: newPatient.phone,
      };

      const response = await fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add patient"
        );
      }

      setPatients((current) => [...current, data]);

      setNewPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
      });
    } catch (err) {
      setPatientError(err.message);
    }
  };

  const deletePatient = async (id) => {
    try {
      setPatientError("");

      const response = await fetch(
        `${API_URL}/patients/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete patient"
        );
      }

      setPatients((current) =>
        current.filter((patient) => patient.id !== id)
      );
    } catch (err) {
      setPatientError(err.message);
    }
  };

  // ================= APPOINTMENT API =================

  const loadAppointments = async () => {
    try {
      setAppointmentLoading(true);
      setAppointmentError("");

      const response = await fetch(
        `${API_URL}/appointments`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load appointments"
        );
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setAppointmentError(
        "Could not connect to the appointment backend."
      );
    } finally {
      setAppointmentLoading(false);
    }
  };

  const addAppointment = async (event) => {
    event.preventDefault();

    try {
      setAppointmentError("");

      const response = await fetch(
        `${API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAppointment),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create appointment"
        );
      }

      setAppointments((current) => [
        ...current,
        data,
      ]);

      setNewAppointment({
        patient: "",
        doctor: "",
        department: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setAppointmentError(err.message);
    }
  };

  const updateAppointmentStatus = async (
    id,
    status
  ) => {
    try {
      setAppointmentError("");

      const response = await fetch(
        `${API_URL}/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update appointment"
        );
      }

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === id
            ? data
            : appointment
        )
      );
    } catch (err) {
      setAppointmentError(err.message);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      setAppointmentError("");

      const response = await fetch(
        `${API_URL}/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete appointment"
        );
      }

      setAppointments((current) =>
        current.filter(
          (appointment) => appointment.id !== id
        )
      );
    } catch (err) {
      setAppointmentError(err.message);
    }
  };

  // ================= EMERGENCY API =================

  const loadEmergencies = async () => {
    try {
      setEmergencyLoading(true);
      setEmergencyError("");

      const response = await fetch(
        `${API_URL}/emergencies`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load emergency requests"
        );
      }

      const data = await response.json();
      setEmergencies(data);
    } catch (err) {
      setEmergencyError(
        "Could not connect to the emergency backend."
      );
    } finally {
      setEmergencyLoading(false);
    }
  };

  const addEmergency = async (event) => {
    event.preventDefault();

    try {
      setEmergencyError("");

      const response = await fetch(
        `${API_URL}/emergencies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmergency),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create emergency request"
        );
      }

      setEmergencies((current) => [
        ...current,
        data,
      ]);

      setNewEmergency({
        patient: "",
        phone: "",
        type: "",
        location: "",
        priority: "",
      });
    } catch (err) {
      setEmergencyError(err.message);
    }
  };

  const updateEmergencyStatus = async (
    id,
    status
  ) => {
    try {
      setEmergencyError("");

      const response = await fetch(
        `${API_URL}/emergencies/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update emergency"
        );
      }

      setEmergencies((current) =>
        current.map((emergency) =>
          emergency.id === id
            ? data
            : emergency
        )
      );
    } catch (err) {
      setEmergencyError(err.message);
    }
  };

  const deleteEmergency = async (id) => {
    try {
      setEmergencyError("");

      const response = await fetch(
        `${API_URL}/emergencies/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete emergency"
        );
      }

      setEmergencies((current) =>
        current.filter(
          (emergency) => emergency.id !== id
        )
      );
    } catch (err) {
      setEmergencyError(err.message);
    }
  };

  // ================= LOGIN =================

  const login = (event) => {
    event.preventDefault();

    if (
      email.trim().toLowerCase() ===
        "admin@medicare.com" &&
      password.trim() === "admin123"
    ) {
      setShowLogin(false);
      setPage("dashboard");
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const logout = () => {
    setPage("home");
    setEmail("");
    setPassword("");
    setError("");
  };

  // ================= DASHBOARD =================

  if (page === "dashboard") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>MediCare+</h1>
            <p>Doctor Admin Dashboard</p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <h2>
            Welcome, Doctor Admin 👨‍⚕️
          </h2>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>👨‍⚕️ Doctors</h3>
              <h2>{doctors.length}</h2>
              <p>Registered Doctors</p>
            </div>

            <div className="dashboard-card">
              <h3>👥 Patients</h3>
              <h2>{patients.length}</h2>
              <p>Registered Patients</p>
            </div>

            <div className="dashboard-card">
              <h3>📅 Appointments</h3>
              <h2>{appointments.length}</h2>
              <p>Total Appointments</p>
            </div>

            <div className="dashboard-card">
              <h3>🚨 Emergency</h3>
              <h2>{emergencies.length}</h2>
              <p>Emergency Requests</p>
            </div>
          </div>

          <div className="dashboard-menu">
            <button onClick={() => setPage("doctors")}>
              👨‍⚕️ Manage Doctors
            </button>

            <button onClick={() => setPage("patients")}>
              👥 Manage Patients
            </button>

            <button
              onClick={() =>
                setPage("appointments")
              }
            >
              📅 Manage Appointments
            </button>

            <button
              onClick={() =>
                setPage("emergency")
              }
            >
              🚨 Emergency Requests
            </button>
          </div>

          <div className="dashboard-section">
            <h2>Recent Appointments</h2>

            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments
                  .slice(-5)
                  .reverse()
                  .map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        {appointment.patient}
                      </td>

                      <td>
                        {appointment.doctor}
                      </td>

                      <td>
                        {
                          appointment.department
                        }
                      </td>

                      <td>
                        {appointment.date}
                      </td>

                      <td>
                        {appointment.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }

  // ================= DOCTORS =================

  if (page === "doctors") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>MediCare+</h1>
            <p>Doctor Management</p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <button
            className="back-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <h2>👨‍⚕️ Manage Doctors</h2>

          <div className="doctor-form">
            <h2>Add New Doctor</h2>

            <form onSubmit={addDoctor}>
              <input
                type="text"
                placeholder="Doctor Name"
                value={newDoctor.name}
                onChange={(event) =>
                  setNewDoctor({
                    ...newDoctor,
                    name: event.target.value,
                  })
                }
                required
              />

              <select
                value={newDoctor.department}
                onChange={(event) =>
                  setNewDoctor({
                    ...newDoctor,
                    department:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Department
                </option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>General Medicine</option>
                <option>Orthopedics</option>
              </select>

              <input
                type="tel"
                placeholder="Phone Number"
                value={newDoctor.phone}
                onChange={(event) =>
                  setNewDoctor({
                    ...newDoctor,
                    phone: event.target.value,
                  })
                }
                required
              />

              <button type="submit">
                + Add Doctor
              </button>
            </form>

            {doctorError && (
              <p className="login-error">
                {doctorError}
              </p>
            )}
          </div>

          <div className="dashboard-section">
            <h2>Registered Doctors</h2>

            {doctorLoading ? (
              <p>Loading doctors...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.name}</td>
                      <td>{doctor.department}</td>
                      <td>{doctor.phone}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteDoctor(
                              doctor.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ================= PATIENTS =================

  if (page === "patients") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>MediCare+</h1>
            <p>Patient Management</p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <button
            className="back-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <h2>👥 Manage Patients</h2>

          <div className="doctor-form">
            <h2>Add New Patient</h2>

            <form onSubmit={addPatient}>
              <input
                type="text"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={(event) =>
                  setNewPatient({
                    ...newPatient,
                    name: event.target.value,
                  })
                }
                required
              />

              <input
                type="number"
                placeholder="Age"
                min="1"
                max="120"
                value={newPatient.age}
                onChange={(event) =>
                  setNewPatient({
                    ...newPatient,
                    age: event.target.value,
                  })
                }
                required
              />

              <select
                value={newPatient.gender}
                onChange={(event) =>
                  setNewPatient({
                    ...newPatient,
                    gender:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input
                type="tel"
                placeholder="Phone Number"
                value={newPatient.phone}
                onChange={(event) =>
                  setNewPatient({
                    ...newPatient,
                    phone:
                      event.target.value,
                  })
                }
                required
              />

              <button type="submit">
                + Add Patient
              </button>
            </form>

            {patientError && (
              <p className="login-error">
                {patientError}
              </p>
            )}
          </div>

          <div className="dashboard-section">
            <h2>Registered Patients</h2>

            {patientLoading ? (
              <p>Loading patients...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.phone}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deletePatient(
                              patient.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ================= APPOINTMENTS =================

  if (page === "appointments") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>MediCare+</h1>
            <p>
              Appointment Management
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <button
            className="back-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <h2>
            📅 Manage Appointments
          </h2>

          {appointmentError && (
            <p className="login-error">
              {appointmentError}
            </p>
          )}

          <div className="doctor-form">
            <h2>
              Create New Appointment
            </h2>

            <form
              onSubmit={addAppointment}
            >
              <select
                value={
                  newAppointment.patient
                }
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    patient:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient.id}
                    value={patient.name}
                  >
                    {patient.name}
                  </option>
                ))}
              </select>

              <select
                value={
                  newAppointment.doctor
                }
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    doctor:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor.id}
                    value={doctor.name}
                  >
                    {doctor.name}
                  </option>
                ))}
              </select>

              <select
                value={
                  newAppointment.department
                }
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    department:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Department
                </option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>General Medicine</option>
                <option>Orthopedics</option>
              </select>

              <input
                type="date"
                value={
                  newAppointment.date
                }
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    date:
                      event.target.value,
                  })
                }
                required
              />

              <input
                type="time"
                value={
                  newAppointment.time
                }
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    time:
                      event.target.value,
                  })
                }
                required
              />

              <button type="submit">
                + Create Appointment
              </button>
            </form>
          </div>

          <div className="dashboard-section">
            <h2>All Appointments</h2>

            {appointmentLoading ? (
              <p>
                Loading appointments...
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map(
                    (appointment) => (
                      <tr
                        key={
                          appointment.id
                        }
                      >
                        <td>
                          {
                            appointment.patient
                          }
                        </td>

                        <td>
                          {
                            appointment.doctor
                          }
                        </td>

                        <td>
                          {
                            appointment.department
                          }
                        </td>

                        <td>
                          {
                            appointment.date
                          }
                        </td>

                        <td>
                          {
                            appointment.time
                          }
                        </td>

                        <td>
                          {
                            appointment.status
                          }
                        </td>

                        <td>
                          {appointment.status ===
                            "Pending" && (
                            <button
                              className="login-submit"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "Confirmed"
                                )
                              }
                            >
                              Confirm
                            </button>
                          )}

                          {appointment.status ===
                            "Confirmed" && (
                            <button
                              className="doctor-btn"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "Completed"
                                )
                              }
                            >
                              Complete
                            </button>
                          )}

                          {appointment.status !==
                            "Completed" && (
                            <button
                              className="delete-btn"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "Cancelled"
                                )
                              }
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteAppointment(
                                appointment.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ================= EMERGENCY =================

  if (page === "emergency") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>MediCare+</h1>
            <p>
              Emergency Request Management
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <button
            className="back-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <h2>
            🚨 Emergency Requests
          </h2>

          {emergencyError && (
            <p className="login-error">
              {emergencyError}
            </p>
          )}

          <div className="doctor-form">
            <h2>
              Create Emergency Request
            </h2>

            <form
              onSubmit={addEmergency}
            >
              <input
                type="text"
                placeholder="Patient Name"
                value={
                  newEmergency.patient
                }
                onChange={(event) =>
                  setNewEmergency({
                    ...newEmergency,
                    patient:
                      event.target.value,
                  })
                }
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={
                  newEmergency.phone
                }
                onChange={(event) =>
                  setNewEmergency({
                    ...newEmergency,
                    phone:
                      event.target.value,
                  })
                }
                required
              />

              <select
                value={
                  newEmergency.type
                }
                onChange={(event) =>
                  setNewEmergency({
                    ...newEmergency,
                    type:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Emergency Type
                </option>

                <option>
                  Chest Pain
                </option>

                <option>
                  Accident
                </option>

                <option>
                  Breathing Problem
                </option>

                <option>
                  Severe Injury
                </option>

                <option>
                  Other
                </option>
              </select>

              <input
                type="text"
                placeholder="Location"
                value={
                  newEmergency.location
                }
                onChange={(event) =>
                  setNewEmergency({
                    ...newEmergency,
                    location:
                      event.target.value,
                  })
                }
                required
              />

              <select
                value={
                  newEmergency.priority
                }
                onChange={(event) =>
                  setNewEmergency({
                    ...newEmergency,
                    priority:
                      event.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Priority
                </option>

                <option>
                  Critical
                </option>

                <option>
                  High
                </option>

                <option>
                  Medium
                </option>
              </select>

              <button type="submit">
                🚨 Create Emergency Request
              </button>
            </form>
          </div>

          <div className="dashboard-section">
            <h2>
              Active Emergency Requests
            </h2>

            {emergencyLoading ? (
              <p>
                Loading emergency requests...
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Phone</th>
                    <th>Emergency</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {emergencies.map(
                    (emergency) => (
                      <tr
                        key={
                          emergency.id
                        }
                      >
                        <td>
                          {
                            emergency.patient
                          }
                        </td>

                        <td>
                          {
                            emergency.phone
                          }
                        </td>

                        <td>
                          {emergency.type}
                        </td>

                        <td>
                          {
                            emergency.location
                          }
                        </td>

                        <td>
                          {emergency.time}
                        </td>

                        <td>
                          {
                            emergency.priority
                          }
                        </td>

                        <td>
                          {
                            emergency.status
                          }
                        </td>

                        <td>
                          {emergency.status ===
                            "Pending" && (
                            <button
                              className="login-submit"
                              onClick={() =>
                                updateEmergencyStatus(
                                  emergency.id,
                                  "In Progress"
                                )
                              }
                            >
                              Start
                            </button>
                          )}

                          {emergency.status ===
                            "In Progress" && (
                            <button
                              className="doctor-btn"
                              onClick={() =>
                                updateEmergencyStatus(
                                  emergency.id,
                                  "Resolved"
                                )
                              }
                            >
                              Resolve
                            </button>
                          )}

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteEmergency(
                                emergency.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ================= HOME =================

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">
            ⚕
          </div>

          <div>
            <h2>MediCare</h2>
            <p>
              Healthcare Solutions
            </p>
          </div>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#doctors">Doctors</a>
          <a href="#services">Services</a>
          <a href="#appointments">
            Appointments
          </a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="buttons">
          <button
            className="doctor-btn"
            onClick={() =>
              setShowLogin(true)
            }
          >
            👤 Doctor Admin
          </button>

          <button
            className="login-btn"
            onClick={() =>
              setShowLogin(true)
            }
          >
            🔑 Login
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              ⚕ MediCare<span>+</span>
            </h1>

            <div className="stars">
              ★★★★★
            </div>

            <p className="premium">
              Premium Healthcare
            </p>

            <h2>
              At Your Fingertips
            </h2>

            <div className="features">
              <div>
                ✓ Certified Specialists
              </div>

              <div>
                ◷ 24/7 Availability
              </div>

              <div>
                🔒 Safe & Secure
              </div>

              <div>
                👥 500+ Doctors
              </div>
            </div>

            <div className="hero-buttons">
              <button
                className="book-btn"
                onClick={() =>
                  document
                    .getElementById(
                      "appointments"
                    )
                    ?.scrollIntoView()
                }
              >
                📅 Book Appointment Now
              </button>

              <button
                className="emergency-btn"
                onClick={() =>
                  alert(
                    "For emergency medical assistance, please call 108."
                  )
                }
              >
                ☎ Emergency Call
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80"
              alt="Medical Team"
            />
          </div>
        </div>
      </section>

      <section
        className="excellence"
        id="services"
      >
        <h2>
          CERTIFIED & EXCELLENCE
        </h2>

        <p>
          Government recognized and internationally
          accredited healthcare standards
        </p>

        <div className="cards">
          <div className="card">
            <div className="card-icon">
              👨‍⚕️
            </div>

            <h3>
              Expert Doctors
            </h3>

            <p>
              Highly qualified and experienced
              medical professionals.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              🏥
            </div>

            <h3>
              Modern Facilities
            </h3>

            <p>
              Advanced equipment and modern
              healthcare facilities.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              🔒
            </div>

            <h3>
              Safe & Secure
            </h3>

            <p>
              Your healthcare information is
              protected and secure.
            </p>
          </div>
        </div>
      </section>

      <section
        className="doctors"
        id="doctors"
      >
        <h2>
          Our Doctors
        </h2>

        <p>
          Meet our experienced healthcare specialists
        </p>

        <div className="doctor-container">
          {doctors
            .slice(0, 3)
            .map((doctor) => (
              <div
                className="doctor-card"
                key={doctor.id}
              >
                <div className="doctor-photo">
                  👨‍⚕️
                </div>

                <h3>
                  {doctor.name}
                </h3>

                <p>
                  {doctor.department}
                </p>

                <button
                  onClick={() =>
                    document
                      .getElementById(
                        "appointments"
                      )
                      ?.scrollIntoView()
                  }
                >
                  Book Appointment
                </button>
              </div>
            ))}
        </div>
      </section>

      <section
        className="appointment"
        id="appointments"
      >
        <h2>
          Book Your Appointment
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            alert(
              "Appointment request submitted successfully!"
            );
          }}
        >
          <input
            type="text"
            placeholder="Patient Name"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
          />

          <select required>
            <option value="">
              Select Department
            </option>

            <option>
              Cardiology
            </option>

            <option>
              Neurology
            </option>

            <option>
              General Medicine
            </option>

            <option>
              Orthopedics
            </option>
          </select>

          <input
            type="date"
            required
          />

          <button type="submit">
            Book Appointment
          </button>
        </form>
      </section>

      <section
        className="contact"
        id="contact"
      >
        <h2>
          Contact MediCare
        </h2>

        <div className="contact-container">
          <div>
            <h3>
              📍 Address
            </h3>

            <p>
              MediCare Healthcare Center
            </p>
          </div>

          <div>
            <h3>
              ☎ Phone
            </h3>

            <p>
              +91 98765 43210
            </p>
          </div>

          <div>
            <h3>
              ✉ Email
            </h3>

            <p>
              support@medicare.com
            </p>
          </div>
        </div>
      </section>

      {showLogin && (
        <div className="login-overlay">
          <div className="login-box">
            <button
              type="button"
              className="close-btn"
              onClick={() =>
                setShowLogin(false)
              }
            >
              X
            </button>

            <h2>
              🔐 Doctor Admin Login
            </h2>

            <p>
              Login to MediCare Admin Panel
            </p>

            <form onSubmit={login}>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                required
              />

              {error && (
                <p className="login-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="login-submit"
              >
                Login
              </button>
            </form>

            <p>
              Demo Login:
              <br />
              admin@medicare.com
              <br />
              admin123
            </p>
          </div>
        </div>
      )}

      <footer>
        <h2>
          MediCare+
        </h2>

        <p>
          Premium Healthcare At Your Fingertips
        </p>

        <p>
          © 2026 MediCare Healthcare Solutions
        </p>
      </footer>
    </div>
  );
}

export default App;