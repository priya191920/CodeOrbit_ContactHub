const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // Create new contact message
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save to MongoDB
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;