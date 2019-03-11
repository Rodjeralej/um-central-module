const mongoose = require('mongoose');

const entitlementSchema = new mongoose.Schema({
  father: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = entitlementSchema;
