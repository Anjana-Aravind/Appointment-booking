const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  contactNumber: {
    type: String,
  },
  customerName: {
    type: String,
  },
});
module.exports = mongoose.model("Customer", CustomerSchema);
