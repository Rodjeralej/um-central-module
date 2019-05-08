const mongoose = require('mongoose');

const { entitlementSchema } = require('./entitlement');
const { roleSchema } = require('./role');
const { userSchema, userEnums } = require('./user');

// use native promises; mpromise is deprecated
mongoose.Promise = global.Promise;

module.exports = {
  models: {
    User: mongoose.model('User', userSchema),
    Entitlement: mongoose.model('Entitlement', entitlementSchema),
    Role: mongoose.model('Role', roleSchema),
  },
  enums: {
    userEnums,
  },
};
