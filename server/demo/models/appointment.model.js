const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  sellerId: {
    type: String,
  },
  sellerName: {
    type: String,
  },

  appointmentDate: {
    type: String,
  },
  timeslot: {
    type: String,
  },
  isAvailable: {
    type: String,
  },
  customerId: {
    type: String,
  },
  appointmentId: {
    type: String,
  },
  appointmentStatus: {
    type: String,
  },
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
