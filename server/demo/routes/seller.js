const express = require("express");
const { Router } = require("express");

const Seller = require("../models/seller.model");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // To parse the incoming requests with JSON payloads

// FETCHES A SPECIFIC SELLER DETAILS

router.get("/:sellerId", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    res.json(seller);
  } catch (err) {
    res.json({ message: err });
  }
});

// FETCHES ALL SELLER LIST WITH DETAILS

router.get("/", async (req, res) => {
  try {
    const sellerList = await Seller.find();
    res.json(sellerList);
  } catch (err) {
    res.json({ message: err });
  }
});

// ADD A NEW SELLER

router.post("/", async (req, res) => {
  const seller = new Seller({
    sellerName: req.body.sellerName,
    location: req.body.location,
    workingHours: req.body.workingHours,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedSeller = await seller.save();
    res.json({ savedSeller });
  } catch (err) {
    res.json({ message: err });
  }
});

//REMOVE SELLER
router.delete("/:sellerId", async (req, res) => {
  try {
    const removedSeller = await Seller.remove({ _id: req.params.sellerId });
    res.json(removedSeller);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE SELLER
router.patch("/:sellerId", async (req, res) => {
  try {
    const updatedSeller = await Seller.update(
      { _id: req.params.sellerId },
      { $set: { phoneNumber: req.body.phoneNumber } }
    );
    res.json(updatedSeller);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
