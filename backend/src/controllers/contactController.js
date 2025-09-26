const Contact = require('../models/Contact');
const emailService = require('../service/emailService');

const createContact = async (req, res) => {
  try {
    const { name, email, phone, purpose, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      purpose,
      message
    });

    await contact.save();

    // Send confirmation email
    await emailService.sendContactConfirmation(email, name);

    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact inquiry',
      error: error.message
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

module.exports = {
  createContact,
  getContacts
};