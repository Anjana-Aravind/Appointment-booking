const express = require("express");
const { Router } = require("express");

const Customer = require("../models/customer.model");
console.log(Customer);
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // To parse the incoming requests with JSON payloads

// Get All customer
router.get("/allCustomers", async (req, res) => {
  try {
    const customerList = await Customer.find();
    res.json(customerList);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
