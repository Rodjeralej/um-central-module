const mongoose = require('mongoose');

const { userSchema } = require('./user');

// use native promises; mpromise is deprecated
mongoose.Promise = global.Promise;

module.exports = {
  models: {
    User: mongoose.model('User', userSchema),
  },
};
