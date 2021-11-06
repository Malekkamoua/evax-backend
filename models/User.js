const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    mode_inscription: {
      type: Boolean,
      required: true,
    },
    type_vaccin: {
      type: String,
      required: false,
      default: 'none',
      min: 6,
      max: 1024,
    },
    first_dose: {
      type: String,
      default: 'none',
    },
    second_dose: {
      type: String,
      default: 'none',
    },
  })
);

module.exports = User;
