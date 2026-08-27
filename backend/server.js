const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("MediCare database is ready");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

// ================= SCHEMAS =================

// Doctor
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Patient
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Appointment
const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: String,
      required: true,
      trim: true,
    },
    doctor: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Emergency
const emergencySchema = new mongoose.Schema(
  {
    patient: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Critical", "High", "Medium"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// ================= MODELS =================

const Doctor = mongoose.model("Doctor", doctorSchema);
const Patient = mongoose.model("Patient", patientSchema);
const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema
);
const Emergency = mongoose.model(
  "Emergency",
  emergencySchema
);

// ================= BASIC ROUTES =================

app.get("/", (req, res) => {
  res.json({
    message: "MediCare Backend is Running Successfully",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "MediCare API is working",
  });
});

// ==================================================
//                      DOCTORS
// ==================================================

// GET all doctors
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({
      createdAt: 1,
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load doctors",
      error: error.message,
    });
  }
});

// POST doctor
app.post("/api/doctors", async (req, res) => {
  try {
    const { name, department, phone } = req.body;

    if (!name || !department || !phone) {
      return res.status(400).json({
        message: "All doctor fields are required",
      });
    }

    const doctor = await Doctor.create({
      name,
      department,
      phone,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add doctor",
      error: error.message,
    });
  }
});

// DELETE doctor
app.delete("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(
      req.params.id
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
});

// ==================================================
//                     PATIENTS
// ==================================================

// GET all patients
app.get("/api/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({
      createdAt: 1,
    });

    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load patients",
      error: error.message,
    });
  }
});

// POST patient
app.post("/api/patients", async (req, res) => {
  try {
    const { name, age, gender, phone } = req.body;

    if (!name || !age || !gender || !phone) {
      return res.status(400).json({
        message: "All patient fields are required",
      });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      phone,
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add patient",
      error: error.message,
    });
  }
});

// DELETE patient
app.delete("/api/patients/:id", async (req, res) => {
  try {
    const patient =
      await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete patient",
      error: error.message,
    });
  }
});

// ==================================================
//                   APPOINTMENTS
// ==================================================

// GET all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments =
      await Appointment.find().sort({
        createdAt: 1,
      });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load appointments",
      error: error.message,
    });
  }
});

// POST appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const {
      patient,
      doctor,
      department,
      date,
      time,
    } = req.body;

    if (
      !patient ||
      !doctor ||
      !department ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message:
          "All appointment fields are required",
      });
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      department,
      date,
      time,
      status: "Pending",
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
});

// UPDATE appointment status
app.put(
  "/api/appointments/:id",
  async (req, res) => {
    try {
      const { status } = req.body;

      const validStatuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid appointment status",
        });
      }

      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!appointment) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update appointment",
        error: error.message,
      });
    }
  }
);

// DELETE appointment
app.delete(
  "/api/appointments/:id",
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndDelete(
          req.params.id
        );

      if (!appointment) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.json({
        message:
          "Appointment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to delete appointment",
        error: error.message,
      });
    }
  }
);

// ==================================================
//                    EMERGENCIES
// ==================================================

// GET all emergencies
app.get("/api/emergencies", async (req, res) => {
  try {
    const emergencies =
      await Emergency.find().sort({
        createdAt: 1,
      });

    res.json(emergencies);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to load emergency requests",
      error: error.message,
    });
  }
});

// POST emergency
app.post("/api/emergencies", async (req, res) => {
  try {
    const {
      patient,
      phone,
      type,
      location,
      priority,
    } = req.body;

    if (
      !patient ||
      !phone ||
      !type ||
      !location ||
      !priority
    ) {
      return res.status(400).json({
        message:
          "All emergency fields are required",
      });
    }

    const emergency =
      await Emergency.create({
        patient,
        phone,
        type,
        location,
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        priority,
        status: "Pending",
      });

    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to create emergency request",
      error: error.message,
    });
  }
});

// UPDATE emergency status
app.put(
  "/api/emergencies/:id",
  async (req, res) => {
    try {
      const { status } = req.body;

      const validStatuses = [
        "Pending",
        "In Progress",
        "Resolved",
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid emergency status",
        });
      }

      const emergency =
        await Emergency.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!emergency) {
        return res.status(404).json({
          message:
            "Emergency request not found",
        });
      }

      res.json(emergency);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update emergency",
        error: error.message,
      });
    }
  }
);

// DELETE emergency
app.delete(
  "/api/emergencies/:id",
  async (req, res) => {
    try {
      const emergency =
        await Emergency.findByIdAndDelete(
          req.params.id
        );

      if (!emergency) {
        return res.status(404).json({
          message:
            "Emergency request not found",
        });
      }

      res.json({
        message:
          "Emergency request deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to delete emergency",
        error: error.message,
      });
    }
  }
);

// ================= START SERVER =================

async function seedDatabase() {
  try {
    const doctorCount = await Doctor.countDocuments();

    if (doctorCount === 0) {
      await Doctor.insertMany([
        {
          name: "Dr. John Smith",
          department: "Cardiology",
          phone: "+91 98765 11111",
        },
        {
          name: "Dr. Sarah Williams",
          department: "Neurology",
          phone: "+91 98765 22222",
        },
        {
          name: "Dr. David Kumar",
          department: "General Medicine",
          phone: "+91 98765 33333",
        },
      ]);

      console.log("Sample doctors added");
    }

    const patientCount = await Patient.countDocuments();

    if (patientCount === 0) {
      await Patient.insertMany([
        {
          name: "Rahul Kumar",
          age: 28,
          gender: "Male",
          phone: "+91 98765 55555",
        },
        {
          name: "Priya Sharma",
          age: 32,
          gender: "Female",
          phone: "+91 98765 66666",
        },
        {
          name: "Arjun Reddy",
          age: 40,
          gender: "Male",
          phone: "+91 98765 77777",
        },
      ]);

      console.log("Sample patients added");
    }

    const appointmentCount =
      await Appointment.countDocuments();

    if (appointmentCount === 0) {
      await Appointment.insertMany([
        {
          patient: "Rahul Kumar",
          doctor: "Dr. John Smith",
          department: "Cardiology",
          date: "2026-08-27",
          time: "10:00",
          status: "Confirmed",
        },
        {
          patient: "Priya Sharma",
          doctor: "Dr. Sarah Williams",
          department: "Neurology",
          date: "2026-08-27",
          time: "11:30",
          status: "Pending",
        },
        {
          patient: "Arjun Reddy",
          doctor: "Dr. David Kumar",
          department: "General Medicine",
          date: "2026-08-27",
          time: "14:00",
          status: "Completed",
        },
      ]);

      console.log("Sample appointments added");
    }

    const emergencyCount =
      await Emergency.countDocuments();

    if (emergencyCount === 0) {
      await Emergency.insertMany([
        {
          patient: "Rahul Kumar",
          phone: "+91 98765 55555",
          type: "Chest Pain",
          location: "Bangalore",
          time: "09:15 AM",
          priority: "Critical",
          status: "Pending",
        },
        {
          patient: "Priya Sharma",
          phone: "+91 98765 66666",
          type: "Accident",
          location: "Puttaparthi",
          time: "10:30 AM",
          priority: "High",
          status: "In Progress",
        },
      ]);

      console.log("Sample emergencies added");
    }
  } catch (error) {
    console.error(
      "Database seed failed:",
      error.message
    );
  }
}

mongoose.connection.once("open", async () => {
  console.log("MongoDB database is ready");

  await seedDatabase();

  app.listen(PORT, () => {
    console.log(
      `MediCare Backend running on http://localhost:${PORT}`
    );
  });
});