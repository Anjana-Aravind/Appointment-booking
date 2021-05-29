const express = require("express");
const { Router } = require("express");
const { isValidObjectId } = require("mongoose");

const Appointment = require("../models/appointment.model");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // To parse the incoming requests with JSON payloads

// ADD A NEW Appointment
router.post("/addAppointment", async (req, res) => {
  const appointment = new Appointment({
    sellerId: req.body.sellerId,
    sellerName: req.body.sellerName,
    appointmentDate: req.body.appointmentDate,
    timeslot: req.body.timeslot,
    isAvailable: req.body.isAvailable,
  });
  try {
    const savedAppointment = await appointment.save();
    res.json({ ...savedAppointment, isAdded: true });
  } catch (err) {
    res.json({ message: err });
  }
});

// BOOK AN APPOINtMENT
router.post("/bookAppointment", async (req, res) => {
  const appointment = new Appointment({
    sellerId: req.body.sellerId,
    customerId: req.body.customerId,
    appointmentDate: req.body.appointmentDate,
    appointmentId: req.body.appointmentId,
    timeslot: req.body.timeslot,
    appointmentStatus: req.body.appointmentStatus,
  });
  try {
    const bookedAppointment = await appointment.save();

    res.json({ ...bookedAppointment, updatedAppointment, isAdded: true });
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Available appointments
router.get("/availableAppointments", async (req, res) => {
  try {
    const appointmentList = await Appointment.find({ isAvailable: "1" });
    res.json(appointmentList);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Available appointments
router.patch("/updateAppointmentAvailabilityStatus/:id", async (req, res) => {
  var updateObject = req.body;
  var id = req.params.id;
  console.log(id);
  console.log(updateObject);
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateObject }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update the availability status of appointment
router.get("/getPendingRequest", async (req, res) => {
  try {
    const appointmentList = await Appointment.find({
      availabilityStatus: null,
    });
    res.json(appointmentList);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
