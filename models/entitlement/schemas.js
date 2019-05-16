const mongoose = require('mongoose');

const entitlementSchema = new mongoose.Schema({
  father: { type: String },
  name: { type: String, required: true },
  order: { type: String },
  code: { type: String },
  active: { type: String },
});

entitlementSchema.index(
  {
    name: 1,
  },
  {
    name: 'name_1',
    unique: true,
    sparse: true,
  },
);

module.exports = entitlementSchema;
